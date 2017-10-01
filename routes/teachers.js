//need to define these are a router
var express = require('express');
var router = express.Router(); //this needs to be what you call your verb things off of and be the same as this and
//what you export

//need to require models (db)
var db = require('../db');
var Student = db.Student;
var Teacher = db.Teacher;

module.exports = router;//this is what you export, again has to be the same

// - GET all teacehrs and return them in json
// - GET teacher by ID # and return a json of that teacher


router.get('/', function(req,res,next){
    Teacher.findAll({})
    .then(function(teachers){
        res.json(teachers);
    });
})

router.get('/:id', function(req,res,next){
    Teacher.findById(req.params.id) 
    .then(function(teacher){
        if (!teacher){
            res.status(404).send("No teacher found")
        }
        res.json(teacher);
    });
    //returns 404 if id nto correct
    var teachers = Teacher.findAll({})
    
})

// - GET all student for a specific teacher's ID # ////////////
router.get('/:teacherId', function(req,res,next){
    return Student.findAll({ 
        where: { teacherId: req.params.teacherId
        }
    })
    .then(function (students){
        res.json(students)
    })
});

router.post('/', function (req,res,next){
    if (!req.body.subject){
        res.status(404).send("No subject included")
    }
    Teacher.create(req.body) //{name: "emily", subject: "math"} this is whole req.body but to acces them look at .name etc
    .then(teacher => res.json(teacher).status(201).end())
})
///if we send a teacher without a subject...

//findOne - have to define a where {where: {id: id}}
//findByID - takes id
//findAll has where if youre looking for specific attribute if not leave empty