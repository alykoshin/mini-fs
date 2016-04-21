/**
 * Created by alykoshin on 22.04.16.
 */

var fs = require('fs');

var copySync = function(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from));
};

module.exports.copySync = copySync;
