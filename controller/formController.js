const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { FormModel } = require('../models/mongodb');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const handleForm = async (req, res) => {
  try {
    const { fname, lname, cemail, course, phone, message } = req.body;

    // Check if any required field is missing
    if (!fname || !lname || !cemail || !course || !phone) {
      const errorMessage = 'All fields are required.';
      const errorScript = `
        <script>
          alert('${errorMessage}');
          window.location.href = document.referrer || '/';
        </script>
      `;
      return res.status(400).send(errorScript);
    }

    // Create a new instance of the FormModel with the form data
    const formData = new FormModel({
      name: fname,
      lname: lname,
      email: cemail,
      courses: course,
      phone: phone,
      message: message,
    });

    // Get the referring page from the 'referer' header
    const referringPage = req.get('referer') || '/';

    const successScript = `
      <script>
        alert('Form submitted successfully.');
        window.location.href = '${referringPage}';
      </script>
    `;

    // Save the form data to the database
    const savedFormData = await formData.save();

    // console.log('Form data saved:', savedFormData);

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: req.body.cemail,
      to: 'aaravkr911@gmail.com',
      subject: 'New Registration',
      text: `Name: ${req.body.fname} ${req.body.lname}\nCourse: ${req.body.course}\nPhone: ${req.body.phone}\nEmail: ${req.body.cemail}\nMessage: ${req.body.message}`,
    };

    // Send email and handle errors
    try {
      const info = await transporter.sendMail(mailOptions);
      // console.log('Email sent:', info);
      return res.status(200).send(successScript);
    } catch (error) {
      // console.error('Error sending email:', error);
      const emailErrorScript = `
        <script>
          alert('Error sending email. Please try again later. Error: ${error.message}');
          window.location.href = document.referrer || '/';
        </script>
      `;
      return res.status(500).send(emailErrorScript);
    }
  } catch (error) {
    // console.error('Error handling form:', error);
    const serverErrorScript = `
      <script>
        alert('Internal Server Error. Please try again later. Error: ${error.message}');
        window.location.href = document.referrer || '/';
      </script>
    `;
    return res.status(500).send(serverErrorScript);
  }
};

module.exports = {
  handleForm,
};
