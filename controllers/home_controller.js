const Post =require('../models/post');

const User=require('../models/user');
const { populate } = require('../models/post');
module.exports.home=async function(req,res){

    try{
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user').populate({
            path: 'comments',
            populate:{
                path:"user"
            }
        });
        let users=await User.find({});

        return res.render('home',{
            title:"Codeial|Home",
            posts:posts,
            all_users:users
        });

    }catch(err){
        console.log('Error',err);
        return ;
    }
    
    
   
    
}

// let posts=Post.find({}).populate('comments').exec();
// posts.then();