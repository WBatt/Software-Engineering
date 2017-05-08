var fs = require("fs");
var path = ('path');

module.exports=function(token, username){
var verificationEmail;
fs.readFile('app/email/verification.html', function (err, data) {
        if (err) {return console.error(err);}
        //console.log("Asynchronous read: " + data.toString());
        verificationEmail = data.toString(); 
        console.log(verificationEmail);
        
        verificationEmail = verificationEmail.replace('\$NAME', username);
        verificationEmail = verificationEmail.replace('\$LINK', token);
        console.log(verificationEmail);
});
}
