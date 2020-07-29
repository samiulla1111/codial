const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');
router.get('/profile',passport.checkAuthentication,userController.user);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

//use passport as middleware to uthenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'users/sign-in'},
),userController.createSession);
module.exports=router;

router.get('/sign-out',userController.destroySession);