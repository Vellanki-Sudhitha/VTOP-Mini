const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    filename: String,
    path: String,
    date: Date
});

module.exports = mongoose.model('Assignment', assignmentSchema);