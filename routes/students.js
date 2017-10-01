//need to define these are a router
var express = require('express');
var router = express.Router();

//need to require models (db)
var db = require('../db');
var Student = db.Student;
var Teacher = db.Teacher;
module.exports = router;


// - GET all student and return them in json
// - GET student by ID # and return a json of that student
// - GET all student for a specific teacher's ID # ////////////
// - DELETE a student and return a status code of 202 //if not specified do it by ID
// - UPDATE a student's teacher and return a status code of 204
//GET to /students
router.get('/', function(req,res,next){
    Student.findAll({})
    .then( function(students){
        res.json(students);
    })
})

//GET to /students/2
// router.get('/:id', function(req,res,next){
//     Student.findOne({ 
//         where: { id: req.params.id
//         }
//     })
//     .then(function (student){
//         res.json(student)
//     })
// });
//or this
router.get('/:id', function (req, res, next) {
    Student.findById(req.params.id)
    .then(function (student){
        res.json(student)
    })
})

// - DELETE a student and return a status code of 202
router.delete('/:id', function(req,res,next){
    var id = req.params.id;
    Student.destroy({where: {id}}) // same as {id: id}  Student.destroy({where: {id: req.params.id}})
    .then( ()=> { res.sendStatus(202); } )
})


// - UPDATE a student's teacher and return a status code of 204
router.put('/:id', function(req,res,next){ //TEACHER PARAM NOT NEEDED?
    const student = req.params.id;
    Student.findById(student)
    .then(teacherID => teacherID.update(req.body))
    .catch(next)
})

