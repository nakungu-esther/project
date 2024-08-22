const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/', (req, res) => {
    res.render('home_page'); // Ensure that 'home_page' view exists in your views directory
});

module.exports = router;
