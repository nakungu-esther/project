const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/bean_file', (req, res) => {
    res.render('bean'); 
});

module.exports = router;
