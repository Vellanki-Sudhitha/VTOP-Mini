
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model('Feedback', schema);