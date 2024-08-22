const express = require("express");
const router = express.Router();

const Procurement = require('../models/procurement'); // Ensure correct capitalization

// Route to render the manager dashboard form page
router.get("/addprocurement", (req, res) => {
  res.render("manager"); 
});

// POST request handler for saving procurement data
router.post("/addprocurement", async (req, res) => {
  try {
    // Debugging: Log the incoming form data
    console.log("Received data:", req.body);
    
    // Create a new Procurement record using the data from the form
    const newProcurement = new Procurement(req.body);

    // Debugging: Log the constructed procurement object
    console.log("Constructed Procurement object:", newProcurement);

    // Save the record to the database
    await newProcurement.save();

    // Redirect to the procurement list page or another desired page after saving
    res.redirect("/procurementList");
  } catch (error) {
    // Log any errors that occur during the save operation
    console.error("Error registering the produce:", error);

    // Send an error response if something goes wrong
    res.status(400).send("An error occurred while entering the produce.");
  }
});


module.exports = router;
