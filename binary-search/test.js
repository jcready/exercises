var assert = require('assert');
var binarySearch = require('./');

var generateRandomNumberArray = function(arrayLength) {
  var arr = new Array(arrayLength);
  for (var i = 0; i < arrayLength; i++) {
    arr[i] = Math.random();
  }
  return arr.sort();
}

describe('binarySearch', function() {

  it('works on an empty array', function() {
    var arr = [];
    var index = binarySearch(arr, 'elem');
    assert.equal(index, -1);
  });

  it('works on a not found call in an array of one item', function() {
    var arr = generateRandomNumberArray(1);
    var index = binarySearch(arr, arr[0] + 1);
    assert.equal(index, -1);
  });

  it('works on a found call in an array of one item', function() {
    var arr = generateRandomNumberArray(1);
    var index = binarySearch(arr, arr[0]);
    assert.equal(index, 0);
  });

  it('works on a not found call in an array of many items', function() {
    var arr = generateRandomNumberArray(15);
    var index = binarySearch(arr, arr[14] + 1);
    assert.equal(index, -1);
  });

  it('works on a found call in an array of many items', function() {
    var arr = generateRandomNumberArray(15);
    var index = binarySearch(arr, arr[0]);
    assert.equal(index, 0);
  });

  it('works on a found call in an array of many items higher in the array', function() {
    var arr = generateRandomNumberArray(15);
    var index = binarySearch(arr, arr[14]);
    assert.equal(index, 14);
  });

  it('uses a divide and conquer algorithm', function() {
    var lookups = {};
    var arrayLength = 10000;
    var proxyArray = generateRandomNumberArray(arrayLength);
    var smartArray = [];
    function defineSmartIndex(i) {
      Object.defineProperty(smartArray, i, {
        get: function() {
          lookups[i] = true;
          return proxyArray[i];
        },
      });
    }
    for (var i = 0; i < 10000; i++) {
      defineSmartIndex(i);
    }
    var indexOfElement = arrayLength - 5;
    var lookingFor = proxyArray[indexOfElement];
    var index = binarySearch(smartArray, lookingFor);
    var totalLookups = Object.keys(lookups).length;
    assert.equal(index, indexOfElement);
    assert.ok(Math.abs(totalLookups - 13) <= 1);
  });



});
