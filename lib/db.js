
var mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    port:'3306',
	user:'pibd_user',
	password:'parola1',
	database:'proiect_PIBD'
});

con.connect(function(e){
	if(!!e) {
		console.log(e);
	} else {
		console.log('Connected successfully!');
	}
});

module.exports = con;