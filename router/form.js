const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router();
const formController=require('../controller/formController');
const router = require("./admin");

router.post('/', formController.handleForm);

module.exports=router;