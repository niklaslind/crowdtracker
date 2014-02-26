
var assert = require('assert');
var locations = require('../routes/geolocations');


//run by: mocha --ui tdd

suite('isItFriday', function() {
  test('isItFriday should return yes', function() {
    assert.equal("yes", locations.isItFriday());
  });
});

