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

apiRouter.route('/users/:user_id')
		//get the user with that id
		//(accessed at GET http://localhost:8080/api/users/:user_id)
.get(function(req, res){
			User.findById(req.params.user_id, function(err,user){
				if(err)
					res.send(err);

				//return that user
				res.json(user);
			});
		})
		//update the user with this id
		//(accessed at PUT http://localhost:8080/api/users/:user_id)
		.put(function(req, res){

			//use our model to find the user we want
			User.findById(req.params.user_id, function(err,user){
				if(err)
					res.json({"err": err});

				//update the user info only if its new
				if(req.body.name)
					user.name = req.body.name;
				if(req.body.username)
					user.username = req.body.username;
				if(req.body.password)
					user.password = req.body.password;
				//save the user
				user.token_expiration = new Date();
				user.save(function(err){
					if(err)
						res.json({"err": err});
					else
					//return a message
						res.json({message: 'User updated!'});
				});

	});
})

//delete the user with this id
//(accessed at DELETE http://localhost:8080/api/user/:user_id)
.delete(function(req,res) {
	User.remove({
		_id: req.params.user_id
	}, function(err,user){
				if(err)
					return res.json({"err": err});

				res.json({message: 'Successfully deleted'});
	});
});
//REGISTER OUR ROUTES -------------------
//all of our routes will be prefixed with /api
app.use('/api',apiRoutes);

//START THE SERVER
//==========================================
app.listen(port);

//connect to our database (hosted on modulus.io)
mongoose.connect(config.database);

var User = require('./app/models/user');
