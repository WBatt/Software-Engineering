//BASE SETUP
//==================

//CALL THE PACKAGES--------------
var express			= require('express');		//call express
var app				= express();				//define our app using express
var bodyParser 		= require('body-parser');	// get body-parser
var fs 				= require('fs');
var path 			= require('path');
var morgan			= require('morgan');		// used to see requests
var mongoose		= require('mongoose');		// for worki  ng w/ our database
mongoose.Promise 	= require('bluebird');

var config 			= require('./config');
var port			= config.port;				//set the port for our app

// APP CONFIGURATION -------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//configure our app to handle CORS requests
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods','GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type, \ Authorization');
	next();
});

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));

//ROUTES FOR OUR API
//============================

//get an instance of the express router
var apiRoutes = require('./app/routes/api')(app, express);

// Main catchall route
app.get("*", function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//REGISTER OUR ROUTES -------------------
//all of our routes will be prefixed with /api
app.use('/api',apiRoutes);

//START THE SERVER
//==========================================
app.listen(port);
console.log("app is on localhost:" + port)
//connect to our database (hosted on modulus.io)
mongoose.connect(config.database);

