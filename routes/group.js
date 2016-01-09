/**
 * Created by Pkp on 10/17/2015.
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


router.post("/action", function(req, res) {


    var group = req.body;

    db.insert("groups", group, function (err, results) {
        if (err) {
            res.status(500).send(results);
            return;
        }
        // Respond with results as JSON
        db.insert("group_users",[{"gid": results.insertId,"uid" :req.body.ownerid, "isadmin": "Y"}],function(){
            console.log("Inserted into group_users table.");
        });
        res.json(results);

    });
});

router.get("/action/:userid", function(req, res) {


    var userId = req.params.userid;

    var sql1 = "SELECT g.id, g.gname, g.about, u.firstname FROM `groups`g, mobile_users u where g.id in(SELECT gid FROM `group_users` u where u.uid= ?) and u.id = g.ownerid";


    db.getData(sql1,[userId], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        if(results.length >0) {

            res.json(results);
        }else{
            res.json(0);
        }

    });



});

router.get("/page/:gid", function(req, res) {


    var groupId = req.params.gid;

    var sql1 = "DELETE FROM GROUPS WHERE ID =?";


    db.getData(sql1,[groupId], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON

            res.json(results);


    });



});

router.get("/check/", function(req, res) {


    var groupId = req.query.gid;
    var userId = req.query.uid;
    console.log(groupId+" "+userId);
    var sql1 = "SELECT COUNT(*) as count FROM GROUPS WHERE id = ? and ownerid = ?";


    db.getData(sql1,[groupId,userId], function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON

        res.json(results);


    });



});

router.get("/details/:gid", function(req, res){

    var gid = req.params.gid;
    var sql = "SELECT g.id,g.gname,g.about, u.firstname FROM `groups` g, mobile_users u where g.id = ? and g.ownerid = u.id";
    db.getData(sql,[gid],function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON

        res.json(results[0]);


    });


});

router.post("/status", function(req, res) {


    var status = req.body;

    db.insert("group_post", status, function (err, results) {
        if (err) {
            res.status(500).send(results);
            return;
        }
        // Respond with results as JSON
        res.json(results);

    });
});

router.get("/status/:gid", function(req, res) {



    var sql1 = "SELECT g.message, g.date, u.firstname, u.lastname FROM `group_post` g, mobile_users u where g.gid = ? and g.uid = u.id order by date desc";
    var id = req.params.gid;
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

router.get("/member/:gid", function(req, res) {

    var sql1 = "SELECT g.gname,g.id,  u.uid, m.firstname,m.lastname FROM `group_users` u, groups g, mobile_users m where u.gid = ? and g.id = u.gid and m.id = u.uid";
    var id = req.params.gid;
    db.getData(sql1, [id], function (err, results) {
        if (err) {
            res.status(500).send("Server Error");
            return;
        }
        // Respond with results as JSON
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json("Null");
        }

    });

});

router.get("/member/", function(req, res) {

    var sql1 = "DELETE FROM group_users WHERE UID = ? AND GID = ?";
    var gid = req.query.gid;
    var uid = req.query.uid;
    db.getData(sql1, [uid,gid], function (err, results) {
        if (err) {
            res.status(500).send("Server Error");
            return;
        }
        // Respond with results as JSON
        res.json(results);

    });

});

router.post("/member", function(req, res) {


    var group = req.body;

    db.insert("group_users", group, function (err, results) {
        if (err) {
            res.status(500).send(results);
            return;
        }
        // Respond with results as JSON

        res.json(results);

    });
});

router.get("/getmember/:gid", function(req, res) {

    var sql1 = "SELECT * FROM mobile_users where id not in (select uid from group_users where gid =?)";
    var gid = req.params.gid;

    db.getData(sql1, [gid], function (err, results) {
        if (err) {
            res.status(500).send("Server Error");
            return;
        }
        // Respond with results as JSON
        res.json(results);

    });

});
    module.exports = router;
