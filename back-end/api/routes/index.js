/*
just about everything i'll end up doing will be in here.
so there's that at least.
but that means i'm going to have to fix everything on the back end.
bleh. let's see how this goes.
*/

var express = require('express');
var router = express.Router();

// config module for secrets. shhhhhh. no peeking.
var config = require('../config/config');

// for the hashes
var bcrypt = require('bcrypt');

// tokens for session information
var randToken = require('rand-token');

// database since I have no idea how to use MongoDB
var mysql = require('mysql');

// connect it, yo.
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

// oooooooooooooh.
connection.connect();

// useless but i'll keep it anyway.
router.get('/', function(req, res, next) {
  res.json({
	msg: 'hayes, you monster'
  });
});

// i'm sure he'll see this eventually
router.get('/hayesyoumonster',(req,res)=>{
	const query = 'SELECT * FROM __users WHERE userName = ';
	var userName = req.body.userName;
	connection.query(query,[userName],(error,results)=>{
		if(results.length > 0){
			if(error){
				res.json({
					msg: error
				})
			}else{
				var checkHash = bcrypt.compareSync(req.body.password,results[0].password);
				if (checkHash){
					const updateToken = `UPDATE __users SET token = ?, tokenEXP = DATE_ADD(NOW(), INTERVAL 1 WEEK) WHERE userName = ?`
					var token = randToken.uid(40);
					connection.query(updateToken, [token,userName], (upERR, upRES)=>{
						if(upERR){
							res.json({
								msg: upERR
							})
						}else{
							res.json({
								msg: 'loginSuccess'
							})
						}
					})
				}else{
					res.json({
						msg: 'passInvalid'
					})
				}
			}
		}else{
			res.json({
				msg: 'youDunGoofed'
			})
		}
	})
});

// eh. we'll see.
router.get('/secrets', (req,res)=>{
	res.json({
		ham: 'ham',
		bone: 'bone',
		hambone: 'bender'
	});
});



module.exports = router;
