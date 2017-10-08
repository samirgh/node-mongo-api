const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Remove All
/*
Todo.remove({}).then((result) => {
    console.log(result);
});
*/

// Find and remove one
/*
Todo.findOneAndRemove({}).then((result) => {

});
*/

// Find by Id and remove
Todo.findByIdAndRemove('59da40160c3072c78e7bec67').then((doc) => {
    console.log(doc);
});

