//HTML server
var express = require('express.io');
var app = express();
app.http().io();

app.use("/public", express.static(__dirname + "/public"));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');


var getAssemblyPoint = function() {
    return {lat:59.459, long:17.939};
}

//exports.getAssemblyPoint = getAssemblyPoint;
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
app.listen(port);

app.io.route('crowdee', {
    join: function(req) {
        console.log("crowdee.join" + JSON.stringify(req.data));
        req.io.join("da room");
        console.log("request positions");
        app.io.room("da room").broadcast('reqPosition'); // Requeire the position from everyone else
    },
    updatePosition: function(req) {
        console.log("crowdee.updatePosition" + JSON.stringify(req.data));
        req.io.room("da room").broadcast('positionUpdate', req.data);
    },
    chat: function(req) {
        console.log("crowdee.chat" + JSON.stringify(req.data));
        app.io.room("da room").broadcast('chatUpdate', req.data);
    }
});