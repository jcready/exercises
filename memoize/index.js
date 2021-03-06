module.exports = function memoize(fn){
  var cache = {};
  return function(){
    var key = JSON.stringify(arguments);
    return cache[key] || (cache[key] = fn.apply(null, arguments));
  }
}
