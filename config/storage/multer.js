const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "avatar") {
      cb(
        null,
        path.join(
          __dirname,
          "..",
          "..",
          "public",
          "images",
          "storage",
          "avatar"
        )
      );
    } else if (file.fieldname === "product") {
      cb(
        null,
        path.join(
          __dirname,
          "..",
          "..",
          "public",
          "images",
          "storage",
          "product"
        )
      );
    } else {
      cb(
        null,
        path.join(
          __dirname,
          "..",
          "..",
          "public",
          "images",
          "storage",
          "others"
        )
      );
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const uploadAvatarMulter = multer({ storage }).single("avatar");
const uploadProductMulter = multer({ storage }).single("product");

module.exports = {
  uploadAvatarMulter,
  uploadProductMulter,
};
