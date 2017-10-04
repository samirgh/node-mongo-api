const {mongoose}    = require('./db/mongoose.js');
const {Todo}        = require('./models/todo.js');
const {User}        = require('./models/user.js');

const express       = require('express');
const bodyParser    = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        if (err) {
            res.status(400).send(err);
        }
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});          

app.listen(3000, () => {
    console.log('Started app at localhost:3000');
});

module.exports = { app };
