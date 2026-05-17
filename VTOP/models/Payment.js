const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: Number,
    deadline: String,
    status: String,
    date: Date
});

module.exports = mongoose.model('Payment', paymentSchema);