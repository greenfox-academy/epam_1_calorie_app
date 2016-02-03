'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.js');
var item = require('./items.js');
var path = require('path');

var port = process.env.PORT || config.defaultPort;
var app = express();

var route = path.join(__dirname, '..', 'public');
app.use(express.static(route));
app.use(bodyParser.json());

app.listen(port, function() {
	console.log('Listening on port ' + port + '...');
});

app.get('/meals', getAll);
app.post('/meals', addItem);
app.delete('/meals/:id', deleteItem);

function getAll(request, response) {
	item.getAll(function (err, result) {
    handleResponse(err, result, response);
	});
}

function addItem(request, response) {
	item.addItem(request.body, function(err, result) {
		handleResponse(err, result, response);
	});
}

function deleteItem(request, response) {
	item.deleteItem(request.params.id, function(err, result) {
		handleResponse(err, result, response);
	});
}

function handleResponse(err, result, response) {
	if (err) {
		console.error(err);
		response.send('Error ' + err);
	}	else {
		response.json(result.rows);
	}
}
