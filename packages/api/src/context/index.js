"use strict";

/**
 * Exports the Context API singleton.
 */
module.exports = { context: f };

const { ROOT_CONTEXT } = require('../../core/src/context'); // Assuming module 5834 is core context impl.
const { setGlobalContextManager, getGlobal, unregisterGlobal } = require('../../core/src/registry'); // Module 658.
const { DiagAPI } = require('../../core/src/diag'); // Module 5774.

// No-op context manager class.
class NoopContextManager {
  active() {
    return ROOT_CONTEXT; // Return root context.
  }

  with(context, fn, thisArg, ...args) {
    return fn.call(thisArg, ...args); // Execute without changing context.
  }

  bind(target, context) {
    return target; // No binding.
  }

  enable() {
    return this;
  }

  disable() {
    return this;
  }
}

const noopContextManager = new NoopContextManager();

/**
 * Singleton for managing global context manager.
 */
const f = (function () {
  function ContextAPI() {}

  // Singleton instance getter.
  ContextAPI.getInstance = function () {
    if (!this._instance) this._instance = new ContextAPI();
    return this._instance;
  };

  // Register global context manager.
  ContextAPI.prototype.setGlobalContextManager = function (manager) {
    return setGlobalContextManager('context', manager, DiagAPI.instance());
  };

  // Get active context from manager.
  ContextAPI.prototype.active = function () {
    return this._getContextManager().active();
  };

  // Execute function with context.
  ContextAPI.prototype.with = function (context, fn, thisArg, ...args) {
    return this._getContextManager().with(context, fn, thisArg, ...args);
  };

  // Bind target to context.
  ContextAPI.prototype.bind = function (target, context) {
    return this._getContextManager().bind(target, context);
  };

  // Get current global manager (or no-op).
  ContextAPI.prototype._getContextManager = function () {
    return getGlobal('context') || noopContextManager;
  };

  // Disable and unregister.
  ContextAPI.prototype.disable = function () {
    this._getContextManager().disable();
    unregisterGlobal('context', DiagAPI.instance());
  };

  return ContextAPI;
})();

// More modules would follow similar patterns...
