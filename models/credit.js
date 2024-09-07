// models/Credit.js
const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    buyerName: {
        type:String,
        trim: true,
    },
    nationalid: {
        type:String,
        trim: true,
    },
    location: {
        type:String,
        trim:true,
    },
    contact: {
        type:Number,
        trim:true,
    },
    amountDue: {
        type:Number,
        trim:true,
    },
    salesAgent: {
        type:String,
        trim:true,
    },
    dueDate: {
        type:Date,
        trim:true,
    },
    branch: {
        type:String,
        trim: true,
    },
    produceName: {
        type:String,
        trim:true,
    },

    produceType: {
        type:String,
        trim:true,
    },
    tonnage: {
        type:Number,
        trim:true,
    },
    dispatchdate: {
        type:Date,
        trim:true,
    },
});


module.exports = mongoose.model('Credit', creditSchema);


