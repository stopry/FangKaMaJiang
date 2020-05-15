var crypto = require('../utils/crypto');
var express = require('express');
var db = require('../utils/db');
var http = require("../utils/http");

var app = express();

function send(res,ret){
	var str = JSON.stringify(ret);
	res.send(str)
}


exports.start = function(config){
	app.listen(config.DEALDER_API_PORT,config.DEALDER_API_IP);
	console.log("dealer api is listening on " + config.DEALDER_API_IP + ":" + config.DEALDER_API_PORT);
};

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/get_user_info',function(req,res){
	var userid = req.query.userid;
	db.get_user_data_by_userid(userid,function (data) {
		if(data){
			var ret = {
				userid:userid,
				name:data.name,
				gems:data.gems,
				headimg:data.headimg
			}
			http.send(res,0,"ok",ret);
		}
		else{
			http.send(res,1,"null");
		}
	});
});

app.get('/add_user_gems',function(req,res){
	var userid = req.query.userid;
	var gems = req.query.gems;
	db.add_user_gems(userid,gems,function(suc){
		if(suc){
			http.send(res,0,"ok");
		}
		else{
			http.send(res,1,"failed");
		}
	});
});