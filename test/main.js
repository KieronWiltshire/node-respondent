'use strict';

import path from 'path';
import Respondent from '../src/respondent';

/**
 * Unit tests.
 */
describe('respondent', function() {

  it('should not create a new {Respondent} instance without the {options.rootDir} parameter', function(done) {
    try {
      let config = new Respondent();
      done(new Error('A new {Respondent} instance was created'));
    } catch (error) {
      done();
    }
  });

  it('should create a new {Respondent} instance with the {options.rootDir} parameter', function(done) {
    try {
      let config = new Respondent({
        rootDir: path.join(__dirname, 'config')
      });
      done();
    } catch (error) {
      done(error);
    }
  });

  it('should not load an unknown value from the specified file', function(done) {
    try {
      let config = new Respondent({
        rootDir: path.join(__dirname, 'config')
      });

      if (config.has('app.unknown')) {
        done(new Error('{app.unknown} has the value of ' + config.get('app.unknown')));
      } else {
        done();
      }
    } catch (error) {
      done(error);
    }
  });

  it('should load a known value from the specified file', function(done) {
    try {
      let config = new Respondent({
        rootDir: path.join(__dirname, 'config')
      });

      if (config.has('app.planet')) {
        done();
      } else {
        done(new Error('{app.planet} could not be found'))
      }
    } catch (error) {
      done(error);
    }
  });

  it('should parse a boolean string as a boolean type', function(done) {
    try {
      let config = new Respondent({
        rootDir: path.join(__dirname, 'config')
      });

      if (config.get('app.booleanTest') === true) {
        done();
      } else {
        done(new Error('{app.booleanTest} could not be found'))
      }
    } catch (error) {
      done(error);
    }
  });

  it('should parse a boolean string as a boolean type even if the boolean is in uppercase', function(done) {
    try {
      let config = new Respondent({
        rootDir: path.join(__dirname, 'config')
      });

      if (config.get('app.booleanTestUpper') === true) {
        done();
      } else {
        done(new Error('{app.booleanTestUpper} could not be found'))
      }
    } catch (error) {
      done(error);
    }
  });

});
