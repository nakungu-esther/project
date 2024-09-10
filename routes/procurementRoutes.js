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
router.post("/addProcurement", connectEnsureLogin.ensureLoggedIn(),  async (req, res) => {
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
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"}, 
      }}
    ])
    let totalRice = await Procurement.aggregate([
      {$match: {produceName: "Rice"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"}, 
      }}
    ])
    let totalBeans = await Procurement.aggregate([
      {$match: {produceName: "Beans"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"}, 
      }}
    ])
    let totalCowpeas = await Procurement.aggregate([
      {$match: {produceName: "Cowpeas"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"}, 
      }}
    ])
    let totalSoyapeas = await Procurement.aggregate([
      {$match: {produceName: "Soyapeas"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"}, 
      }}
    ])
    let totalGroundnut = await Procurement.aggregate([
      {$match: {produceName: "Groundnut"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"}, 
      }}
    ])
    

    

    let totalMaizeSell = await Sale.aggregate([
      {$match: {producename: "Maize"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"},
      }}
    ])
    
    let totalRiceSell = await Sale.aggregate([
      {$match: {producename: "Rice"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"},
      }}
    ])
    
    let totalBeansSell = await Sale.aggregate([
      {$match: {producename: "Beans"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"},
      }}
    ])
    
    let totalCowpeasSell = await Sale.aggregate([
      {$match: {producename: "Cowpeas"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"},
      }}
    ])
    
    let totalSoyapeasSell = await Sale.aggregate([
      {$match: {producename: "Soyapeas"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"},
      }}
    ])
    
    let totalGroundnutSell = await Sale.aggregate([
      {$match: {producename: "Groungnut"}},
      {$group: {_id: "$all", totalQuatity: {$sum: "$tonnage"},
      }}
    ])



    res.render("procurement-List", {
      title: "procurement List",
      procurements: procurements,
      maizeTonnage: totalMaize[0],
      maizeTonnageSell: totalMaizeSell[0],
      riceTonnage: totalRice[0],
      riceTonnageSell: totalRiceSell[0],
      beanTonnage: totalBeans[0],
      beanTonnageSell: totalBeansSell[0],
      cowpeasTonnage: totalCowpeas[0],
      coepeasTonnageSell: totalCowpeasSell[0],
      soyapeasTonnage: totalSoyapeas[0],
      sayapeasTonnageSell: totalSoyapeasSell[0],
      groundnutTonnage: totalGroundnut[0],
      groundnutTonnageSell: totalGroundnutSell[0],

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
