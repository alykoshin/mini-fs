/**
 * Created by alykoshin on 01.02.16.
 */

'use strict';


var exists = require('./exists');
var copy = require('./copy');


module.exports = {
  exists:      exists.existsAsync,
  existsAsync: exists.existsAsync,
  existsSync:  exists.existsSync,

  fileExists:      exists.fileExistsAsync,
  fileExistsAsync: exists.fileExistsAsync,
  fileExistsSync:  exists.fileExistsSync,

  dirExists:      exists.dirExistsAsync,
  dirExistsAsync: exists.dirExistsAsync,
  dirExistsSync:  exists.dirExistsSync,

  copyFile:      copy.copyFile,
  copyFileSync:  copy.copyFileSync,
  copySync:      copy.copyFileSync, // for backward compatibility
};
