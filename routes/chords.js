var express = require('express');
var router = express.Router();
var Chords = require('../models/chords');

// router.get('/', function (req, res) {
//   Chords.find(req.body, (err, tab) => {
//     if (err) throw err;
//     res.send(tab);
//   });
// });


router.get('/', function (req, res) {
  let query = {};
  if(req.query.search){
    var search = new RegExp(req.query.search , 'i');
    query = { $or: [{ title: search }, { artist: search }] };
  }
  Chords.find(query, (err, tab) => {
        if (err) throw err;
        res.send(tab);
  });
});

router.get('/:id', function (req, res) {
   
    Chords.findOne({ _id: req.params.id }, 
      (err, tab) => {
          if (err) throw err;
          res.send(tab);
      });
  });

router.post('/', function (req, res) {
    return res.status(403).send("NOT ALLOWED");//Workaround, until security is implemented.
    //todo: implement auth to save tabs
  if (req._body) {
    var chords = new Chords(req.body);
    chords.save()
      .then(() => res.send())
      .catch(() => console.error('Error saving'));
  } else res.send();
});

module.exports = router;