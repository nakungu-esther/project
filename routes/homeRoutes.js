const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/', (req, res) => {
    res.render('index'); // Ensure that 'home_page' view exists in your views directory
});

module.exports = router;
