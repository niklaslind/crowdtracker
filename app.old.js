
var express = require('express');
var locations = require('./routes/geolocations');
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});
 

app.post('/location', locations.addLocation);
app.get('/location', locations.find);


 
app.listen(3000);
console.log('Listening on port 3000...');
