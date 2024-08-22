const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/maize_file', (req, res) => {
    res.render('maize'); 
});

module.exports = router;
