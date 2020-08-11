
const profile = require('../models/user');
module.exports.user=function(req,res){
    return res.render('user',{
        title:"profile"
    });
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codial | Sign Up"
    });
}

module.exports.signIn=function(req,res){ 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codial | Sign In"
    });
}

// get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    profile.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error is finding user in signing up');return }

        if(!user){
            profile.create(req.body,function(err,user){
                if(err){console.log('error in creating user while signing up');return}


                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }

    });
    // todo later
}
// sign in create session for the user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}