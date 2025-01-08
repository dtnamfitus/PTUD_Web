const commentService = require("../services/comment.service");

const getCommentByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await commentService.getCommentByProductId(productId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { userId, productId, content } = req.body;
    const comment = await commentService.addComment(userId, productId, content);
    // TODO: render UI
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCommentByProductId,
  addComment,
};
