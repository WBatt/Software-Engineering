//BASE SETUP
//==================

//CALL THE PACKAGES--------------
var express	= require('express');//call express
var app		= express();//define our app using express
var bodyParser = require('body-parser');// get body-parser
var fs = require('fs');
var path = require('path');
var morgan	= require('morgan');// used to see requests
var mongoose	= require('mongoose');// for worki  ng w/ our database
mongoose.Promise = require('bluebird');
var port	= process.env.PORT || 80;//set the port for our app
const MONGO_URL = process.env.MONGO_URL || 'mongodb://shane:shane@ds157509.mlab.com:57509/shane';

// APP CONFIGURATION -------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

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

//basic route for the home page
app.get('/',function(req,res){
	res.send('Welcome to the home page!');
});

//get an instance of the express router
var apiRouter = express.Router();

//middleware to use for all requests
apiRouter.use(function(req,res,next){
	//do logging
	console.log('Somebody just came to our app!');
	next();
});

//test route to make sure everything is working
// accessed at GET http://localhost:80/api
apiRouter.get('/',function(req,res){
res.json({message: 'hooray! Welcome to our ap!'});
});
//--------------------------------------
//more routes for our API will happen here


//on routes that end in /users
//---------------------------------
apiRouter.route('/users')

//create a user(accessed at POST http://localhost:80/api/user)
.post(function(req,res){

	//create a new instance of the User model
	var user = new User();

	//set the users information(comes from the request)
	user.name = req.body.name;
	user.username = req.body.username;
	user.password = req.body.password;
	user.token = (Math.random()*1e128).toString(36)
	user.token_expiration = Date.now() + (36000 * 60 * 24 * 60) // 2 months for now

	//save the user and check for errors
	user.save(function(err){
		if(err){
			//duplicate entry
			if(err.code == 11000)
				return res.json({success:false, message: 'A user with that username already exists.'});

				else
					return res.send(err);
				}


				res.json({success: true, message: 'User created!'});
			});
})


//get all the users(accessed at GET http://localhost:8080/api/users)
.get(function(req, res){

		User.find(function(err, users){
			if(err) res.send(err);
			//return the users
			res.json(users);
		});
});



apiRouter.post('/login', function(req, res){

	var query = User.findOne({username: req.body.username});
	query.select("username password token");
	var promise = query.exec();

	promise.then(function(user){
		if(!user){
			res.json({
				success: false,
				message: "Authentication failed. No user found."
			});
		} else if (user) {
//			user.save();
			// check password
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({
					success: false,
					message: 'Authentication failed. Wrong Password'
				});
			} else {
				var local_token = user.token || "In_Development"
				res.json({
					success: true,
					message: 'Successsssss',
					token: local_token
				});
			}
		}


	})
	.catch(function(err){
		res.json({
			"success": false,
			"message": err
		});
	});
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
app.use('/api',apiRouter);

//START THE SERVER
//==========================================
app.listen(port);

//connect to our database (hosted on modulus.io)
mongoose.connect(MONGO_URL);

var User = require('./app/models/user');
