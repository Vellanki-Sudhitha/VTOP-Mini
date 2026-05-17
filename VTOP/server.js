const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); 


mongoose.connect('mongodb://127.0.0.1:27017/vtop')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const Attendance = require('./models/Attendance');
const Marks = require('./models/Marks');
const Feedback = require('./models/Feedback');
const Payment = require('./models/Payment');
const Assignment = require('./models/Assignment');





app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "Sudhi@123") {
        res.send("Success");
    } else {
        res.send("Fail");
    }
});





app.get('/attendance', async (req, res) => {
    const data = await Attendance.find();

    const result = data.map(item => ({
        subject: item.subject,
        percentage: ((item.present / item.total) * 100).toFixed(2)
    }));

    res.json(result);
});




app.get('/marks', async (req, res) => {
    const data = await Marks.find();

    const result = data.map(item => {
        let grade;

        if (item.marks >= 90) grade = 'S';
        else if (item.marks >= 80) grade = 'A';
        else if (item.marks >= 70) grade = 'B';
        else if (item.marks >= 60) grade = 'C';
        else if (item.marks >= 50) grade = 'D';
        else if (item.marks >= 40) grade = 'E';
        else grade = 'F';

        return {
            subject: item.subject,
            marks: item.marks,
            grade: grade
        };
    });

    res.json(result);
});




app.post('/feedback', async (req, res) => {
    if (!req.body.text || req.body.text.trim() === "") {
        return res.send("Feedback cannot be empty");
    }

    await Feedback.create({ text: req.body.text });
    res.send("Feedback saved");
});

app.get('/feedback', async (req, res) => {
    const data = await Feedback.find();
    res.json(data);
});

app.delete('/feedback/:id', async (req, res) => {
    await Feedback.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});



app.post('/bookTransport', async (req, res) => {
    await Payment.create({
        amount: 5000,
        deadline: "2026-05-01",
        status: "Pending",
        date: new Date()
    });
    res.send("Booked");
});

app.post('/bookHostel', async (req, res) => {
    await Payment.create({
        amount: 80000,
        deadline: "2026-05-05",
        status: "Pending",
        date: new Date()
    });
    res.send("Booked");
});

app.get('/payments', async (req, res) => {
    const data = await Payment.find();
    res.json(data);
});


app.post('/pay/:id', async (req, res) => {
    await Payment.findByIdAndDelete(req.params.id);
    res.send("Payment Successful");
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.send("No file");

    await Assignment.create({
        filename: req.file.filename,
        path: req.file.path,
        date: new Date()
    });

    res.send("File Uploaded Successfully");
});

app.get('/assignments', async (req, res) => {
    const data = await Assignment.find();
    res.json(data);
});





app.get('/', (req, res) => {
    res.redirect('/login.html');
});



app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});