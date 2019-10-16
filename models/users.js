var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bachatafacil', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var UsersSchema = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Users', UsersSchema);