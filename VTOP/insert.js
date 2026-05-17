const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/vtop');

const Attendance = require('./models/Attendance');
const Marks = require('./models/Marks');

async function run() {

    
    await Attendance.deleteMany({});
    await Marks.deleteMany({});

    
    await Attendance.insertMany([
        { subject: "Web Tech", present: 41, total: 50 },
        { subject: "TOC", present: 38, total: 50 },
        { subject: "Soft Computing", present: 45, total: 50 },
        { subject: "STS Coding", present: 39, total: 50 },
        { subject: "Social Inequalities", present: 34, total: 50 }
    ]);

    await Marks.insertMany([
        { subject: "Web Tech", marks: 85 },
        { subject: "TOC", marks: 78 },
        { subject: "Soft Computing", marks: 88 },
        { subject: "STS Coding", marks: 91 },
        { subject: "Social Inequalities", marks: 74 }
    ]);

    console.log("Clean data inserted (no duplicates)");
    process.exit();
}

run();