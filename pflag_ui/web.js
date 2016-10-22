var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(express.static(__dirname + "/dist"));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  res.end("sent");

});

app.post('/sendChat', function (req, res) {

	//Setting up the DB variable
	var db = req.db;

	//Getting the variables
	var messageFrom = req.body.messageFrom;
	var messageTo = req.body.messageTo;
	var messageSentTime = req.body.messageSentTime;
	var message = req.body.message;
	var shouldDelete = req.body.shouldDelete;

	var collection = db.get('chatmessages');

	//Submit to the DB
	collection.insert({
		"messageFrom": messageFrom,
		"messageTo": messageTo,
		"messageSentTime": messageSentTime,
		"message": message,
		"shouldDelete": shouldDelete
	}, function (err, next) {
		if (err) {
			res.send("Error storing to the database");
		} else {
			res.send("Added successfully");
		}
	});

	//TODO: Check if the messageTo person is online and then respond accordingly
});

app.get('/loadChats', function (req, res) {
	var db = req.db;
	var collection = db.get('chatmessages');
	collection.find({}, {}, function (e, messages) {
		var filteredMessages = [];
		for (var i = 0; i < messages.size; i++) {
			if (messages[i].messageFrom == req.body.currentUser || messages[i].messageTo == req.body.currentUser) {
				filteredMessages.push(messages[i]);
			}
		}
		res.render('chatmessages', {
			"chatmessages": filteredMessages
		});
	});
});

app.listen(process.env.PORT || 5000);
