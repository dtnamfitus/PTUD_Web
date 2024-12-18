const Comment = require("./../models/comment.model");

const getCommentByProductId = async (productId) => {
  try {
    const comments = Comment.find({
      _product: productId,
    })
      .populate("_user")
      .sort({ createdAt: -1 });

    return comments;
  } catch (error) {
    throw new Error("Error fetching comments: " + err.message);
  }
};

module.exports = {
  getCommentByProductId,
};
