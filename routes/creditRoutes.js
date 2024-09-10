const express = require('express');
const router = express.Router();

// Import models
const Credit = require('../models/credit');
const Procurement = require('../models/procurement');
const Signup = require('../models/signup');
const Sale = require('../models/sale');

// Render credit form
router.get('/debit', (req, res) => {
  res.render('credit', { title: "Sales", user: req.user });
});

// Check if the buyer is trusted
const checkTrustedBuyer = async (buyerName) => {
  try {
    console.log('Checking trusted buyer for:', buyerName);

    // Sum the total tonnage of sales for the buyer
    const totalPurchased = await Sale.aggregate([
      { $match: { buyerName } },
      { $group: { _id: null, totalTonnage: { $sum: "$tonnage" } } }
    ]);

    const totalTonnage = totalPurchased.length ? totalPurchased[0].totalTonnage : 0;
    console.log('Total tonnage purchased:', totalTonnage);

    // Fetch all credits for the buyer by name
    const buyerCredits = await Credit.find({ buyerName });
    console.log('Buyer credits:', buyerCredits);

    // Determine if this is the buyer's first credit request
    const isFirstTimeCredit = buyerCredits.length === 0;
    console.log('Is first-time credit:', isFirstTimeCredit);

    // First-time credit eligibility
    if (isFirstTimeCredit) {
      if (totalPurchased[0].totalTonnage >= 10) { // Example threshold of 10 tons
        console.log('First-time buyer eligible for credit');
        return true;
      } else {
        console.log('First-time buyer not eligible for credit');
        return false;
      }
    }

    // Returning buyer eligibility check
    const hasGoodHistory = buyerCredits.every(credit => credit.status === 'paid');
    const totalCreditTransactions = buyerCredits.length;
    const creditLimit = 5;

    if (hasGoodHistory && totalTonnage >= 10 && totalCreditTransactions < creditLimit) {
      console.log('Returning buyer eligible for credit');
      return true;
    } else {
      console.log('Returning buyer not eligible for credit');
      return false;
    }
  } catch (error) {
    console.error("Error checking buyer trust status:", error);
    throw new Error("Unable to verify buyer credit history");
  }
};

// Handle credit requests
router.post('/debit', async (req, res) => {
  const { buyerName, produceName, tonnage } = req.body;

  if (!buyerName || !produceName || !tonnage) {
    return res.status(400).send('Missing required fields');
  }

  // Convert tonnage to number
  const tonnageNum = Number(tonnage);
  if (isNaN(tonnageNum)) {
    return res.status(400).send('Invalid tonnage value');
  }

  try {
    // Check if the buyer is trusted
    const isEligible = await checkTrustedBuyer(buyerName);

    if (isEligible) {
      // Additional logic before redirecting
      const creditSale = new Credit(req.body);
      await creditSale.save();
      res.redirect('/mylist');
    } else {
      // Handle ineligibility
      res.status(403).send('Buyer is not eligible for credit');
    }
  } catch (error) {
    console.error('Error in /debit route:', error);
    res.status(500).send('Internal server error');
  }
});

// Display list of credits
router.get('/mylist', async (req, res) => {
  try {
    const creditItems = await Credit.find().sort({ $natural: -1 });
    res.render('credit_list', { title: "Credit List", credits: creditItems });
  } catch (error) {
    res.status(404).send("Unable to find items in the db");
  }
});

// Render credit update form
router.get("/updateCredit/:id", async (req, res) => {
  try {
    const item = await Credit.findOne({ _id: req.params.id });
    res.render("update_credit", { title: "Update Credit", credit: item });
  } catch (err) {
    res.status(400).send("Unable to find item in the database");
  }
});

// Update credit
router.post("/updateCredit", async (req, res) => {
  try {
    await Credit.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/mylist");
  } catch (err) {
    res.status(404).send("Unable to update item in the database");
  }
});

// Delete credit
router.post("/deleteCredit", async (req, res) => {
  try {
    await Credit.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(400).send("Unable to delete item in the database");
  }
});

// Render credit form with procurement data
router.get("/debit/:id", async (req, res) => {
  try {
    const agents = await Signup.find({ role: "sales_agent" });
    const procurement = await Procurement.findOne({ _id: req.params.id });
    res.render("credit", {
      title: "Credit",
      agents: agents,
      procurement: procurement
    });
  } catch (error) {
    res.status(400).send("Unable to find sales agents in the database");
  }
});

// Handle credit request with procurement data
router.post('/debit/:id', async (req, res) => {
  try {
    const { tonnage } = req.body;
    const procurement = await Procurement.findById(req.params.id);

    if (!procurement) {
      return res.status(404).send('Procurement not found');
    }

    if (procurement.tonnage < tonnage) {
      return res.status(400).send(`Not enough stock, only ${procurement.tonnage} available`);
    }

    if (procurement.tonnage > 0) {
      const newCredit = new Credit(req.body);
      await newCredit.save();
      procurement.tonnage -= tonnage;
      await procurement.save();
      res.redirect("/mylist");
    } else {
      return res.status(404).send('Produce out of stock');
    }
  } catch (error) {
    console.error('Error processing credit:', error);
    return res.status(500).send('Internal server error');
  }
});

// Retrieve a specific receipt
router.get('/receipt/:id', async (req, res) => {
  try {
    const credit = await Credit.findOne({ _id: req.params.id })
      .populate('produceName', 'produceName')
      .populate('salesAgent', 'username');

    if (!credit) {
      return res.status(404).send('Receipt not found');
    }

    const receipt = {
      credits: [credit],
      grandTotal: credit.amountDue
    };

    res.render('credit_receipt', {
      receipt,
      title: 'Receipt',
    });
  } catch (error) {
    console.error('Error retrieving receipt:', error);
    res.status(400).send('An error occurred while retrieving the receipt');
  }
});

module.exports = router;
