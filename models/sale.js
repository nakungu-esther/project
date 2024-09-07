const mongoose = require('mongoose');
const Procurement = require('./procurement')

const saleSchema = new mongoose.Schema({
    producename:{
        type: String,
        trim: true,
    },
    tonnage: {
        type: Number,
        trim: true,
    },
    amountPaid: {
        type: Number,
        trim: true,
    },
    buyerName: {
        type:String,
        trim: true,
    },
    salesAgent:{
        type: String,
        ref: 'Signup',
    },
    dateTime:{
        type:Date,
        trim:true,
    },
    Totalpayment:{
        type:Number,
        trim:true,
    }
})
module.exports = mongoose.model('Sale', saleSchema);