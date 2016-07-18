var express = require("express");
var app = express();


app.set('env', 'production');
app.set('views', __dirname);
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});


app.get("/whoami", function(req, res) {
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    var language = req.headers['accept-language'].split(",")[0];
    var software = req.headers['user-agent'].split(")")[0].split("(")[1];
    var toSend = {
        ipaddress : ip,
        language: language,
        software: software
    };
    

    res.json(toSend);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App is listening');
});