
var request = require('request');
var fs = require('fs')
  , filename = process.argv[2];

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    var json = JSON.parse(data);
    json.forEach(function(obj) { 
        var options = {
            uri: "http://localhost:3000/location",
            method: "POST",
            json: obj
        };

        console.log(options);
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) 
                console.log("OK: "+body);
            else
                console.log("Err:"+error);
            
        });
    });
});
