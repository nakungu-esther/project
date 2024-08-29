// models/Procurement.js
const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
  producename: {
    type: String,
    trim: true,
  },
  producetype: {
    type: String,
    trim: true,
  },
  procuredate: {
    type: Date,
    trim: true,
  },
  procuretime: {
    type: String,
    trim: true,
  },
  tonnage: {
    type: Number,
    trim: true,
  },
  cost: {
    type: Number,
    trim: true,
  },
  dealername: {
    type: String,
    trim: true,
  },
  branchname: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  sellingprice: {
    type: Number,
    trim: true,
  },
});



module.exports = mongoose.model('Procurement', procurementSchema);
