// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect server', err);
    }

    console.log('Connected to MongoDB server');

/*
    db.collection('Todos').insertOne({text: 'helloooo'}, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });
*/
/*
    db.collection('User').insertOne({
        name: 'milja',
        age: 26,
        location: 'Helsinki'
    }, (err, result) => {
        if (err) {
            return console.log('Error: ', err);
        }
        
        console.log(result.ops[0]._id.getTimestamp());
    });
*/

    // Close the connection
    db.close();
});
