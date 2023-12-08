const { Router } = require("express");
const commentRouter = Router({ mergeParams: true });
const { Comment } = require("../models/comment");
const { isValidObjectId } = require("mongoose");
const { Blog } = require("../models/blog");
const { Member } = require("../models/member");

commentRouter.post("/", async (req, res) => {
  try {
    console.log("commentRouter");
    const { blogId } = req.params;
    const { content, memberId } = req.body;
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: "blogId is invalid" });
    if (!isValidObjectId(memberId))
      return res.status(400).send({ error: "memberId is invalid" });
    const blog = await Blog.findById(blogId);
    const member = await Member.findById(memberId);

    if (!blog || !member)
      return res.status(400).send({ error: "blog or member does not exist" });
    const comment = new Comment({ content, member, blog });
    await comment.save();
    return res.send({ comment });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
  return res.send(req.params);
});

module.exports = commentRouter;
