const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { FormModel, collection } = require('../models/mongodb');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const loadAdmin = async (req, res) => {
  try {
    res.render("admin");
  } catch (error) {
    // console.log(error.message);
  }
};

const loadDashboard = async (req, res) => {
  try {
    res.render("dashboard");
  } catch (error) {
    // console.log(error.message);
  }
};

const loadBlog = async (req, res) => {
  try {
    res.render("blog");
  } catch (error) {
    // console.log(error.message);
  }
};

const loadUser = async (req, res) => {
  try {
    // Use the find method to fetch all users
    const users = await collection.find();

    // Log the fetched users
    // console.log('Fetched Users:', users);

    // Render the view with the fetched users
    res.render('dashboard/user', { data: users });
  } catch (error) {
    // console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  loadAdmin,
  loadDashboard,
  loadUser,
  loadBlog,
};