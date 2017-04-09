var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test@ds157380.mlab.com:57380/todo')

//create a schema(how the objects would look like- blueprint)
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function (app) {
    app.get('/', function (req, res) {
        //get data from MongoDB and pass it to the view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/', urlencodedParser, function (req, res) {
        //get data from the view and add it to MongoDB
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/:item', function (req, res) {
        //delete the requested item from mongoDb
        Todo.findOne({ item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
            if (err) throw err;
            console.log(data);
            res.json(data);
        });
    });
};