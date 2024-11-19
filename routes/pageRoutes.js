const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/error', (req, res) => {
    res.render('page'); 
});

module.exports = router;
