'use strict';
var socketIO = require('socket.io');
var io = null; 

exports.io = function () {
  return io;
};

exports.init = function(server) {
  io = socketIO(server); 
  var nickname = [];
  io.on('connection', function(socket) {
  	console.log("User Connected with Socket.IO",socket.id)
    socket.on('nickname', function(data, callback){
      console.log(data);  
      // var matched = nickname.some((o)=>{   
      //   return o.name == data;
      //   });

      //   if(matched){
      //     callback(false)
      //   }else{
          callback(true);
          socket.nickname = data;
          nickname.push({name:socket.nickname, id:socket.id, socket:socket});
          //updateOnlineUsers();
      // }
    }); 
    // socket.on('getOnlineUsers', function(data,callback){
    //   console.log(nickname);
    //   debugger;
    //    return callback(nickname);
    // })
    
    function updateOnlineUsers(){
      io.sockets.emit('username', nickname)
    }
 
	   socket.on('send message', function(data){
        data.user = {name:socket.nickname, id:socket.id};
        io.sockets.emit('new message', data);
     });

    //  socket.on('disconnect', function(data){
    //   if(!socket.nickname) return;
    //   nickname.splice(nickname.indexOf(socket.nickname), 1);
    //   updateOnlineUsers();
    //  });

     socket.on('isTyping', function(d){ 
      socket.broadcast.emit('ss', d);
     })
   
  });
};