
var LocalStrategy 	 = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User			 = require('../app/models/user');
var config           = require('../config')
var Token            = require('../app/models/token');
var uuid             = require('uuid/v4');
var Email            = require('../app/email/server');
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
						user.save(function(err, usermodel){
							if(err){
								//duplicate entry
								return done(err);
							} else {
                                                            var token = new Token({ is_used: true,
                                                                                    is_valid: true,
                                                                                    user: usermodel._id,
                                                                                    token: uuid()});
                                                                token.save();
                                                                Email(user.username);          
                                                                done(null, user)
							}


							});
					  }
				});
			})
		})

	);

	passport.use('local-login', new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done){

			process.nextTick(function(){

				User.findOne({username: req.body.username}, function(err, user){
					if (err){
						console.log("User find error: ", err)
						return done(err);
					}

					if (user){
						var validPassword = user.comparePassword(req.body.password);
						if (!validPassword){
							return done(null, false, {message: "Password did not match"});
						} else {
							return done(null, user);
						}
					}
				})
			})
		}
	))

	passport.use('facebook', new FacebookStrategy({
		clientID: config.facebook.appId,
		clientSecret: config.facebook.appSecret,
		callbackURL: "http://" + (config.url || "localhost")+ ":" + (process.env.PORT || 8080) + "/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link']
	  }, function(accessToken, refreshToken, profile, done){
		User.findOne({'facebook.id': profile.id}, function(err, user){
			if (err){
				return done(err)
			} else {
				
				// no user, create it
				if(!user){
					var user = new User({
						name: profile.displayName,
						email: (profile.emails ? profile.emails[0] : {}).value || profile.name.givenName + profile.id,
						username: profile.username || profile.id,
						facebook: profile._json,
						date_registered: Date.now(),
						last_logged: Date.now(),
						allergic_to_milk: false,
						allergic_to_eggs: false,
						allergic_to_fish: false,
						allergic_to_shellfish: false,
						allergic_to_tree_nuts: false, 
						allergic_to_peanuts: false, 
						allergic_to_wheat: false,
						allergic_to_soybeans: false, 
						allergic_to_gluten: false
					})

					user.save(function(err, user){
						if (err){
							console.error(err)
						} else {
							return done(null, user)
						}
					})
				} else {
					// Found user, return 
					return done(null, user)
				}

			}
		})
	  }
	))
};
