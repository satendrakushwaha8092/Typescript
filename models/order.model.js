const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    item: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        trim: true,
        ref: "users"
    }
}, { timestamps: true });

module.exports = mongoose.model('orders', orderSchema)