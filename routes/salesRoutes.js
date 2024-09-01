const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Assuming Procurement, Sale, and Signup models are correctly imported
const Procurement = require("../models/procurement");
const Sale = require("../models/sale");
const Signup = require("../models/signup");

// Route for displaying the sales form
// Route for displaying the sales form without an ID
// Route for displaying the sales form with an ID
// Route to handle displaying the sales form with specific sale ID

// Route for displaying the sales form without an ID
router.get('/sales-form', async (req, res) => {
  try {
    const procurements = await Procurement.find();
    const agents = await Signup.find({ role: 'sales_agent' });

    res.render('agent', { procurements, agents });
  } catch (err) {
    console.error('Error fetching procurements or agents:', err);
    res.status(500).send('Server Error');
  }
});

// Route to handle sales submission
// Route to handle sales submission without an ID
router.post('/sales-form', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const { saleTonnage, procurementId } = req.body;
    const procurement = await Procurement.findById(procurementId);

    if (!procurement) {
      return res.status(404).send("Procurement not found");
    }

    if (procurement.tonnage < saleTonnage) {
      return res
        .status(400)
        .send(
          `Not enough tones in stock, there are ${procurement.tonnage} Kgs in stock`
        );
    }

    if (procurement && procurement.tonnage > 0) {
      const newsale = new Sale({
        ...req.body,
        produceName: procurement.producename,
        salesAgent: req.user._id // Assuming the logged-in user is the sales agent
      });
      await newsale.save();
      procurement.tonnage -= saleTonnage;
      await procurement.save();
      res.redirect("/salesList");
    } else {
      return res.status(404).json({ error: "Procurement out of stock" });
    }
  } catch (error) {
    console.error("Error processing sale:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// Route to display the list of sales
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
      .sort({ $natural: -1 })
      .populate("procurementName", "procurementName")
      .populate("salesAgent", "username");
    res.render("sales_List", {
      title: "Sales List",
      sales,
    });
  } catch (error) {
    res.status(400).send("Unable to find items in the database");
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
