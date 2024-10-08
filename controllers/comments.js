const Campground = require('../models/campground')
const Comment = require('../models/comments.js')


module.exports.createComment = async (req,res)=>{

    const campground = await Campground.findById(req.params.id) 
    const {body, rating} = req.body
    const comment = new Comment(req.body.comment)
    comment.author = req.user.id;
    console.log(comment)
    campground.comments.push(comment);
    await comment.save();
    await campground.save();
    // res.send(req.body)
    req.flash('success','Added a new comment')
    res.redirect(`/campgrounds/${campground._id}`)
    
}

module.exports.deleteComment = async(req,res)=>{

    const {id, commentId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {comments: commentId}})  // find comment with commentId from comments array of a particular campground and delete it using "pull"
    await Comment.findByIdAndDelete(req.params.commentId);
    req.flash('success','Succesfully deleted a comment')
    res.redirect(`/campgrounds/${id}`)
    // res.send("Deleted comment")
}