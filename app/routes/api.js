var User = require('../models/user')
var Item = require('../models/item')

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

		// delete the user with this id accessed at	DELETE http://localhost:8080/api/user/:user_id)
		.delete(function(req,res) {
			User.remove({
				_id: req.params.user_id

			}, function(err,user){
				if(err)
					res.json({"err": err});

				res.json({message: 'Successfully deleted'});
			});
		});


//This is for the item route
//route to items
apiRouter.route('/items')
//create an item accessed at POST http://localhost:8080/api/item
/*
.post(function(req,res){
//create an instance of an item model
var item = new Item();
//set the items name, description, and expiration date
item.name = req.body.name;
item.description = req.body.description;
item.exp_date = req.body.exp_date;

//save the item and check for errors
item.save(function(err){
	if(err)
		return res.json({"err":err });
  else
		res.json({success:true, message: "Item created!"});
});
})
*/
//get all items
.get(function(req,res){
	Item.find(function(err, items){
		if(err)
			return res.json({"err": err});
		else
			res.json(items);
	});
});

//route to get an item name
apiRouter.route('/items/:name')
//get the item by name
		//accessed at GET http://localhost:8080/api/items/:name)
.get(function(req,res){
	Item.find({ "item.name":req.params.name  }, function(err,user){
		if(err)
				res.json({"err": err});
		//return the item
			res.json(item);
	});
});

apiRouter.route('/items/:item_id')
.delete(function(req,res){
	Item.remove({
		_id: req.params.item_id
	}, function(err,item){
		if(err)
			res.json({"err":err});

			res.json({message: 'Successfully deleted'});
	});
});

	return apiRouter;
};
