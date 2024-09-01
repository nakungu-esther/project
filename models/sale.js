const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    producename: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Procurement'
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
        type: mongoose.Schema.Types.ObjectId,
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