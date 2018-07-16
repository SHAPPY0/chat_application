"use strict";

const env = process.env.NODE_ENV || 'development';

module.exports= (err, req, res, next)=> {
console.log("err=",err)
  if(!err) return next();
  debugger;
  var code = err.status || 500;
  // var response = { error: err.message || err, stack: err.stack?err.stack.split('\n') : '' };
    var response = { status: code, message: err.message || err };

  if(err.data) response.data = err.data;
  if(err.url) response.url = err.url;
  if(code > 500) console.log(err.stack);
  
  if(env.toLowerCase() === 'production') {
    if(code === 500) response.error = 'An unexpected error has occured';
    response.stack = null;
  }
  console.log('response==',response);
  res.status(code).json(response);
};
