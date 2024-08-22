const express = require('express');
const router = express.Router();

// GET request handler
router.get('/agentdashboard', (req, res) => {
    res.render('agent');
});

module.exports = router
