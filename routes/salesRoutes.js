const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const connectEnsureLogin = require("connect-ensure-login");

// Assuming Procurement, Sale, and Signup models are correctly imported
const Procurement = require("../models/procurement");
const Sale = require("../models/sale");
const Signup = require("../models/signup");



// Route for displaying the sales form without an ID
// Route to display sales form
router.get('/sales-form', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const procurements = await Procurement.find();
    const agents = await Signup.find({ role: 'sales_agent' });

    // Log retrieved data
    console.log("Procurements:", procurements);
    console.log("Agents:", agents);

    res.render('agent', { procurements, agents });
  } catch (err) {
    console.error('Error fetching procurements or agents:', err);
    res.status(500).send('Server Error');
  }
});
router.post('/sales-form', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const { producename, tonnage, amountPaid, buyerName, dateTime, Totalpayment } = req.body;

    const saleTonnage = Number(tonnage);
    const totalPayment = Number(Totalpayment);

    if (isNaN(saleTonnage) || isNaN(totalPayment)) {
      return res.status(400).send("Invalid number values provided.");
    }

    if (!mongoose.Types.ObjectId.isValid(producename)) {
      return res.status(400).send("Invalid Produce ID");
    }

    const procurement = await Procurement.findById(producename);
    if (!procurement) {
      return res.status(404).send("Procurement not found");
    }

    if (procurement.tonnage < saleTonnage) {
      return res.status(400).send(`Not enough stock. Available: ${procurement.tonnage}, Required: ${saleTonnage}`);
    }

    const newSale = new Sale({
      producename,
      tonnage: saleTonnage,
      amountPaid,
      buyerName,
      salesAgent: req.user._id,
      dateTime: new Date(dateTime),
      Totalpayment: totalPayment
    });

    await newSale.save();

    procurement.tonnage -= saleTonnage;
    await procurement.save();

    res.redirect("/salesList");
  } catch (error) {
    console.error("Error processing sale:", error.message);
    res.status(500).send("Internal server error");
  }
});

// Route to display the list of sales
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
      .sort({ $natural: -1 }) // Sort by the most recent documents
      .populate("producename", "producename") // Correct field name here
      .populate("salesAgent", "username");


      // Format date fields before passing to the template
    // sales.forEach(sale => {
    //   sale.formattedDate = moment(sale.dateTime).format('DD-MM-YYYY');
    // });


    // Check if sales data is empty
    if (!sales.length) {
      console.log("No sales data found.");
      return res.status(404).send("No sales data found.");
    }

    res.render("sales_List", {
      title: "Sales List",
      sales,
    });
  } catch (error) {
    console.error("Error fetching sales:", error.message);
    res.status(500).send("Unable to find items in the database");
  }
});

router.get("/updateSales/:id", async (req, res) => {
  try {
    const item = await Sale.findById(req.params.id)
                           .populate('producename')
                           .populate('salesAgent');
    
    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("update_sales", {
      title: "Update Sales",
      sales: item,
    });
  } catch (err) {
    res.status(500).send("An error occurred while fetching the item");
  }
});


router.post("/updateSales", async (req, res) => {
  try {
    const { id, producename, tonnage, amountPaid, buyerName, salesAgent, dateTime, totalpayment } = req.body;

    if (!id) {
      return res.status(400).send("Sale ID is required");
    }

    await Sale.findByIdAndUpdate(id, {
      producename,
      tonnage,
      amountPaid,
      buyerName,
      salesAgent,
      dateTime,
      totalpayment
    });

    res.redirect("/salesList");
  } catch (err) {
    res.status(500).send("An error occurred while updating the sale");
  }
});



// delete Produce
router.post("/deleteSales", async (req, res) => {
  try {
  await Sale.deleteOne({ _id: req.body.id });
  res.redirect("back");
  } catch (err) {
  res.status(400).send("Unable to delete item in the database");
  }
  });




//reports route

// For managers only connectEnsureLogin.ensureLoggedIn(),
router.get(
  "/reports",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    req.session.user = req.user;
    if (req.user.role == "manager") {
      try {
        // instantiate a crop variable you will use to select a crop.
        let selectedProcurement;
        if (req.query.searchProcurement) selectedProcurement = req.query.searchProcurement;
        // Query for returning all tonnage and revenue of a Procurement
        let items = await Procurement.find({ procurementName: selectedProcurement });

        // console.log("products from the db", goods)
        // console.log("products from the db after search", items)

        let totalGrains = await Procurement.aggregate([
          { $match: { procurementType: "grain" } },
          {
            $group: {
              _id: "$all",
              stockQuantity: { $sum: "$tonnage" },
              totalExpense: { $sum: "$totalCost" }, // or as below
              // totalExpense: { $sum: { $multiply: [ "$produceCost", "$tonnage" ]}},
              totalProjectedRevenue: {
                $sum: { $multiply: ["$sellingPrice", "$tonnage"] },
              },
            },
          },
        ]);

        let totalLegumes = await Procurement.aggregate([
          { $match: { procurementType: "legume" } },
          {
            $group: {
              _id: "$all",
              stockQuantity: { $sum: "$tonnage" },
              totalExpense: { $sum: "$totalCost" },
              totalProjectedRevenue: {
                $sum: { $multiply: ["$sellingPrice", "$tonnage"] },
              },
            },
          },
        ]);
        let totalCereals = await Procurement.aggregate([
          { $match: { procurementType: "cereal" } },
          {
            $group: {
              _id: "$all",
              stockQuantity: { $sum: "$tonnage" },
              totalExpense: { $sum: "$totalCost" },
              totalProjectedRevenue: {
                $sum: { $multiply: ["$sellingPrice", "$tonnage"] },
              },
            },
          },
        ]);
        // Get total quantity and cost of a produce
        let totalCrop = await Procurement.aggregate([
          { $match: { procurementName: selectedProcurement } },
          {
            $group: {
              _id: "$procurementName",
              stockQuantity: { $sum: "$tonnage" },
              totalExpense: { $sum: "$totalCost" },
              totalProjectedRevenue: {
                $sum: { $multiply: ["$sellingPrice", "$tonnage"] },
              },
            },
          },
        ]);

        res.render("reports", {
          title: "Reports",
          produces: items,
          totalgrains: totalGrains[0],
          totallegumes: totalLegumes[0],
          totalcereals: totalCereals[0],
          totalcrop: totalCrop[0],
        });
      } catch (error) {
        res.status(400).send("unable to find items in the database");
        console.log(error);
      }
    } else {
      res.send("This page is only accessed by managers");
    }
  }
);


router.get("/sales_reciept/:id", async (req, res) => {
  try{
      const credit = await Credit.findOne({_id: req.params.id})
      .populate("produceName","produceName")
      .populate("salesAgent","name");
      console.log("my sale",credit)
      // const formattedDate = formatDate(sale.saledate);
      res.render("sales_reciept",{
          credit,
          // formattedDate,
          title: "Receipt"
      });
  } catch (error) {
      res.status(400).send("The item isn't in the database")
  }

})


module.exports = router;
