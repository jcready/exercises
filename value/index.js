module.exports = function value(thing) {
  return typeof thing === 'function'
    ? value(thing())
    : thing;
}
