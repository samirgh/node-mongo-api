// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect server', err);
    }

    console.log('Connected to MongoDB server');

    /*
    db.collection('Todos').find({
        _id: new ObjectID()
     }.toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })(regex); 
    */

   /*
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch nodes');
    });*/

    db.collection('User').find({name: 'Milja'}).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch', err); 
    });

    // Close the connection
    db.close();
});
