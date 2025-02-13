const express= require('express');
const router= express.Router();
const Post= require('../models/post');


router.delete("/:id", (req, res, next) => {
  console.log("hello");
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

router.put("/:id",(req,res,next)=>
{
  const post=new Post({_id:req.body.id,title:req.body.title,content:req.body.content});

  Post.updateOne({_id:req.params.id},post).then(result=>
    {
      console.log(result);
      res.status(200).json({message:"Update Successful!"});
    });
})
router.post("",(req,res,next)=>{
  const post= new Post({title:req.body.title,content:req.body.content});
  console.log(post);
  post.save().then(createdPost=>{

    res.status(201).json({message:"post added successfully",postId:createdPost._id});
  });

})

router.get('/:id',(req,res,next)=>
{
  Post.findById(req.params.id).then(post=>
    {
      if(post)
      {
        res.status(200).json(post);
      }
      else{
        res.status(404).json({message:'Post not fount'});
      }
    })
})
router.use("",(req,res,next)=>
{
 Post.find().then(documents=>{
  res.json({
    message:"hello message",
    posts:documents
 })

  })
})

module.exports=router;
