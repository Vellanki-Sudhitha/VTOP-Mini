const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    subject: String,
    present: Number,
    total: Number
});

module.exports = mongoose.model('Attendance', schema);