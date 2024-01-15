const express = require('express');
const router = express.Router();
const indexControllers = require('../controller/indexControllers');

// Define the index routes
router.get('/', indexControllers.getIndexPage);
router.get('/signup', indexControllers.getSignupPage);
router.get('/about-us', indexControllers.getAboutPage);
router.get('/contact', indexControllers.getContactPage);
router.get('/bachelor-of-art', indexControllers.getBaPage);
router.get('/bachelor-of-commerce', indexControllers.getBcomPage);
router.get('/gallery', indexControllers.getGalleryPage);
router.get('/blog', indexControllers.getBlogPage);
router.get('/blog-details', indexControllers.getBlogdetailsPage);
router.get('/our-facilities', indexControllers.getFacilitiesPage);
router.get('/placement-and-internship', indexControllers.getPlacementPage);

module.exports = router;