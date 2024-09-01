const express = require('express');
const passport = require('passport'); // Ensure you require passport
const router = express.Router();

// Route to render the login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Route to handle login
router.post("/login", 
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
        req.session.user = req.user; // Assign session to the logged-in user
        
        // Redirect based on the user's role
        if (req.user.role === "manager") {
            res.redirect("/overView")
        }
         else if (req.user.role === "sales_agent") {
            res.redirect("/sales-form")
        } 
        
        else if (req.user.role === "administrator"){
            res.redirect("/admindashboard")
        } 
        else {
            res.send("User with that role does not exist in the system");
        }    
    } 
   
);

// Logout route
router.get("/logout", (req, res) => {
    if (req.session) {
    req.session.destroy((err) => {
    if (err) {
    return res.status(500).send("Error logging out");
    }
    res.redirect("/");
    });
    }else{
        res.send('you donot have a session')
    }
    });

module.exports = router;
