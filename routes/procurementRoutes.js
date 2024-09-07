const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Procurement = require('../models/procurement'); // Ensure correct capitalization
const Sale = require('../models/sale');

// Route to render the manager dashboard form page
router.get("/addProcurement", (req, res) => {
  res.render("manager"
    
  ),{ title: 'Procurement'}
   
});
//let availableTonnage = totalProcurement - (totalCash + totalCredit)
// POST request handler for registration
router.post("/addProcurement", async (req, res) => {
  try {
    const newProcurement = new Procurement(req.body);
    console.log("This is the data being sent to the DB:", newProcurement);
    await newProcurement.save();
    res.redirect("/cropProcurementList");
  } catch (error) {
    console.error("Error registering the crops:", error);
    res.status(400).send("An error occurred while registering the crop.");
  }
});

//RETRIEVE user from the database
router.get("/cropProcurementList",  connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    // console.log("Request body:", req.body);  
    const procurements = await Procurement.find().sort({ $natural: -1 });

    let totalMaize = await Procurement.aggregate([
      {$match: {produceName: "Maize"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"}, totalSelling:{$sum: "$sellingPrice"}
      }}
    ])
    

    let totalMaizeSell = await Sale.aggregate([
      {$match: {producename: "Maize"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"},
      }}
    ])



    res.render("procurement-List", {
      title: "procurement List",
      procurements: procurements,
      maizeTonnage: totalMaize[0],
      maizeTonnageSell: totalMaizeSell[0],
    });
  } catch (error) {
    res.status(400).send("Unable to find items in the database");
  }
});


// get produce update form
router.get("/updateProcurement/:id",  connectEnsureLogin.ensureLoggedIn(),  async (req, res) => {
  try {
    const  procurement = await Procurement.findOne({ _id: req.params.id });
    const manager = await Signup.find({ role: 'manager' });
    res.render("Update_procurement",  {
      title: "Update procurement",
      procurement:  procurement,
    });
  } catch (err) {
    res.status(400).send("Unable to find item in the database");
  }
});

// post updated produce
router.post("/updateProcurement", async (req, res) => {
  try {
    await Procurement.findOneAndUpdate({ _id: req.query.id }, req.body);
    // io.emit('updateProcurement'); // Notify clients to update data
    res.redirect("/cropProcurementList");
  } catch (err) {
    res.status(404).send("Unable to update item in the database");
  }
});


// delete Produce
router.post("/deleteProcurement", async (req, res) => {
  try {
    await Procurement.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(400).send("Unable to delete item in the database");
  }
});


module.exports = router;
