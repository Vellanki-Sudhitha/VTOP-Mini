const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    subject: String,
    marks: Number
});

module.exports = mongoose.model('Marks', schema);