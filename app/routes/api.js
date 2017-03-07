

module.exports = function(app, express){
	
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

	return apiRouter;
};					

