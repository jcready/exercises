"use strict";
module.exports = function throttlePromises(max, fns) {
  return new Promise((resolve, reject) => {
    const total = fns.length;
    let done = [], running = 0;

    function executePromise(){
      return ++running
          && (done[total - fns.length] = fns.shift()());
    }

    function recurse(data){
      return fns.length && --running
          ?  executePromise().then(recurse, reject)
          :  Promise.all(done).then(resolve, reject);
    }

    while (running < Math.min(max, total)) {
      executePromise().then(recurse, reject);
    }
  });
}
