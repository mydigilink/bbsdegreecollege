const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const indexControllers = require('./controller/indexControllers');
const adminController = require('./controller/adminController');
const indexRouter = require('./router/index');
const adminRouter = require('./router/admin');
const { FormModel, collection, ContactModel } = require('./models/mongodb');
const session = require('express-session');
const { isSignupAllowed, isAdminDashboardMiddleware } = require('./midelware/midelware');
const formController = require('./controller/formController');
const formRouter=require('./router/form')
dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SESSION_SECRET || 'itscecret',
    resave: true,
    saveUninitialized: true
}));

// For Data Json Form

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Apply the isSignupAllowed middleware only to the /signup route
app.use('/signup', isSignupAllowed, (req, res, next) => {
    next();
});

// Signup Data
// app.post('/signup', async (req, resp) => {
//     try {
//         const { username, userpassword } = req.body;

//         if (!username || !userpassword) {
//             return resp.status(400).send("Username and password are required.");
//         }

//         // Hash the password before saving it
//         const hashedPassword = await bcrypt.hash(userpassword, 10);

//         const data = {
//             email: username,
//             password: hashedPassword
//         };

//         const existingUser = await collection.findOne({ email: data.email });

//         if (existingUser) {
//             resp.send('User already exists. Please choose a different username.');
//         } else {
//             const userData = await collection.insertMany(data);
//             resp.send("User registered successfully!");
//         }
//     } catch (error) {
//         console.log(error.message);
//         resp.status(500).send("Internal Server Error");
//     }
// });

// Login Page
app.post('/admin', async (req, resp) => {
    try {
        const check = await collection.findOne({ email: req.body.username });
        if (!check) {
            return resp.send('Username or Email Not Found');
        }

        const isPasswordMatch = await bcrypt.compare(req.body.userpassword, check.password);

        if (isPasswordMatch) {
            // Set isAuthenticated in the session
            req.session.isAuthenticated = true;
            return resp.redirect('/admin/dashboard');
        } else {
            resp.send('Password was Wrong');
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).send('Internal Server Error');
    }
});

app.get('/dashboard/logout', (req, res) => {
    // Set the authentication flag to false
    req.session.isAuthenticated = false;
    res.redirect('/admin');
});

// Apply the middleware to the routes that require authentication

app.get('/admin/dashboard', isAdminDashboardMiddleware, (req, res) => {
    res.render('dashboard/dashboard');
});

app.get('/dashboard/blog', isAdminDashboardMiddleware, (req, res) => {
    res.render('dashboard/blog');
});

app.get('/dashboard/user', isAdminDashboardMiddleware, (req, res) => {
    res.render('dashboard/user');
});

app.get('/dashboard/logout', isAdminDashboardMiddleware, (req, res) => {
    res.render('/admin');
});

// Index Router 

app.use('/', indexRouter);
app.use('/signup', indexRouter);
app.use('/about-us', indexRouter);
app.use('/contact', indexRouter);
app.use('/ba', indexRouter);
app.use('/bcom', indexRouter);
app.use('/gallery', indexRouter);
app.use('/blog', indexRouter);
app.use('/blog-details', indexRouter);
app.use('/our-facilities', indexRouter);
app.use('/placement-and-internship', indexRouter);

// Admin Routers

app.use('/admin', adminRouter);
app.use('/dashboard', adminRouter);
app.use('/blog', adminRouter);
app.use('/user', adminRouter);
app.use('/logout', adminRouter)

// Form Routers
app.use('/', formRouter);

// Default route for handling 404 errors
app.use((req, res) => {
    res.status(404).send('404');
});

app.listen(PORT, () => {
    console.log(`Surver Running on Port ${PORT}`);
})