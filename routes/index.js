const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./user'));
console.log('router loaded..');
router.use('/posts',require('./posts'));

module.exports=router;