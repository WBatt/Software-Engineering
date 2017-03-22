
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
		function(req, username, password, done){
			
			process.nextTick(function(){

				User.findOne({username: username}, function(err, user){
					if (err)
						return done(err);

					if (user)
						return done(null, false, { message: 'That username is already taken' });

					else {
						var newUser 		= new User();
						newUser.username 	= username;
						newUser.password	= password

						newUser.save(function(err, user){
							if (err) 
								throw err;

							return done(null, newUser);
						})
					}
				});
			})
		})

	);
};
