const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const connectEnsureLogin = require("connect-ensure-login");

// Assuming Procurement, Sale, and Signup models are correctly imported
const Procurement = require("../models/procurement");
const Sale = require("../models/sale");
const Signup = require("../models/signup");



// Route for displaying the sales form without an ID


// router.get('/sales-form', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//   try {
//     // Fetch data from the database
//     const procurements = await Procurement.find();
//     const agents = await Signup.find({ role: 'sales_agent' });

//     // Log retrieved data for debugging
//     console.log("Procurements:", procurements);
//     console.log("Agents:", agents);

//     // Check the user's role
//     if (req.user.role === 'manager') {
//       // If the user is a manager, render a specific view or provide additional data
//       res.render('agent', { procurements, agents, user: req.user });
//     } else if (req.user.role === 'sales_agent') {
//       // If the user is a sales agent, render the agent view
//       res.render('agent', { procurements, agents, user: req.user });
//     } else {
//       // Handle unauthorized access
//       res.status(403).send('Access Denied');
//     }
//   } catch (err) {
//     console.error('Error fetching procurements or agents:', err);
//     res.status(500).send('Server Error');
//   }
// });

//Route to display sales form
router.get('/sales-form', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    // Retrieve procurements and agents
    const procurements = await Procurement.find();
    const agents = await Signup.find({ role: 'sales_agent' });

    // Log retrieved data for debugging
    console.log("Procurements:", procurements);
    console.log("Agents:", agents);

    // Check if the user is either a sales agent or manager
    if (req.user.role === 'sales_agent' || req.user.role === 'manager') {
      // Render the sales form and pass the user role
      res.render('agent', { procurements, agents, user: req.user, isManager: req.user.role === 'manager' });
    } else {
      // If the user is not authorized, send a 403 Forbidden response
      res.status(403).send('Access Forbidden');
    }
  } catch (err) {
    console.error('Error fetching procurements or agents:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/sales-form', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const { producename, tonnage, amountPaid, buyerName, dateTime, Totalpayment, salesAgent } = req.body;

    const saleTonnage = Number(tonnage);
    const totalPayment = Number(Totalpayment);

    if (isNaN(saleTonnage) || isNaN(totalPayment)) {
      return res.status(400).send("Invalid number values provided.");
    }

    // Query the Procurement model by produceName
    const procurement = await Procurement.findOne({ produceName: producename });
    if (!procurement) {
      return res.status(404).send("Procurement not found");
    }

    if (procurement.tonnage < saleTonnage) {
      return res.status(400).send(`Not enough stock. Available: ${procurement.tonnage}, Required: ${saleTonnage}`);
    }

    // Create new sale
    const newSale = new Sale({
      producename, // Reference to the procurement ID
      tonnage: saleTonnage,
      amountPaid,
      buyerName,
      salesAgent,
      dateTime: new Date(dateTime),
      Totalpayment: totalPayment
    });

    await newSale.save();

    // Update procurement tonnage
    procurement.tonnage -= saleTonnage;
    await procurement.save();

    // Populate the produceName from the referenced Procurement document
    const populatedSale = await Sale.findById(newSale._id).populate({
      path: 'producename', // This refers to the field in Sale schema
      select: 'produceName' // Only populate the `produceName` field
    });

    // Redirect or send populated sale
    res.redirect("/sales-form");
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
      // .populate('procurement')
      // .populate("producename") // Ensure this matches your schema
      // .populate("salesAgent") // Populate if salesAgent is a reference
      .exec();
      let totalSales = await Sale.aggregate([
        {$group: {_id:"$all", total:{$sum: "$Totalpayment"}}}
      ])

    res.render("sales_List", {
      title: "Sales List",
      sales: sales,
      Totalpay: totalSales[0],
    });
  } catch (error) {
    console.error("Error fetching sales:", error.message);
    res.status(500).send("Unable to find items in the database");
  }
});



router.get("/updateSales/:id", async (req, res) => {
  try {
    const item = await Sale.findOne({_id: req.params.id });
    res.render("update_sales", {
      title: "Update Sales",
      sales: item,
    });
  } catch (err) {
    res.status(500).send("An error occurred while fetching the item");
  }
});


router.post('/updateSale', async (req, res) => {
  try {
    await Sale.findOneAndUpdate({
      _id: req.query.id
    },req.body)
    res.redirect('/salesList')
  } catch (error){
    console.log (error)
    res.status(404).send("Unable to update sales in the database");
  }
  
})



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

// For managers only
// For managers only

// Route to generate the report
// Route to generate the report
router.get('/reports', connectEnsureLogin.ensureLoggedIn(),  async (req, res) => {
  try {
      // Fetch and aggregate data from the Procurement model
      const procurements = await Procurement.aggregate([
          {
              $group: {
                  _id: '$produceName',
                  totaltonnage: { $sum: '$tonnage' },
                  totalCost: { $sum: '$cost' },
                  totalSellingPrice: { $sum: '$sellingPrice' }
              }
          },
          {
              $addFields: {
                  totalExpense: '$totalCost',
                  projectedRevenue: {
                      $subtract: ['$totalSellingPrice', '$totalCost']
                  }
              }
          }
      ]);

      // Render the report page with the fetched data
      res.render('reports', { procurements,
        user: req.user
       });
  } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).send('Server Error');
  }
});

// Route to display a specific receipt

router.get('/receipt2/:id', async (req, res) => {
  try {
    const saleId = req.params.id;

    // Find the sale by ID and populate necessary fields
    const sale = await Sale.findById(saleId)
      .populate('producename')
      .populate('salesAgent')
      .exec();
    
    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    // Calculate total payment for this sale
    const totalPayment = sale.Totalpayment || 0;  // Use Totalpayment from sale

    // Render the receipt page, passing in the sale and total payment
    res.render('sales_reciept', {
      receipt: {
        sales: [sale],  // Pass sales as an array
        grandTotal: totalPayment  // Use totalPayment to populate grandTotal
      }
    });
  } catch (error) {
    console.error("Error generating receipt:", error.message);
    res.status(500).send("Internal server error");
  }
});





module.exports = router;
