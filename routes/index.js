/**
 * Created by Pkp on 10/9/2015.
 */
var express = require('express');
var router = express.Router();
var db = require('./database');
var bodyParser = require('body-parser');
var cors = require('cors'); //required for cross origin request
router.use(cors()   );
router.use(function(req, res, next) {

    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.get('/action', function(req, res) {

    var email = req.query.email;
    var password = req.query.password;
    console.log(email+" "+password);
    db.authenticate(email,password, function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
            // Respond with results as JSON
        if(results.length >0) {
            res.json(results);
        }else{
            res.json(0);
        }

    });

});

router.post('/action', function(req, res) {
    var parameters = req.body;
    db.register(parameters, function(err, results) {
        if(err) { res.status(500).send(results); return;}
        // Respond with results as JSON
        res.json(results);
        db.insert("friend_list",[{"uid": results.insertId,"fid" :results.insertId}],function(){
            console.log("Inserted into friend table.");
        });


    });

});

router.post('/actionUpdate', function(req, res) {
    var parameters = req.body;
    var id = req.body.id;
    db.update("mobile_users",parameters,id, function(err, results) {
        if(err) { res.status(500).send(results); return;}
        // Respond with results as JSON
        res.json(results);


    });

});
module.exports = router;