const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/cow_file', (req, res) => {
    res.render('cowpeas'); 
});

module.exports = router;
