const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); //parsing the req/res

const db = require('./db').db;
const Student = require('./db').Student;
const Teacher = require('./db').Teacher;

//middleware
let PORT = 8080;
app.use(bodyParser.json()) //NEED
app.use(bodyParser.urlencoded({ extended: true})); //NEED

app.get("/test", (req, res, next) => {
	// Visit http://localhost:8080/test to see the message!
	res.send("Hello GET Route!")
})
/* 
 Your Route Code Here
*/
//routes (like our wiki)
// var routes = require('./routes');
// app.use(routes);//plugging them in
app.use('/students', require('./routes/students')); //****
app.use('/teachers', require('./routes/teachers')); //****



db.sync({})//force: true
.then(() => {
	console.log('db synced')
	app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
});

//.catch(console.error); //need it?
