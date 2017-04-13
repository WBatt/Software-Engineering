var path = require("path")
module.exports = function(app, express, passport){

	app.get('/',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'index.html'));
	});

	app.get('/login',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'login.html'));
	});

	app.get('/profile',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'profile.html'));
	});

	app.get('/dashboard',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'dashboard.html'));
	});

	app.get('/createAccount',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'createAccount.html'));
	});

	app.get('/about',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'about.html'));
	});


	// facebook route
	app.get('/auth/facebook', passport.authenticate('facebook', {failureRedirect: '/login'}))
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function(req, res){
		res.redirect('/')
	})
};
