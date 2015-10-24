var slice = Array.prototype.slice;
var noop = function(){};

module.exports = {
  sequence: function sequenceAsync(pipeline){
    var fns = pipeline.slice();
    return function(done){
      var idx = 0;
      (function next(args){
        var cb = [function(err){
          return !err && idx < fns.length
            ? next(slice.call(arguments, 1))
            : done.apply(this, arguments);
        }.bind(this)];
        fns[idx++].apply(this, cb.concat(args));
      }).call(this, []);
    }
  },
  parallel: function parallelAsync(pipeline){
    var fns = pipeline.slice();
    return function(done){
      var completed = 0;
      var results = [];
      fns.forEach(function(fn, idx){
        fn(function(err, data){
          results[idx] = data;
          if (err !== null) done = done(err) ? noop : done;
          if (++completed === fns.length) done(null, results);
        })
      }, this);
    }
  },
  race: function raceAsync(pipeline){
    var fns = pipeline.slice();
    return function(done){
      fns.forEach(function(fn){
        fn(function(err, data){
          done.apply(this, arguments);
          done = noop;
        });
      }, this);
    }
  }
}
