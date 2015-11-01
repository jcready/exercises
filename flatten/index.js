module.exports = function flatten(arr) {
  return arr.reduce((memo, val) => {
    var args = Array.isArray(val)
      ? flatten(val)
      : [val]
    memo.push.apply(memo, args);
    return memo;
  }, []);
}
