/* globals describe, before, beforeEach, after, afterEach, it */

'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
chai.should();
chai.use(require('chai-things')); //http://chaijs.com/plugins/chai-things

var path = require('path');
var miniFs = require('../../');

var invalidPath = 1;
var existingFile = module.filename;
var nonExistingFile = existingFile+'xyz';
var existingDir = path.dirname(module.filename);
var nonExistingDir = existingDir+'xyz';
var nonAccessibleDir = '/root/anything';

describe('mini-fs', function () {

  describe('existsSync', function () {
    it('existing file', function () {
      expect(miniFs.existsSync(existingFile)).equal(true);
    });
    it('existing dir', function () {
      expect(miniFs.existsSync(existingDir)).equal(true);
    });
    it('not existing file', function () {
      expect(miniFs.existsSync(nonExistingFile)).equal(false);
    });
    it('not existing dir', function () {
      expect(miniFs.existsSync(nonExistingDir)).equal(false);
    });
    it('invalid path', function () {
      expect(function () {
        miniFs.fileExistsSync(invalidPath);
      }).throw();
    });

    if (process.platform !== 'win32') {
      it('inaccessible (unix/darwin only)', function () {
        expect(function () {
          miniFs.existsSync(nonAccessibleDir);
        }).throw();
      });
    }

  });

  describe('existsAsync', function () {
    it('# empty callback', function () {
      expect(function() {
        miniFs.existsAsync(existingFile, undefined);
      }).not.throw();
    });
    it('existing file', function (done) {
      miniFs.existsAsync(existingFile, function(err, res) {
        expect(err).equal(null);
        expect(res).equal(true);
        done();
      });
    });
    it('existing dir', function (done) {
      miniFs.existsAsync(existingDir, function(err, res) {
        expect(err).equal(null);
        expect(res).equal(true);
        done();
      });
    });
    it('not existing', function (done) {
      miniFs.existsAsync(nonExistingFile, function(err, res) {
        expect(err).equal(null);
        expect(res).equal(false);
        done();
      });
    });
    it('# invalid path', function (done) {
      miniFs.existsAsync(invalidPath, function(err, res) {
        expect(err).not.equal(null);
        done();
      });
    });
    if (process.platform !== 'win32') {
      it('# inaccessible (unix/darwin only)', function (done) {
        miniFs.existsAsync(nonAccessibleDir, function(err, res) {
          expect(err).not.equal(null);
          done();
        });
      });
    }
    it('# exists equal existsAsync', function () {
        expect(miniFs.exists).equal(miniFs.existsAsync);
    });
  });

});
