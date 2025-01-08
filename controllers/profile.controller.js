const userService = require("../services/user.service");
const renderLayout = require("./renderLayout");
const changePasswordSchema = require("../dto/profile/change-password.dto");

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user._id);
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/profile/detail",
        {
          user,
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
    res.status(500).send("Error fetching user");
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file was uploaded.");
    }
    const avatarPath = "/images/storage/avatar/" + req.file.filename;

    const user = await userService.getUserById(req.user._id);

    user.avatar = avatarPath;
    await user.save();

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/profile/detail",
        {
          user,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { error, value } = changePasswordSchema.validate(
      {
        newPassword,
        confirmPassword,
      },
      {
        abortEarly: false,
      }
    );
    console.log(newPassword);
    const user = await userService.changePassword(req.user._id, newPassword);
    req.flash("success", "Password changed successfully");

    const flashSuccesses = req.flash("success");

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/profile/detail",
        {
          user,
          flashSuccesses,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

module.exports = {
  getProfile,
  uploadAvatar,
  changePassword,
};
