/**
 * Created by Pkp on 10/14/2015.
 */
var express = require('express');
var router = express.Router();
var db = require('./database');

var bodyParser = require('body-parser');
var cors = require('cors'); //required for cross origin request



router.use(cors());
router.use(function(req, res, next) {

    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get("/details/:user_id", function(req, res) {


    var userId = req.params.user_id;
    var sql1 = "SELECT * FROM MOBILE_USERS WHERE ID = ?";


    db.getData(sql1,[userId], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        if(results.length >0) {

            res.json(results[0]);
        }else{
            res.json(0);
        }

    });



});

router.post("/status", function(req, res) {


    var status = req.body;

    db.insert("news_feed", status, function (err, results) {
        if (err) {
            res.status(500).send(results);
            return;
        }
        // Respond with results as JSON
        res.json(results);

    });
});

router.get("/status/:user_id", function(req, res) {



    var sql1 = "select n.message,n.id, u.id as pid,n.record_time, u.firstname, u.lastname from news_feed n, mobile_users u  where n.uid in (select fid from friend_list where uid = ? and status like '%Y%') and u.id=n.uid order by n.id desc";
    var id = req.params.user_id;
    db.getData(sql1,[id], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        if(results.length >0) {

            res.json(results);
        }else{
            res.json("Null");
        }

    });



});


module.exports = router;
