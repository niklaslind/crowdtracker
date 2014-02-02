var mongo = require('mongodb'); 
var MongoClient = mongo.MongoClient
var Server = mongo.Server;
var ObjectID  = mongo.ObjectID

var db;
var collection;
var COLLECT_NAME='geolocations';

var mongoClient = new MongoClient(new Server('localhost', 27017));

mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("test");
    collection = db.collection(COLLECT_NAME);
});




exports.findById = function(req, res) {
    var id = req.params.id;
    console.log(id)
    collection.findOne({_id:ObjectID(id)}, function(err, item) {
        res.send(item);
    });
};
 

exports.findAll = function(req, res) {
    collection.find().toArray(function(err, items) {
        res.send(items);
    });
};


 
exports.addLocation = function(req, res) {
    var loc = req.body;
    collection.insert(loc, function(err, result) {
        res.send(result[0]);
      });
}


