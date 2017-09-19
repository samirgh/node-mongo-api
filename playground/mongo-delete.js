const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect server', err);
    }

    console.log('Connected to MongoDB server');

    /*
     * Delete many
     *
    db.collection('User').deleteMany({name: 'Sami'}).then((result) => {
        console.log(result);
    });
    */

    /*
     * Delete one
     *
    db.collection('User').deleteOne({name: 'Milja'}).then((result) => {
        console.log(result);
    });
    */

    /*
     * Find one and delete
     */

    db.collection('Todos').findOneAndDelete({completed: false}).then((doc) => {
        console.log(doc);
    });


    db.close();
});
