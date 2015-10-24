var async = require('../async');

function Middleware(){
  this.middleware = [];
};

Middleware.prototype.use = function use(fn){
  this.middleware.push(fn.bind(this));
  return this;
};

Middleware.prototype.go = function go(done){
  async.sequence(this.middleware).call(this, done.bind(this));
  return this;
};

module.exports = Middleware;
