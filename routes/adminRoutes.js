const express = require('express');
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// GET request handler
router.get('/admindashboard', connectEnsureLogin.ensureLoggedIn(),  (req, res) => {
    res.render('admin', {
    user: req.user
    });
});

module.exports = router
