
var assert = require('assert');
var crowdtracker = require('../crowdtracker');


//run by: mocha --ui tdd

suite('crowdtracker', function() {
  test('getAssemblyPoint should return geoJson', function() {
    assert.equal({'lat':59.449, 'long':17.929}, crowdtracker.getAssemblyPoint());
  });
  
});

