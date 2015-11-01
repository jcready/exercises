module.exports = function flattenThunk(thunk) {
  return function flatten(done){
    return thunk(function(err, thunk){
      return typeof thunk === 'function' && !err
        ? flattenThunk(thunk)(done)
        : done(err, thunk);
    });
  }
}
