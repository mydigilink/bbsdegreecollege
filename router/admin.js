const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const adminController=require('../controller/adminController');

router.get('/', adminController.loadAdmin);
router.get('/dashboard', adminController.loadDashboard);
router.get('/blog', adminController.loadBlog);
router.get('/dashboard/user', adminController.loadUser);

router.get('*', function(req,resp){
    resp.redirect('/admin');
})

module.exports=router;