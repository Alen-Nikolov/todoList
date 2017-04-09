var express = require('express');
var todoController=require('./controllers/todoController');
var app = express();

//set up template engine
app.set('view engine', 'hbs');

//static files
app.use(express.static('./public'));
app.listen(3000);

//fire controllers
todoController(app);
console.log("You are listening to port: 3000");