const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let mentor = [];
let mentorId = 1;
let students = [];
let studentId = 1;



app.post('/mentor', (req, res) => {
    //console.log(req.body);
    if (!req.body.name) {
        res.status(400).json({
            message: "Name is required"
        })
    } else {
        mentor.push({
            id: mentorId,
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            students: []
        })
        mentorId++;
        console.log(mentor);
        res.status(200).json({
            message: "Mentor added successfully."
        })
    }
})

app.post('/student', (req,res) => {
    // onsole.log(req.body); 
    if(!req.body.name) {
        res.status(400).json({
            message: "Name is required"
        })
    } else {
        students.push({
            id: studentId,
            name: req.body.name,
            course: req.body.course,
            phone: req.body.phone,
            mentor: ''
        })
        studentId++,
        console.log(students);
        res.status(200).json({
            message: "Student added successfully."
        })
    }
})

app.put('/update', (req,res) => {
    if(!req.body.mentorId && !req.body.studentId) {
        res.status(400).json({
            message: "Mentor and Student IDs are required for updating."
        })
    }
    else{
        let men = req.body.mentorId;
        let std = req.body.studentId;
        if (students[std].mentor) {
            let menRemove = students[std].mentor.id;
            mentor[menRemove].students.forEach(element => {
                if (std == element.id) {
                    element.splice(element, 1);
                }
            });
        } students[std].mentor = mentor[men];
        mentor[men].students.push(students[std]);
        
        res.status(200).json({
            message: 'Updated'
        })
    }
});

app.post('/list', (req, res) => {
    if (!req.body.mentorId) {
        res.status(400).json({
            message: "Mentor Id is missing."
        })
    } else {
        if (mentor.length === 0) {
            res.json({
                message: "No mentor assigned."
            })
        }
        else {
            res.status(200).json({
                message: "List of student "+ mentor[req.body.id].name,
                list: mentor[req.body.mentorId].students
            })
        }
    }
})

app.get('/mentorList', (req, res) => {
    res.status(200).json(mentor);
})

app.get('/studentList', (req, res) => {
    res.status(200).json(students);
})

app.listen(port, () => {
    console.log("App listening to "+ port)
})

