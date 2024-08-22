const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/rice_file', (req, res) => {
    res.render('rice'); 
});

module.exports = router;
