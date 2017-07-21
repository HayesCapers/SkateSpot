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
var bcrypt = require('bcrypt-nodejs');

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
router.post('/login',(req,res)=>{
	const query = 'SELECT * FROM __users WHERE userName = ?';
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
							console.log(upRES)
							res.json({
								msg: 'Success',
								userName: userName,
								token: token
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
router.get('/register', (req,res)=>{
	const userCheck = 'SELECT * FROM __users WHERE userName = ? OR email = ?';
	const registration = 'INSERT INTO __users (userName, email, password, phoneNumber, token, tokenEXP) VALUES (?,?,?,?,?, DATE_ADD(NOW(), INTERVAL 1 WEEK)'
	var reg = req.body;
	var hash = bcrypt.hashSync(reg.password);
	var token = randToken.uid(40);
	connection.query(userCheck,[reg.userName,reg.email], (checkERR, checkRES)=>{
		if(checkERR){
			res.json({
				msg: checkERR
			})
		}else{
			if(checkRES.length > 0){
				if(checkRES[0].email === reg.email){
					res.json({
						msg: 'emailTaken'
					})
				}else if(checkRES[0].userName === reg.userName){
					res.json({
						msg: 'nameTaken'
					})
				}
			}else{
				connection.query(registration,[reg.userName,reg.email,hash,reg.phoneNumber,token],(regERR,regRES)=>{
					if(regERR){
						res.json({
							msg: regERR
						})
					}else{
						res.json({
							msg: 'regSuccess',
							userName: reg.userName,
							token: token
						})
					}
				})
			}
		}	
	})
});



module.exports = router;
