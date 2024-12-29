const express = require("express");
const router = express.Router();

const profileController = require("../../../controllers/ui/profile.controller");

const ensureAuthenticated = require("../../../middleware/ensureAuthenticate.middleware");

const uploadMulter = require("../../../config/storage/multer");

router.get("/", ensureAuthenticated, profileController.getProfile);

router.put(
  "/upload-avatar",
  ensureAuthenticated,
  uploadMulter.uploadAvatarMulter,
  profileController.uploadAvatar
);

router.post(
  "/change-password",
  ensureAuthenticated,
  profileController.changePassword
);

module.exports = router;
