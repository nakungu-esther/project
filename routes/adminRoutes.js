const express = require('express');
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Import your models

const Procurement = require('../models/procurement');
const Sale = require('../models/sale');
const Credit = require('../models/credit');

// GET request handler for the admin dashboard
router.get('/admindashboard', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try {
       
        // Aggregate for total procurement amount and tonnage
        const procurementData = await Procurement.aggregate([
            {
                $group: {
                    _id: null,
                    totalProcurementAmount: { $sum: "$totalPrice" },  // Assuming 'totalPrice' is the field for procurement amount
                    totalProcurementTonnage: { $sum: "$tonnage" },    // Summing 'tonnage' field
                    procurementCount: { $sum: 1 }
                }
            }
        ]);

        // Aggregate for total sales amount and tonnage
        const salesData = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalesAmount: { $sum: "$totalSalesAmount" },  // Assuming 'totalSalesAmount' is the field for sales amount
                    totalSalesTonnage: { $sum: "$tonnage" },          // Summing 'tonnage' field
                    salesCount: { $sum: 1 }
                }
            }
        ]);

        // Aggregate for total credit sales amount and amount due
        const creditData = await Credit.aggregate([
            {
                $group: {
                    _id: null,
                    totalCreditSalesAmount: { $sum: "$totalCreditAmount" },  // Assuming 'totalCreditAmount' is the field for credit sales
                    totalAmountDue: { $sum: "$amountDue" },                  // Summing 'amountDue' field
                    creditSalesCount: { $sum: 1 }
                }
            }
        ]);

        // Extract the aggregated values
        const totalProcurementAmount = procurementData.length > 0 ? procurementData[0].totalProcurementAmount : 0;
        const totalProcurementTonnage = procurementData.length > 0 ? procurementData[0].totalProcurementTonnage : 0;
        const procurementCount = procurementData.length > 0 ? procurementData[0].procurementCount : 0;

        const totalSalesAmount = salesData.length > 0 ? salesData[0].totalSalesAmount : 0;
        const totalSalesTonnage = salesData.length > 0 ? salesData[0].totalSalesTonnage : 0;
        const salesCount = salesData.length > 0 ? salesData[0].salesCount : 0;

        const totalCreditAmount = creditData.length > 0 ? creditData[0].totalCreditsAmount : 0;
        const totalAmountDue = creditData.length > 0 ? creditData[0].totalAmountDue : 0;
        const creditCount = creditData.length > 0 ? creditData[0].creditCount : 0;

        // Render the admin dashboard template with the aggregated data
        res.render('admin', {
            user: req.user,
            procurementCount,        // Number of procurements
            totalProcurementAmount,  // Total procurement amount
            totalProcurementTonnage, // Total procurement tonnage
            salesCount,              // Number of sales
            totalSalesAmount,        // Total sales amount
            totalSalesTonnage,       // Total sales tonnage
            creditCount,        // Number of credit sales
            totalCreditAmount,  // Total credit sales amount
            totalAmountDue           // Total amount due from credit sales
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
