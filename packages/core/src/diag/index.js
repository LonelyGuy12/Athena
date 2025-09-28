"use strict";

/**
 * Exports the DiagAPI singleton.
 */
module.exports = { DiagAPI: p };

const { getGlobal, setGlobal, unregisterGlobal } = require('../registry'); // Module 658.
const { DiagLogLevel } = require('./log-level'); // Module 6740.

/**
 * Helper to call diag methods with namespace prefixed.
 */
function callDiag(method, namespace, args) {
  const diag = getGlobal('diag');
  if (diag) {
    args.unshift(namespace); // Prefix namespace.
    return diag[method].apply(diag, args);
  }
}

/**
 * Component logger that prefixes logs with namespace.
 */
class ComponentLogger {
  constructor(options) {
    this._namespace = options.namespace || 'DiagComponentLogger';
  }

  debug(...args) {
    return callDiag('debug', this._namespace, args);
  }

  error(...args) {
    return callDiag('error', this._namespace, args);
  }

  info(...args) {
    return callDiag('info', this._namespace, args);
  }

  warn(...args) {
    return callDiag('warn', this._namespace, args);
  }

  verbose(...args) {
    return callDiag('verbose', this._namespace, args);
  }
}

/**
 * Singleton for diagnostic logging API.
 */
const p = (function () {
  function DiagAPI() {
    // Create no-op methods by default.
    this.verbose = createNoop('verbose');
    this.debug = createNoop('debug');
    this.info = createNoop('info');
    this.warn = createNoop('warn');
    this.error = createNoop('error');
  }

  // Helper to create no-op log functions.
  function createNoop(method) {
    return function (...args) {
      const diag = getGlobal('diag');
      if (diag) return diag[method].apply(diag, args);
    };
  }

  // Singleton instance getter.
  DiagAPI.instance = function () {
    if (!this._instance) this._instance = new DiagAPI();
    return this._instance;
  };

  // Set a new logger with level filtering.
  DiagAPI.prototype.setLogger = function (logger, config = { logLevel: DiagLogLevel.INFO }) {
    if (logger === this) {
      const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
      this.error(err.stack || err.message);
      return false;
    }

    if (typeof config === 'number') config = { logLevel: config };

    const oldDiag = getGlobal('diag');

    // Filter logger methods based on level.
    const filteredLogger = filterLogger(config.logLevel || DiagLogLevel.INFO, logger);

    if (oldDiag && !config.suppressOverrideMessage) {
      const stack = new Error().stack || '<failed to generate stacktrace>';
      oldDiag.warn(`Current logger will be overwritten from ${stack}`);
      filteredLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
    }

    return setGlobal('diag', filteredLogger, this, true); // Register with force.
  };

  // Disable and unregister.
  DiagAPI.prototype.disable = function () {
    unregisterGlobal('diag', this);
  };

  // Create a component logger.
  DiagAPI.prototype.createComponentLogger = function (options) {
    return new ComponentLogger(options);
  };

  // Helper to filter logger by level.
  function filterLogger(level, logger) {
    if (level < DiagLogLevel.NONE) level = DiagLogLevel.NONE;
    if (level > DiagLogLevel.ALL) level = DiagLogLevel.ALL;

    logger = logger || {};

    function createMethod(method, threshold) {
      const original = logger[method];
      if (typeof original === 'function' && level >= threshold) {
        return original.bind(logger);
      }
      return function () {}; // No-op.
    }

    return {
      error: createMethod('error', DiagLogLevel.ERROR),
      warn: createMethod('warn', DiagLogLevel.WARN),
      info: createMethod('info', DiagLogLevel.INFO),
      debug: createMethod('debug', DiagLogLevel.DEBUG),
      verbose: createMethod('verbose', DiagLogLevel.VERBOSE),
    };
  }

  return DiagAPI;
})();
