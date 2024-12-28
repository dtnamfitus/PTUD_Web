const userService = require("../../services/user.service");
const mailerService = require("../../third_party/mailer.service");
const loginSchema = require("../../dto/auth/login.dto");
const registerSchema = require("../../dto/auth/register.dto");
const renderLayout = require("./renderLayout");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((err) => {
        req.flash("error", err.message);
      });
    }

    const flashErrors = req.flash("error");

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/auth/login",
        {
          flashErrors,
          error,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Login");
  } catch (err) {
    console.error(err);

    req.flash("error", "Invalid email or password");
    res.redirect("/client/auth/login");
  }
};

const register = async (req, res) => {
  try {
    const flashErrors = req.flash("error");
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/auth/register",
        {
          flashErrors,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Register");
  } catch (err) {
    console.error(err);
    req.flash("error", "Error fetching products");
    res.redirect("/client/auth/register");
  }
};

const verifyRegister = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      birthDate,
    } = req.body;
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((err) => {
        req.flash("error", err.message);
      });
    }
    if (password !== confirmPassword) {
      req.flash("error", "Password and confirm password do not match");
      return res.redirect("/client/auth/register");
    }

    const existUser = await userService.getUser({ email });
    if (existUser) {
      req.flash("error", "User already exists");
      return res.redirect("/client/auth/register");
    }

    await userService.createUser({
      email,
      password,
      firstName,
      lastName,
      gender,
      birthDate,
    });

    res.cookie("registeredEmail", email, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.redirect("/client/auth/verify-account");
  } catch (err) {
    console.error(err);
    req.flash("error", "Invalid email or password");
    res.redirect("/client/auth/register");
  }
};

const getOTPUI = async (req, res) => {
  try {
    const flashErrors = req.flash("error");

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/auth/verify-account",
        {
          flashErrors,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });

    renderLayout(req, res, bodyHtml, "Verify OTP");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/client/auth/register");
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    await mailerService.sendMail({
      to: email,
      subject: "OTP for email verification",
      text: `Your OTP is ${otp}`,
    });

    await userService.updateUser(email, {
      otp,
      otpExpiresAt: Date.now() + 300000,
    });

    res.redirect("/client/auth/verify-otp");
  } catch (err) {
    console.error(err);
    req.flash("error", "Invalid email or password");
    res.redirect("/client/auth/register");
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.cookies.registeredEmail;

    const user = await userService.getUser({ email });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/client/auth/register");
    }

    if (otp == user.otp && user.otpExpiresAt > Date.now()) {
      await userService.updateUser(email, {
        isVerified: true,
        otp: null,
        otpExpiresAt: null,
      });
      req.flash("success", "Your account has been verified successfully.");
    } else {
      req.flash("error", "Invalid or expired OTP. Please try again.");
      return res.redirect("/client/auth/verify-otp");
    }

    const flashErrors = req.flash("error");
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/auth/verify-otp",
        {
          flashErrors,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });

    renderLayout(req, res, bodyHtml, "Verify OTP");
  } catch (err) {
    console.error(err);
    req.flash("error", "Invalid email or password");
    res.redirect("/client/auth/register");
  }
};

module.exports = {
  login,
  register,
  verifyRegister,
  sendOTP,
  verifyOTP,
  getOTPUI,
};
