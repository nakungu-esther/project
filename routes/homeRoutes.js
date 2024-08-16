const express = require('express');
const router = express.Router();



router.get('/', (req, res) => { // new
    res.send('landing_page');
});




module.exports = router;