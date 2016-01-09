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

    var uid = req.query.uid;
    var query = "select * from mobile_users where id not in (SELECT fid FROM `friend_list` where uid =?)"
    db.getData(query,[uid], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        if(results.length >0) {
            res.json(results);
        }else{
            res.json(0);
        }

    });

});

router.post("/action", function(req, res) {


    var data = req.body;
    data.status = "S";
    console.log(data);
    db.insert("friend_list", data, function (err, results) {
        if (err) {
            res.status(500).send(results);
            return;
        }
        // Respond with results as JSON
        res.json(results);
        db.insert("friend_list",[{"uid":data.fid,"fid":data.uid,"status":"P"}],function(){
            console.log("Inserted into Friend List with Pending request");
        });


    });
});

router.get('/action/:id', function(req, res) {

    var uid = req.params.id;
    var query = "select * from mobile_users where id in(SELECT fid FROM `friend_list` where uid =? and status not like '%S%' and uid <> fid)";
    db.getData(query,[uid], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        if(results.length >0) {
            res.json(results);
        }else{
            res.json(0);
        }

    });

});

router.get('/request/:id', function(req, res) {

    var uid = req.params.id;
    var query = "select * from mobile_users where id in(SELECT fid FROM `friend_list` where uid =? and status  like '%P%' )";
    db.getData(query,[uid], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        if(results.length >0) {
            res.json(results);

        }else{
            res.json(0);
        }

    });

});

router.post("/accept", function(req, res) {


    var data = req.body;

    console.log(data);
    var arr = [data.uid, data.fid];
    var query =" UPDATE FRIEND_LIST SET STATUS ='Y' WHERE UID = ? AND FID = ?";
    db.getData(query, arr, function (err, results) {
        if (err) {
            res.status(500).send(results);
            return;
        }
        // Respond with results as JSON
        res.json(results);
        db.getData(query,arr.reverse(),function(){
            console.log("Friends");
        });


        });


    });


router.post("/reject", function(req, res) {


    var data = req.body;

    console.log(data);
    var arr = [data.uid, data.fid];
    var query =" DELETE FROM FRIEND_LIST  WHERE UID = ? AND FID = ?";
    db.getData(query, arr, function (err, results) {
        if (err) {
            res.status(500).send(results);
            return;
        }
        // Respond with results as JSON
        res.json(results);
        db.getData(query,arr.reverse(),function(){
            console.log("Friends");
        });

    });


});


module.exports = router;