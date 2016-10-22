var gzippo = require('gzippo');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.post('/signUp', function (req, res) {
  console.log(req);
  
  var username = req.body.username;
  var password = req.body.password;

  res.end("sent");

});
app.listen(process.env.PORT || 5000);
