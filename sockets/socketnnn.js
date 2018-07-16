'use strict';

var socketIO;

exports.reciever = function(io){
	socketIO = io;
	io.sockets.on('connection', function(socket){
	console.log('Use COnnected');
	socket.on('newTicket', function(data){
		io.sockets.emit('getData', data);
		console.log("Data from Soccket connection==", data);
	})
});

}