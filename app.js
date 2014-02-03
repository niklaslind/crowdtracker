
var express = require('express');
var locations = require('./routes/geolocations');
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 

app.get('/location/', locations.findByPolygon);
app.get('/location/:id', locations.findById);
app.get('/location', locations.findAll);
app.post('/location', locations.addLocation);

 
app.listen(3000);
console.log('Listening on port 3000...');
