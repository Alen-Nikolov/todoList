var express = require('express');
var todoController=require('./controllers/todoController');
var app = express();

//set up template engine
app.set('view engine', 'hbs');

//static files
app.use(express.static('./public'));
var port = process.env.PORT || 3000;
console.log("This console log runs when the server starts and it's added with GIT FLOW");
app.listen(port);

//fire controllers
todoController(app);
console.log("You are listening to port: 3000");