const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    produceName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Procurement'
    },
    saleTonnage: {
        type: Number,
        trim: true,
    },
    amount: {
        type: Number,
        trim: true,
    },
    buyername: {
        type:String,
        trim: true,
    },
    salesAgent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
    },
    saleDate:{
        type:Date,
        trim:true,
    },
    saleTime:{
        type:String,
        trim:true,
    }
})
module.exports = mongoose.model('Sale', saleSchema);