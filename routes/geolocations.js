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
    collection.ensureIndex({loc: "2dsphere"}, function(err, item) {
        console.log(item);
    });
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
    console.log(loc)
    collection.insert(loc, function(err, result) {
        res.send(result);
      });
}



exports.findByPolygon = function(req, res) {
    var q = 
        { "$and": [
            group(req),
            user(req),
            area(req)
        ]}
    console.log(q)
    collection.find(q).toArray(function(err, items) {
        res.send(items);
    });
};


function group(req) {
    var p = req.query.group
    if (p == null)
        return {}
    else
        return {"group": p}
}

function user(req) {
    var p = req.query.user
    if (p == null)
        return {}
    else
        return {"user": p}
}

function area(req) {
    var p = req.query.area
    if (p == null)
        return {}
    else
        return {"loc":  { "$geoWithin" : {"type": "Polygon", "coordinates": [JSON.parse(p)] } }}
}



