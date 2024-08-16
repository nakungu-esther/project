const express = require ('express');
const router = express.Router();

// GET request handler
router.get('/managerdashboard', (req, res) => {
    res.render('manager');
});

// POST request handler
router.post('/managerdashboard', async (req, res) => {
    try {
        const newUser = new Register(req.body);
        console.log('this is the data being sent to the DB',newUser)
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        res.status(400).render('forms');
        console.log('Error registering the crop :', error);
    }
});



module.exports = router