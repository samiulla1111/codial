const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error is finding user --> passport');
                return done(err);
            }

            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }

            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be ine the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//desirialize the user from the in the cookies
passport.deserializeUser(function(id,done){
   User.findById(id,function(err,user){
        if(err){
            console.log('Error is finding user --> passport');
            return done(err);
        }

        return done(null,user);
   });
});

//check if the user is authenticted
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in which is my controller action
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){

        //req.user containes the current signed in user from the session cookie and we are just sending this to the locals for the  views
        res.locals.user=req.user;
    }
    next();
   
}

module.exports=passport;