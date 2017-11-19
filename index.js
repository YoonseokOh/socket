/*
 * Function : index.js
 *
 * Description : start up
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */


"use strict";

const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('./hbs-engine');

require('./app/globals/constants');

// Middle-ware
const compression = require('compression');
const minify = require('express-minify');

app.disable('x-powered-by');

app.use(compression());
app.use(minify());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

const routeIndex = require('./app/routes');

var httpServer = http.createServer(app).listen(5000, function(req,res){
  console.log('Socket IO server has been started');
});

// Set view engine ( hbs : handlebars )
app.set('trust proxy', 'loopback');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/views');

// Set pre route
require('./app/globals/pre-route')(app);

// Set routes
app.use('/', routeIndex);

// upgrade http server to socket.io server
const io = require('socket.io').listen(httpServer);

// Set post route
require('./app/globals/post-route')(app);

// Socket setting
io.sockets.on('connection', function(socket) {
  socket.emit('toclient', {
    msg:'Welcome !'
  });

  socket.on('fromclient', function(data) {
    socket.broadcast.emit('toclient', data); // 자신을 제외하고 다른 클라이언트에게 보냄.
    socket.emit('toclient', data); // 해당 클라이언트에게만 보냄.
    // io.sockets 전체소켓
    // socket 연결된 소켓
    // 귓속말 io.sockets(socket_id).emit('toclient', function(data) {});
    console.log('Message from client :' + data.msg);
  })
});

module.exports = app;
