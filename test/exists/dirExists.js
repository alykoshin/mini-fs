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
//var nonAccessibleDir = '/root/t';

describe('# mini-fs', function () {

  describe('# dirExistsSync', function () {
    it('# existing file', function () {
      expect(miniFs.dirExistsSync(existingFile)).equal(false);
    });
    it('# existing dir', function () {
      expect(miniFs.dirExistsSync(existingDir)).equal(true);
    });
    it('# not existing', function () {
      expect(miniFs.dirExistsSync(nonExistingFile)).equal(false);
    });
    it('# invalid path', function () {
      expect(function () {
        miniFs.fileExistsSync(invalidPath);
      }).throw();
    });

    if (process.platform !== 'win32') {
      it('# inaccessible (unix/darwin only)', function () {
        expect(function () {
          miniFs.dirExistsSync(nonAccessibleDir);
        }).throw();
      });
    }

  });

  describe('# dirExistsAsync', function () {
    it('# empty callback', function () {
      expect(function() {
        miniFs.dirExistsAsync(existingFile, undefined);
      }).not.throw();
    });
    it('# existing file', function (done) {
      miniFs.dirExistsAsync(existingFile, function(err, res) {
        expect(err).equal(null);
        expect(res).equal(false);
        done();
      });
    });
    it('# existing dir', function (done) {
      miniFs.dirExistsAsync(existingDir, function(err, res) {
        expect(err).equal(null);
        expect(res).equal(true);
        done();
      });
    });
    it('# non-existing file', function (done) {
      miniFs.dirExistsAsync(nonExistingFile, function(err, res) {
        expect(err).equal(null);
        expect(res).equal(false);
        done();
      });
    });
    it('# non-existing dir', function (done) {
      miniFs.dirExistsAsync(nonExistingDir, function(err, res) {
        expect(err).equal(null);
        expect(res).equal(false);
        done();
      });
    });
    it('# invalid path', function (done) {
      miniFs.dirExistsAsync(invalidPath, function(err, res) {
        expect(err).not.equal(null);
        done();
      });
    });
    if (process.platform !== 'win32') {
      it('# inaccessible (unix/darwin only)', function (done) {
        miniFs.dirExistsAsync(nonAccessibleDir, function(err, res) {
          expect(err).not.equal(null);
          done();
        });
      });
    }
    it('# fileExists equal fileExistsAsync', function () {
      expect(miniFs.dirExists).equal(miniFs.dirExistsAsync);
    });
  });

});
