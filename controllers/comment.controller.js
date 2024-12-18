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

module.exports = {
  getCommentByProductId,
};
