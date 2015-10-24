'use strict';
module.exports = function quicksort(tail){
  if (!tail.length) return [];
  let head = tail.shift();
  return quicksort(tail.filter(item => item <= head))
    .concat([head])
    .concat(quicksort(tail.filter(item => item > head)));
};
