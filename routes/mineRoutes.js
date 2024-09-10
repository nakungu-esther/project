const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const Sale = require('../models/sale'); // Update with the correct path to your Sale model
const Procurement = require('../models/procurement'); // Update with the correct path to your Procurement model
const Credit = require('../models/credit');

// Helper function to format numbers as currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(amount);
};

// GET request for the overview page

router.get('/overView', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    // Total Stock (Tonnage)
    const totalStock = await Procurement.aggregate([
      { $match: { tonnage: { $exists: true, $ne: null } } },
      { $project: { tonnage: { $toDouble: "$tonnage" } } },
      { $group: { _id: null, total: { $sum: "$tonnage" } } }
    ]);
    const totalStockValue = totalStock.length > 0 ? totalStock[0].total : 0;

    // Total Credit
    const totalCredit = await Credit.aggregate([
      { $match: { amountDue: { $exists: true, $ne: null } } },
      { $project: { amountDue: { $toDouble: "$amountDue" } } },
      { $group: { _id: null, total: { $sum: "$amountDue" } } }
    ]);
    const totalCreditValue = totalCredit.length > 0 ? totalCredit[0].total : 0;
    const formattedCreditValue = formatCurrency(totalCreditValue);

    // Total Sales Count
    const totalSales = await Sale.countDocuments();

    // Procurement Data for Chart (Group by produce name and sum the tonnage)
    const procurementData = await Procurement.aggregate([
      { $group: { _id: '$produceName', totalTonnage: { $sum: { $toDouble: '$tonnage' } } } }
    ]);

    // Sales Data for Chart (Group by produce name and sum the sales)
    const salesData = await Sale.aggregate([
      { $group: { _id: '$producename', totalSales: { $sum: { $toDouble: '$tonnage' } } } }
    ]);

    // Send data to the Pug template
    res.render('mine', {
      user: req.user,
      totalStock: totalStockValue,
      totalCredit: formattedCreditValue,
      totalSales,
      procurementData,
      salesData
    });
  } catch (error) {
    console.error("Error fetching overview data:", error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;