//Routes for making sale
const express = require("express");
const router = express.Router();

const connectEnsureLogin = require("connect-ensure-login");

const Procurement = require("../models/procurement");
const Sale = require("../models/sale");
const Signup = require("../models/signup");

router.get(
  "/userSale/:id",
    connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const agents = await Signup.find({ role: "sales_agent" });
      const procurement = await Procurement.findOne({ _id: req.params.id });
      const count = await Sale.countDocuments();
      res.json({ count });
      res.render("agent", {
        title: "Sale",
        agents: agents,
        procurement: procurement,
      });
    } catch (error) {
      res.status(400).send("Unable to find sales agents in the database");
    }
  }
);

router.post(
  "/userSale/:id",
    connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const { saleTonnage } = req.body;
      // saleTonnage is the same as req.body.saleTonnage, it's an input name in the add sale pug file
      const procurement = await Procurement.findById({ _id: req.params.id });
      if (!procurement) {
        return res.status(404).send("procurement not found");
      }

      if (procurement.tonnage < saleTonnage) {
        return res
          .status(400)
          .send(
            `Not enough tones in stock,there are ${procurement.tonnage} Kgs in stock`
          );
      }
      if (procurement && procurement.tonnage > 0) {
        const newsale = new Sale(req.body);
        await newsale.save();
        procurement.tonnage -= saleTonnage; // short form of what is below
        // procurement.tonnage = procurement.tonnage - saleTonnage // long form of the above
        await procurement.save();
        res.redirect("/salesList");
      } else {
        return res.status(404).json({ error: "procurement out of stock" });
      }
    } catch (error) {
      console.error("Error saling procurement:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// retrieve sales from the database
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
      .sort({ $natural: -1 })
      .populate("procurementName", "procurementName")
      .populate("salesAgent", "firstName lastName");
    res.render("sales_List", {
      title: "Sales List",
      sales: sales,
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
