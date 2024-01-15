// middleware for signup 
const isSignupAllowed = (req, res, next) => {
    const allowSignup = false;

    if (allowSignup) {
        next();
    } else {
        res.status(403).send('Signup is not allowed.');
    }
};

// Middleware for admin dashboard page access
const isAdminDashboardMiddleware = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/admin');
    }
};

module.exports = {
    isSignupAllowed,
    isAdminDashboardMiddleware
}