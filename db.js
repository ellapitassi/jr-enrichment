//when you change anything in models, go to app and do forceTrue,
//keep checking in postico to see if your changes are good

//where you write the models
const Sequelize = require('sequelize');


const db = new Sequelize('postgres://localhost/juniorenrichment', {
  logging: false
});


const Student = db.define("student" , {
	/* STUDENT MODEL CODE HERE */
// - a name
// - a GPA 
// - a teacherID for their corresponding teacher. 
// - a method for giving a letter grade based on their GPA (4.0 == A, 3.0 == B, 2.0 == C etc). 
// - A class method for getting all students with a perfect (4.0) GPA.
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	GPA: {
		type: Sequelize.DECIMAL,
		allowNull: false
	// },
	// teacherID: {
	// 	tyle: Sequelize.INTEGER,
	// 	allowNull: false
	}
})

	// hooks: { //from wiki
	// 	beforeValidate: function generateLetterGrade (page) {       
	// 		if (student.GPA) { // some better formula for convertting?
	// 			if (student.GPA > 3.0){
	// 				student.grade = 'A';
	// 			}else if (student.GPA > 2.0){
	// 				student.grade = 'B';
	// 			}else if (student.GPA > 1.0){
	// 				student.grade = 'C';
	// 			}else (student.grade = 'C');
	// 		}
	// 	}
	// }

Student.prototype.getLetterGrade = function(GPA){ //thought hook from looking at my solution then from figuring out next one
	//thought it was just method...
	if (this.GPA > 3.0){
		this.grade = 'A';
	} else if (this.GPA > 2.0){
		this.grade = 'B';
	} else if (this.GPA > 1.0){
		this.grade = 'C';
	} else (this.grade = 'C');
	return this.grade;
}

// Page.prototype.findSimilar = function () {
//     return Page.findAll({
//         where: {
//             id: {
//                 $ne: this.id
//             },
//             tags: {
//                 $overlap: this.tags
//             }
//         }
//     });
// }
Student.prototype.findPerfectStudents = function () { //class method because checks all??
	return Page.findAll({
        where: {
        GPA: 4.0
        }
    });
}


	

const Teacher = db.define('teacher', {
	/* TEACHER MODEL CODE HERE */
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	subject: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//FROM WIKISTACK -- FOR setting ASSOCIATIONS
//Page.belongsTo(User, {as: 'author'});

// - a teacherID for their corresponding teacher. 
Student.belongsTo(Teacher)//sets it as teacherID
module.exports = {db, Student, Teacher}


//cant deal with associations inside virtual columns, whereas things on the prototype (grade) does