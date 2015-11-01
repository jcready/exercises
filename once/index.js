module.exports = function once(fn) {
  var cache = {};
  return function(){
    return cache.hasOwnProperty('result')
      ? cache.result
      : (cache.result = fn.apply(this, arguments));
  }
}
