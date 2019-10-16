var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bachatafacil', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var ChordsSchema = new mongoose.Schema({
  content: String,
  artist: String,
  title: String,
  genre: String
});

module.exports = mongoose.model('Chords', ChordsSchema);