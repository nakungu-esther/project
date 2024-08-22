const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/g.nut_file', (req, res) => {
    res.render('gnuts'); 
});

module.exports = router;
