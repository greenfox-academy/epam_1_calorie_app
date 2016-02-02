"use strict";


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


app.use(express.static('../public'));

app.listen(port, function() {
	console.log('Listening on port 3000...')
});

/*app.get('/', function(req, res) {
	res.send('Hello world');
});*/