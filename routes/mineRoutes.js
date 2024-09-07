const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const Sale = require('../models/sale'); // Update with the correct path to your Sale model
const Procurement = require('../models/procurement'); // Update with the correct path to your Procurement model

// Helper function to format numbers as currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(amount);
};

// GET request for the overview page
router.get('/overView', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try {
      const totalStock = await Procurement.aggregate([
        { $match: { tonnage: { $exists: true, $ne: null } } },
        { $project: { tonnage: { $toDouble: "$tonnage" } } },
        { $group: { _id: null, total: { $sum: "$tonnage" } } }
      ]).catch(err => console.error("Error aggregating stock:", err));
  
      const totalStockValue = totalStock.length > 0 ? totalStock[0].total : 0;
      console.log("Total Stock:", totalStockValue); // Debugging line
  
      const totalCredit = await Sale.aggregate([
        { $match: { Totalpayment: { $exists: true, $ne: null } } },
        { $project: { Totalpayment: { $toDouble: "$Totalpayment" } } },
        { $group: { _id: null, total: { $sum: "$Totalpayment" } } }
      ]).catch(err => console.error("Error aggregating credit:", err));
  
      const totalCreditValue = totalCredit.length > 0 ? totalCredit[0].total : 0;
      const formattedCreditValue = formatCurrency(totalCreditValue); // Format as currency
      console.log("Total Credit:", formattedCreditValue); // Debugging line
  
      const totalSales = await Sale.countDocuments().catch(err => console.error("Error counting sales:", err));
      console.log("Total Sales:", totalSales); // Debugging line
  
      res.render('mine', {
        user: req.user,
        totalStock: totalStockValue,
        totalCredit: formattedCreditValue,
        totalSales
      });
    } catch (error) {
      console.error("Error fetching overview data:", error.message);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;
