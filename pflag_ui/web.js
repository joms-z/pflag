var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = module.exports.app = express();
var server = http.createServer(app)
var io = require('socket.io').listen(server);
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
var client = require('twilio')('ACff6b309d15810713b71ff296e6bf3b4b', '19fd6d6aa85e8f9f12525c1c5379f52e');

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(express.static(__dirname + "/dist"));

app.use(cors());

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password; //TODO: Encryption
  //TODO: Retrieve data and validate
  var collection = db.get('usertable');
  //TODO: Enforce constraint of only one user with one username
  collection.findOne({"username": username, "password": password}, function(err, userdetails) {
  	if(err) {
	  res.end("Login failed!");
  	} else {
      res.json({ isMentor: userdetails["isMentor"] });
  	}
	});
});

app.post('/register', function (req, res) {
	var username = req.body.username;
	var password = req.body.password; //TODO: Salt and store it encrypted
	var isMentor = req.body.isMentor;
	var isOnline = true;

	var collection = db.get('usertable');

	collection.insert({
		"username": username,
		"password": password,
		"isMentor": isMentor,
		"isOnline": isOnline,
		"bio": "",
		"isParent": false,
		"isLgbtq": false,
		"isYouth": false
	}, function (err, next) {
		if (err) {
			res.end("Error creating account");
		} else {
			res.end("Account created successfully");
		}
	});
});

app.post('/request-mentor', function (req, res) {
	var username = req.body.username;
	//TODO: Retrieve data and validate
	var collection = db.get('usertable');

	collection.findOneAndUpdate({ "username": username }, { "isMentor": true }, function(err, next) {
		if(err) {
			res.json("Failed to become a mentor.");
		} else {
			res.json("successfully became a mentor");
		}
	});
});

app.post('/save-profile', function (req, res) {
	// var username = req.body.username;
	// var password = req.body.password; //TODO: Salt and store it encrypted
	// var firstName = req.body.firstName;
	// var isMentor = req.body.isMentor;
	// var isOnline = true;

	// var collection = db.get('usertable');

	// collection.insert({
	// 	"username": username,
	// 	"password": password,
	// 	"firstName": firstName,
	// 	"isMentor": isMentor,
	// 	"isOnline": isOnline
	// }, function (err, next) {
	// 	if (err) {
	// 		res.send("Error creating account");
	// 	} else {
	// 		res.send("Account created successfully");
	// 	}
	// });
});

app.post('/call',function(req,res) {
	var call = {
		fourPeople: 'https://handler.twilio.com/twiml/EH1c35e24a50f16aa314612dd11ac296d4' // Arvind, Joms, Jackie, Christine
	};

	client.makeCall({

		to:'+14166185534', // Any number Twilio can call
		from: '+16475034795', // A number you bought from Twilio and can use for outbound communication
		url: call.fourPeople // A URL that produces an XML document (TwiML) which contains instructions for the call

	}, function(err, responseData) {

		if(err == null){
			console.log(err);
			res.send(err);
		}else{ //executed when the call has been initiated.
			console.log(responseData.status); // should be queued
			res.send(responseData);
		}

	});
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





var sessions = [];
var vcChatroom = []; // volunteer -> client chatroom
var cvChatroom = [];// volunteer -> client chatroom
var volunteerQueue = [];
var clientQueue = [];

function findVolunteer(clientID){
	printState();
	if(cvChatroom[clientID]){
		return true;
	}

	while(Object.keys(volunteerQueue).length > 0){
		var volunteerID = Object.keys(volunteerQueue)[0];
		delete volunteerQueue[volunteerID];
		var session = sessions[volunteerID];
		if(session && session.socket && session.socket.connected){
			createChatroom(volunteerID,clientID);
			delete clientQueue[clientID];

			return true;
		}else{
			deleteSession(volunteerID);
		}
	}
	return false;
}

function createChatroom(volunteerID,clientID){
	vcChatroom[volunteerID] = clientID;
	cvChatroom[clientID] = volunteerID;
}

function getRespondSocket(socketID, isVolunteer){
	var correspondingID = (isVolunteer)? vcChatroom[socketID] : cvChatroom[socketID];
	var session = sessions[correspondingID];

	if(session){
		return session.socket;
	}else{
		deleteChatroom(socketID);
		return false;
	}
}

function deleteChatroom(SID, isVolunteer){
	if(isVolunteer){
		var volunteerSID = SID;
		var clientSID = vcChatroom[volunteerSID];
		sessions[clientSID].socket.emit("closed_window",{ with: sessions[volunteerSID].name });
		respondSocket.emit("disconnected",{ message: data.message, successful: false, name: data.name });
		delete vcChatroom[volunteerSID];
		delete cvChatroom[clientSID];
		delete volunteerQueue[volunteerSID];
	}else{
		var clientSID = SID;
		var volunteerSID = cvChatroom[clientSID];
		sessions[volunteerSID].socket.emit("disconnected",{ with: sessions[clientSID].name });
		if(volunteerSID){
			volunteerQueue[volunteerSID] = volunteerSID;
		}
		delete vcChatroom[volunteerSID];
		delete cvChatroom[clientSID];
		delete clientQueue[clientID];
	}
}

function deleteSession(SID){
	var session = sessions[SID];
	try{
		deleteChatroom(SID, session.isVolunteer);
	}catch(e){}
	delete sessions[SID];
	printState();
}

function printState(){
	console.log("****");
	console.log("Sessions:", Object.keys(sessions));
	console.log("Volunteers queue:", volunteerQueue);
	console.log("Clients queue:", clientQueue);
	console.log("Hashtable volunteers:", vcChatroom);
	console.log("Hashtable clients:",cvChatroom);
	console.log("**");
}

io.sockets.on('connection', function(socket) {
	var isVolunteer = socket.handshake.query.v;
	var name = socket.handshake.query.name;
	if(isVolunteer == '1'){
		sessions[socket.id] = {
			socket: socket,
			isVolunteer: true,// 1 = volunteer, 0: client
			name: name
		};
		volunteerQueue[socket.id] = socket.id;
	}else{
		sessions[socket.id] = {
			socket: socket,
			isVolunteer: false,// 1 = volunteer, 0: client
			name: name
		};
		clientQueue[socket.id] = socket.id;
	}

	printState();

	socket.on('disconnect', function () {
		console.log(socket.id + " disconnected");
		deleteSession(socket.id);
	});

    socket.on('message', function(data) {
		var session = sessions[socket.id];
		try{
			var respondSocket = getRespondSocket(socket.id,session.isVolunteer);
        	respondSocket.emit("message_received",{ message: data.message, successful: false, name: data.name });
		}catch(e){}
    });

	socket.on('isMatch', function(data){
		var matched = findVolunteer(socket.id);
		if(matched){
			var volunteerSID = cvChatroom[socket.id];
			socket.emit("new_chat",{ with: sessions[volunteerSID].name });
			sessions[volunteerSID].socket.emit("new_chat",{ with: data.name });
		}
		socket.emit('isMatch', { isMatch: matched });
		printState();
	});
});

server.listen(process.env.PORT || 5000);

