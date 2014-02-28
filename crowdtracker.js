
var express = require('express');
var app = express();

 
app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
}); 

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

var getAssemblyPoint = function() {
    return {lat:'59.449', long:'17.929'};
}

exports.getAssemblyPoint = getAssemblyPoint;



app.get('/assemblyPoint', function(req, res){
    res.render('assemblyPoint', getAssemblyPoint());
//     res.sendfile(__dirname + '/views/assemblyPoint.html')
})

app.listen(3000);
console.log('Listening on port 3000...');
