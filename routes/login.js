var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Users = require('../models/users'); 
var bcrypt = require('bcrypt');

router.get('/', function(req, res){
    
    let searchParam = new RegExp(req.body.username, 'i');
    Users.findOne({username: searchParam }, (err, data) => {
        if(err) console.error(err);
        if(data) {
            bcrypt.compare(req.body.password,data.password, function(err, isValid){
            
                if(isValid){
                    let { password, ...body} = data;
                    res.send(jwt.sign(body,"MyKey"));
                }
                else res.status(401).send();
            })
        }
        else { 
            res.send("User does not exist.")
        }
    });
});

router.post('/', function (req, res) {
    return res.status(403).send("NOT ALLOWED");
    let { password, ...body } = req.body;
    
    bcrypt.hash(password, 1, function(err, hash){
        console.error(err);
        const user = new Users({ ...body, password: hash});
        user.save().then(x => res.send(x));
    });
});
module.exports = router;