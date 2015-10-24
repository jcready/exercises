var slice = Array.prototype.slice;
module.exports = function curry(fn, ctx) {
  var arity = fn.length;
  return function curried() {
    var args = slice.call(arguments);
    if (args.length >= arity) {
      return fn.apply(ctx || null, args);
    }
    return function rest() {
      return curried.apply(null, args.concat(slice.call(arguments)));
    }
  }
}
