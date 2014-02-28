//HTML server
var express = require('express');
var io = require('socket.io');
var http = require('http');
//var app = express();
var app = express.createServer();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
}); 

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

var getAssemblyPoint = function() {
    return {lat:59.459, long:17.939};
}

exports.getAssemblyPoint = getAssemblyPoint;
// 


app.get('/', function(req, res){
    res.render('index', getAssemblyPoint());
//     res.sendfile(__dirname + '/views/assemblyPoint.html')
});



var port = Number(process.env.PORT || 3000);
// app.listen(port, function() {
//     console.log('Port: ' + port);
// });

//Socket server
var server = http.createServer(app).listen(port);
var sio = io.listen(server);

console.log('connecting socket');


sio.on('connection', function (socket) {
    console.log('Got connect');
    
    socket.emit('news', { hello: 'world' });
  
  socket.on('message', function (data) {
    console.log('message:' + data);
  });
  socket.on('position', function (data) {
    console.log('position:' + data);
  });


});


