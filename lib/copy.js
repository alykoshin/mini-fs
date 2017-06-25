/**
 * Created by alykoshin on 22.04.16.
 */

'use strict';

const fs = require('fs');


const copyFileSync = function(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from));
};


// Source taken from:
// https://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
function copyFile(source, target, cb) {
  let cbCalled = false;

  const rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });

  const wr = fs.createWriteStream(target);
  wr.on('error', function(err) {
    done(err);
  });
  wr.on('close', function(ex) {
    done();
  });

  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}


module.exports = {
  copyFileSync,
  copyFile,
};
