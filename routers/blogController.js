const { Router } = require("express");
const { Blog } = require("../models/blog");
const { Member } = require("../models/member");
const commentRouter = require("./commentController");
const { isValidObjectId } = require("mongoose");

const blogRouter = Router();
blogRouter.use("/:blogId/comment", commentRouter);

blogRouter.post("/", async (req, res) => {
    const{title, content, memberId} = req.body;

    try {
        if(!isValidObjectId(memberId))
        return res.status(400).send({error:"memberId is invalid"});

        const member = await Member.findById(memberId);
        
        if(!member)
        return res.status(400).send({error:"memberId does not exist"}); 

        const blog = new Blog({...req.body,member:member.toObject()});

        await blog.save();
        return res.send({blog});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:error.messsage});
    }
});

blogRouter.get("/", async (req, res) => {
    try {
        const {blogId} = req.params;

        const blog = await Blog.findById(blogId);
        return res.send({blog});      
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:error.messsage});
    }
});

blogRouter.put("/:blogId", async (req, res) => {
    try {
        const {blogId} = req.params;
        const {title, content} = req.body;

        const blog = await Blog.findByIdAndUpdate(blogId, {
            title: title,
            content: content,
        });
        // before, after
        if (!blog)
            return res.status(400).send("invalid request");

        return res.send({blog}); // 수정전 꺼 전달

    } catch(error) {
        console.log(error);
        return res.status(500).send({error:error.message});
    }
});


module.exports = blogRouter;
