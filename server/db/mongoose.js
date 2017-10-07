const mongoose = require('mongoose');

// Use mongoose promise library instead of callbacks
mongoose.Promise = global.Promise;

// Connect to Database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});

module.exports = { mongoose };
