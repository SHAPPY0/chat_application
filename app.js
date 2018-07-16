const express 			= require('express');
const bodyParser 		= require('body-parser');
const logger 			= require('morgan');
const multer 			= require('multer');
const crypto			= require('crypto');
const path 				= require('path');
const errorHandler  	= require('errorhandler');
const errorFn 			= require('./modules/error');
const app 				= express();
const server 			= require('http').createServer(app)
//const io           	= require('socket.io')(server);



app.use(logger('dev'));

app.set('port', process.env.PORT || 9998);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '100mb'}));
app.set('views', path.join(__dirname, 'public/html'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorFn);
app.use(errorHandler());

require('./routes')(app);
const io = require('./sockets').init(server);

app.all('*',(req, res)=> {
    res.sendfile('public/html/index.html');  
});

server.on('error', (err)=>{
	process.exit(1);
}).listen(app.get('port'), ()=>{
	console.log('App is running at: '+app.get('port'))
});