const userService = require("../../services/user.service");
const loginSchema = require("../../dto/auth/login.dto");
const registerSchema = require("../../dto/auth/register.dto");
const renderLayout = require("./renderLayout");

const login = async (req, res) => {
  try {
    const user = req.user;
    if (req.user) {
      return res.redirect("/client/home");
    }
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

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
  } catch (error) {
    console.error(error);
    res.redirect("/client/auth/login?error=Invalid email or password");
  }
};

const register = async (req, res) => {
  try {
    if (req.user) {
      return res.redirect("/client/home");
    }
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });

    const flashErrors = req.flash("error");

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/auth/register",
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
    await renderLayout(req, res, bodyHtml, "Register");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
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

    const user = await userService.createUser({
      email,
      password,
      firstName,
      lastName,
      gender,
      birthDate,
    });

    console.log(user);
    res.redirect("/client/auth/login?success=Account created successfully");
  } catch (error) {
    console.error(error);
    res.redirect("/client/auth/register?error=Invalid email or password");
  }
};

module.exports = {
  login,
  register,
  verifyRegister,
};
