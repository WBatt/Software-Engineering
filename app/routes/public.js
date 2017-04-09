var path = require("path")
module.exports = function(app, express){

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


};
