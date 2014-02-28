
var express = require('express');
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});
 
 
exports.isItFriday = function() {
    return "yes";
}

 
app.listen(3000);
console.log('Listening on port 3000...');
