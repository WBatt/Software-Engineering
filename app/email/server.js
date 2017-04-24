var nodemailer = require('nodemailer');
var fs=require('fs');
module.exports = function() {
	fs.readFile('./welcome2.html', function(err, html){
		if(err) throw err;
		var transporter = nodemailer.createTransport({
  		service: "Gmail",
  		auth: {
    		user: 'hackysnackteam@gmail.com',
    		pass: 'HackySnack1'
  		}
	   });


		var mailOptions = {
  		from: 'HackySnack Team <hackysnackteam@gmail.com>', 
  		to: 'Hackysnackteam@gmail.com',
  		subject: 'Welcome', 
  	  	html: html
	    }

		transporter.sendMail(mailOptions, function (error, response) {
  		if (error) {
    			console.log(error);
  		} else{
    		console.log('Message sent!');
  		}
       	   });
	
     });
}
