const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../../middleware/ensureAuthenticate.middleware");
const uiCommentController = require("../../controllers/comment.controller");

router.post("/", ensureAuthenticated, uiCommentController.addComment);

module.exports = router;
