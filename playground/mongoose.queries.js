const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '9c559aa100fed7c4ad4894c';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid! ***');
}

/*
// Find all by *
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

// Find one
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

*/ 

// Find by ID
Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
}).catch((e) => {
    console.log(e);
});
