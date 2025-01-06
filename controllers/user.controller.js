const UserService = require("./../services/user.service");
const MailerService = require("./../third_party/mailer.service");
const passport = require("passport");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;
      return res.json({
        message: "Login successfully",
        user: userWithoutPassword,
      });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logout successfully" });
  });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.user._id, req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await UserService.getUserById(req.user._id);
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid old password" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error changing password");
  }
};

const sendOtpPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserService.getUser({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const to = email;
    const subject = "Reset Password OTP";
    const templateName = "reset_password";
    await MailerService.sendEmail(to, subject, templateName, templateData);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending OTP");
  }
};

const verifyOtpPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserService.getUser({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying OTP");
  }
};

module.exports = {
  login,
  logout,
  getUserProfile,
  updateProfile,
  changePassword,
  sendOtpPassword,
  verifyOtpPassword,
};