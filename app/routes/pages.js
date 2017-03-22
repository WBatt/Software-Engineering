module.exports = function(path, app, express, passport){

	//middleware to use for all requests
	app.use(function(req,res,next){
		//do logging
		console.log('Somebody just came to our app!');
		next();
	});

	//test route to make sure everything is working
	// accessed at GET http://localhost:80/api
	app.get('/',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'index.html'));
	});

	app.get('/login',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'login.html'));
	});

	app.get('/profile',function(req,res){
		res.sendFile(path.join(__dirname, '../../public/app/views', 'profile.html'));
	});

};
