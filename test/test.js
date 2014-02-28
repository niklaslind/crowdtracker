
var assert = require('assert');
var crowdtracker = require('../crowdtracker');


//run by: mocha --ui tdd

suite('isItFriday', function() {
  test('isItFriday should return yes', function() {
    assert.equal("yes", crowdtracker.isItFriday());
  });
});

