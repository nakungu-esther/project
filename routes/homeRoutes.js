const express = require('express');
const router = express.Router();
const Procurement = require('../models/procurement');

// GET request for the home page
router.get('/', async (req, res) => {
  try {
    const procurement = await Procurement.aggregate([
      { 
        $match: { produceName: { $in: ['Beans', 'Maize', 'Soyapeas', 'Cowpeas', 'Groundnut', 'Rice'] } }  
      },
      { 
        $group: { 
          _id: '$produceName', 
          totalTonnage: { $sum: '$tonnage' }  
        } 
      }
    ]);

    
    const procurementData = procurement.map(item => ({
      produceName: item._id,  
      tonnage: item.totalTonnage || 0 
    }));

    res.render('index', {
      procurement: procurementData,  
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
