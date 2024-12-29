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

const addComment = async (userId, productId, content) => {
  try {
    const comment = new Comment({
      _user: userId,
      _product: productId,
      content,
    });

    return await comment.save();
  } catch (error) {
    throw new Error("Error adding comment: " + err.message);
  }
};

module.exports = {
  getCommentByProductId,
  addComment,
};
