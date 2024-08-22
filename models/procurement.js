// models/Procurement.js
const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true,
  },
  produceType: {
    type: String,
    trim: true,
  },
  procureDate: {
    type: Date,
    trim: true,
  },
  procureTime: {
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
  dealerName: {
    type: String,
    trim: true,
  },
  branchName: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  sellingPrice: {
    type: Number,
    trim: true,
  },
});



module.exports = mongoose.model('Procurement', procurementSchema);
