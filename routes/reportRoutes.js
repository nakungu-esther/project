const express = require("express");
const router = express.Router();
const passport = require('passport');


const connectEnsureLogin = require("connect-ensure-login");

// For managers only
router.get("/reports", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    req.session.user = req.user;

    if (req.user.role === 'manager') {
        try {
            // Instantiate a crop variable to use to select a crop.
            let selectedProduce;
            if (req.query.searchProduce)
            selectedProduce = req.query.searchProduce

            // Query for returning all tonnage and revenue of a produce
            let items = await  Procurement .find({ produceName: selectedProduce });

            let totalGrains = await Procurement.aggregate([
                { $match: { produceType: 'grain' } },
                {
                    $group: {
                        _id: '$all',
                        stockQuantity: { $sum: "$tonnage" },
                        totalExpense: { $sum: "$totalCost" },
                        totalProjectedRevenue: { $sum: { $multiply: ["$sellingPrice", "$tonnage"] } },
                    }
                }
            ]);

            let totalCereals = await Procurement.aggregate([
                { $match: { produceType: 'cereals' } },
                {
                    $group: {
                        _id: '$all',
                        stockQuantity: { $sum: "$tonnage" },
                        totalExpense: { $sum: "$totalCost" },
                        totalProjectedRevenue: { $sum: { $multiply: ["$sellingPrice", "$tonnage"] } },
                    }
                }
            ]);

            let totalLegumes = await Procurement.aggregate([
                { $match: { produceType: 'legume' } },
                {
                    $group: {
                        _id: '$all',
                        stockQuantity: { $sum: "$tonnage" },
                        totalExpense: { $sum: "$totalCost" },
                        totalProjectedRevenue: { $sum: { $multiply: ["$sellingPrice", "$tonnage"] } },
                    }
                }
            ]);

            // Get total quantity and cost of a specific produce
            let totalCrop = await Procurement.aggregate([
                { $match: { produceName: selectedProduce } },
                {
                    $group: {
                        _id: "$produceName",
                        stockQuantity: { $sum: "$tonnage" },
                        totalExpense: { $sum: "$totalCost" },
                        totalProjectedRevenue: { $sum: { $multiply: ["$sellingPrice", "$tonnage"] } },
                    }
                }
            ]);

            res.render("reports", {
                title: 'Reports',
                produces: items,
                totalgrains: totalGrains[0] ,
                totalcereals: totalCereals[0] ,
                totallegumes: totalLegumes[0] ,
                totalcrop: totalCrop[0] ,
            });
        } catch (error) {
            res.status(400).send("Unable to find items in the database");
            console.error(error);
        }
    } else {
        res.status(403).send("This page is only accessed by managers");
    }
});

module.exports = router;
