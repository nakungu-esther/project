const express = require('express');
const router = express.Router();

// GET request handler
router.get('/admindashboard', (req, res) => {
    res.render('admin');
});

module.exports = router
