"use strict";
const slice = Array.prototype.slice;

module.exports = function map(arr, predicate, ctx) {
  return arr.reduce(function(memo){
    let args = slice.call(arguments, 1);
    memo.push(predicate.apply(ctx, args));
    return memo;
  }, []);
}
