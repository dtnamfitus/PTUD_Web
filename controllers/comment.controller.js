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
    const user = req.user;
    const { productId, content, rate } = req.body;
    const comment = await commentService.addComment(
      user._id,
      productId,
      content,
      rate
    );
    // TODO: render UI
    return res.json({
      comment,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCommentByProductId,
  addComment,
};
