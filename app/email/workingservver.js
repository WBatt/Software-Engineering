var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'hackysnackteam@gmail.com',
    pass: 'HackySnack1'
  }
});


var mailOptions = {
  from: 'HackySnack Team <hackysnackteam@gmail.com>', 
  to: 'hackysnackteam@gmail.com',
  subject: 'Test Successful', 
  text: 'Hello World!', 
 

}

transporter.sendMail(mailOptions, function (error, response) {
  if (error) {
    console.log(error);
  } else{
    console.log('Message sent!');
  }
});
