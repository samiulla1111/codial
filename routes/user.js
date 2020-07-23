const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
router.get('/profile',userController.user);
module.exports=router;