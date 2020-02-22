'use strict';

import fs from 'fs';
import rfr from 'rfr';
import path from 'path';
import fsx from 'fs-extra';
import {default as createDebugger} from 'debug';

const debug = createDebugger('respondent');

/**
 *
 */
export default class Respondent {

  /**
   * Create a new Respondent instance.
   *
   * @param {object} options
   * @returns {Respondent}
   * @throws {Error} if a root directory was not specified
   */
  constructor(options) {
    if (options.rootDir && typeof options.rootDir === 'string') {
      this._rootDir = options.rootDir;

      if (options.env) {
        if (typeof options.env === 'object') {
          process.env = Object.assign({}, process.env, options.env);
        } else {
          throw new Error('{options.env} must be an object');
        }
      }

      this._rfr = rfr({ root: this._rootDir });
    } else {
      throw new Error('{options.rootDir} is required');
    }
  }

  /**
   * Retrieve the root path of the config directory.
   *
   * @returns {string}
   */
  getRootDirectory() {
    return this._rootDir;
  }

  /**
   * Retrieve a value from the specified file.
   *
   * @param {string} valuePath
   * @param {string} defaultValue
   * @returns value
   * @throws {Error} if the config file argument is "index"
   */
  get(valuePath, defaultValue) {
    let valuePathSplit = valuePath.split('.');
    let value = null;

    let configFile = valuePathSplit[0];

    if (configFile && configFile.toLowerCase() === 'index') {
      throw new Error('The specified config file cannot be used.');
    }

    try {
      debug('Attempting to load a configuration value from ' + configFile);

      let file = this._rfr(configFile);
      value = file;
      for (let i = 1; i < valuePathSplit.length; i++) {
        let exists = false;
        if (i === 1) {
          if (valuePathSplit[i] != null) {
            value = file[valuePathSplit[i]];
            exists = true;
          }
        } else {
          if (value != null) {
            if (valuePathSplit[i] != null) {
              value = value[valuePathSplit[i]];
              exists = true;

            }
          }
        }

        if (exists) {
          debug('Configuration value loaded from \'' + configFile + '\'');
          break;
        }

        if (!exists) {
          debug('\'' + valuePathSplit[0] + '\' doesn\'t exist within \'' + valuePath);
          break;
        }
      }
    } catch(e) {
      debug(e);
      debug('Unable to load file with the name \'' + valuePathSplit[0] + '\'');
    }

    if (value && typeof value === 'string') {
      value = (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') ? (value.toLowerCase() === 'true' ? true : false) : value;
    }

    return (value !== undefined && value !== null) ? value : defaultValue;
  }

  /**
   * Check if the specified path & value exists.
   *
   * @param {string} valuePath
   * @returns {boolean}
   */
  has(valuePath) {
    return (this.get(valuePath) !== null && this.get(valuePath) !== undefined);
  }

}
