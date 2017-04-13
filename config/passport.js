
var LocalStrategy 	= require('passport-local').Strategy;
var User			= require('../app/models/user');

module.exports = function(passport){
		// ======================
	  // passport session setup
	  // ======================
	  // required for persistent login sessions
	  // passport needs ability to serialize and unserialize users out of session

	  // used to serialize the user for the session
	  passport.serializeUser(function (user, done) {
	    done(null, user.id);
	  });

	  passport.deserializeUser(function (id, done) {
	    User.findById(id, function (err, user) {
	      done(err, user);
	    });
	  });

	passport.use('local-signup', new LocalStrategy(
		{
			passReqToCallback: true
		},
		function(req, username, password, done){

			process.nextTick(function(){

				User.findOne({username: req.body.username}, function(err, user){
					if (err)
						return done(err);

					if (user)
						return done(null, false, { message: 'That username is already taken' });

					else {
						var user 		          = new User();
						user.name             = req.body.name;
						user.username         = req.body.username;
						user.password         = req.body.password;
						user.token            = (Math.random()*1e128).toString(36)
						user.token_expiration = Date.now() + (36000 * 60 * 24 * 60) // 2 months for now
						user.date_registered  = Date.now();
						//initialize all user allergies to false
						user.allergic_to_milk = false;
						user.allergic_to_eggs = false;
						user.allergic_to_fish = false;
						user.allergic_to_shellfish = false;
						user.allergic_to_tree_nuts = false;
						user.allergic_to_peanuts = false;
						user.allergic_to_wheat = false;
						user.allergic_to_soybeans = false;
						user.allergic_to_gluten = false

						//save the user and check for errors
						user.save(function(err){
							if(err){
								//duplicate entry
								return done(err);
							} else {
								done(null, user)
							}


							});
					  }
				});
			})
		})

	);
};
