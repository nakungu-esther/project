const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/overView', (req, res) => {
    res.render('mine'); 
});

module.exports = router;
