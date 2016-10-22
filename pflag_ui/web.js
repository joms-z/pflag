var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist"));

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  res.end("sent");

});

app.listen(process.env.PORT || 5000);
