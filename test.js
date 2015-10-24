var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// Instantiate a Mocha instance.
var mocha = new Mocha();

var testDir = '.';

function exercisesToTest(srcpath) {
  return fs.readdirSync(srcpath).filter(function(subpath) {
    var file = path.join(srcpath, subpath);
    return fs.statSync(file).isDirectory()
        && fs.readdirSync(file).indexOf('index.js') !== -1;
  });
}

// Add each .js file to the mocha instance
exercisesToTest(testDir).forEach(function(exercise){
    mocha.addFile(
        path.join(testDir, exercise, 'test.js')
    );
});

// Run the tests.
mocha.run(function(failures){
  process.on('exit', function () {
    process.exit();
  });
});
