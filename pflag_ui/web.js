var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
var client = require('twilio')('SKb4e44aff7b2dbdd3b365540ff6e6de07', 'y3cm6mRo08WYelAYZXCU8Dn3DPA8Jzxg');

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
  var password = req.body.password; //TODO: Encryption

  res.end("sent");

});

app.post('/register', function (req, res) {
	var username = req.body.username;
	var password = req.body.password; //TODO: Salt and store it encrypted
	var firstName = req.body.firstName;
	var isMentor = req.body.isMentor;
	var isOnline = true;

	var collection = db.get('usertable');

	collection.insert({
		"username": username,
		"password": password,
		"firstName": firstName,
		"isMentor": isMentor,
		"isOnline": isOnline
	}, function (err, next) {
		if (err) {
			res.send("Error creating account");
		} else {
			res.send("Account created successfully");
		}
	});
});

app.post('/call',function(req,res) {
	
	client.makeCall({

		to:'+14166185534', // Any number Twilio can call
		from: '+16475034795', // A number you bought from Twilio and can use for outbound communication
		url: '/call/app1' // A URL that produces an XML document (TwiML) which contains instructions for the call

	}, function(err, responseData) {

		//executed when the call has been initiated.
		console.log(responseData.from); // outputs "+14506667788"

	});
});

app.get('/call/app1',function(req,res){
	res.set('Content-Type', 'text/xml');
	res.send(xml('<Response><Message>Hello from Pato!</Message></Response>'));
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
