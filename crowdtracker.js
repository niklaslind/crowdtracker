
var express = require('express');
var app = express();

 
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



app.get('/assemblyPoint', function(req, res){
    res.render('assemblyPoint', getAssemblyPoint());
//     res.sendfile(__dirname + '/views/assemblyPoint.html')
})

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
    console.log('Port: ' + port);
});

