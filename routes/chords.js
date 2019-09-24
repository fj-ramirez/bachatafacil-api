var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bachatafacil', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var ChordsSchema = new mongoose.Schema({
        content: String,
        artist: String,
        title: String,
        genre: String
});

var Chords = mongoose.model('Chords', ChordsSchema);

router.get('/', function(req, res) {
    Chords.find(req.body, (err, tab) => {
        res.send(tab);
    })
});

router.post('/', function(req, res){
    if(req._body){
        var chords = new Chords(req.body);
        chords.save()
        .then(() => res.send())
        .catch(()=> console.error("Error saving"));
    }
    else res.send();
    
})

module.exports = router;
