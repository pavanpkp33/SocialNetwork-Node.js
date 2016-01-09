/**
 * Created by Pkp on 10/9/2015.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'pavap',
    database: 'social_network',
    connectionLimit: 100,
    supportBigNumbers: true
});

exports.authenticate = function(email,password, callback) {
    var sql = "SELECT id,firstname,lastname FROM mobile_users where email =? and password =? ";
    // get a connection from the pool
    var arr =[email,password];
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, arr, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};



exports.register = function(arr, callback){
    var sql = "INSERT into mobile_users SET ?";

    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};

exports.insert = function(tableName,arr, callback){
    var sql = "INSERT into "+tableName+" SET ?";
    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};

exports.update = function(tableName,arr,whereParam, callback){
    var sql = "UPDATE  "+tableName+" SET ? WHERE id="+whereParam;
    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};

exports.getData = function(query,arr, callback){
    var sql = query;
    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};