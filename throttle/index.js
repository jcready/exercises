var slice = Array.prototype.slice;

module.exports = function throttle(fn, offset) {
  var last = 0;
  var scheduled = null;
  return function throttled(){
    var now = Date.now();
    var wait = last + offset - now;
    var args = slice.call(arguments);
    if (!last || wait < 0) {
      last = now;
      return fn.apply(this, args);
    } else {
      args.unshift(this);
      clearTimeout(scheduled);
      scheduled = setTimeout(
        throttled.bind.apply(throttled, args),
        wait
      );
    }
  }
}
