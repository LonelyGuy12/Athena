"use strict";

/**
 * Exports the global LoggerProvider singleton.
 */
module.exports = { LoggerProvider: p };

const global = typeof globalThis === 'object' ? globalThis : global; // Detect global object.
const symbol = Symbol.for("io.opentelemetry.js.api.logs"); // Symbol for global registration.

// Global variable reference (aliased for clarity).
const globalVar = global;

/**
 * No-op Logger class that does nothing.
 * Used as a fallback when no real logger is available.
 */
class NoopLogger {
  constructor() {}
  emit(event) {} // Empty emit method.
}
const noopLogger = new NoopLogger();

/**
 * No-op LoggerProvider that returns no-op loggers.
 * Used as a fallback provider.
 */
class NoopLoggerProvider {
  getLogger(name, version, options) {
    return new NoopLogger();
  }
}
const noopProvider = new NoopLoggerProvider();

/**
 * Proxy Logger that delegates to a real logger once available.
 */
class ProxyLogger {
  constructor(provider, name, version, options) {
    this._provider = provider;
    this.name = name;
    this.version = version;
    this.options = options;
  }

  emit(event) {
    this._getLogger().emit(event); // Delegate emit to the underlying logger.
  }

  _getLogger() {
    if (this._delegate) return this._delegate; // Cache delegate if available.

    // Fetch the real logger from the provider.
    const delegate = this._provider.getDelegateLogger(this.name, this.version, this.options);
    if (delegate) {
      this._delegate = delegate; // Cache it.
      return delegate;
    }
    return noopLogger; // Fallback to no-op.
  }
}

/**
 * Proxy LoggerProvider that delegates to a real provider once set.
 */
class ProxyLoggerProvider {
  constructor() {}

  getLogger(name, version, options) {
    // Get delegate logger if available, else create a proxy.
    const delegate = this.getDelegateLogger(name, version, options);
    return delegate || new ProxyLogger(this, name, version, options);
  }

  getDelegate() {
    return this._delegate || noopProvider; // Fallback to no-op.
  }

  setDelegate(delegate) {
    this._delegate = delegate; // Set the real delegate.
  }

  getDelegateLogger(name, version, options) {
    return this._delegate ? this._delegate.getLogger(name, version, options) : undefined;
  }
}

/**
 * Singleton class for managing the global LoggerProvider.
 * Handles registration and proxying.
 */
const p = (function () {
  function LoggerProvider() {
    this._proxyLoggerProvider = new ProxyLoggerProvider(); // Initial proxy.
  }

  // Singleton instance getter.
  LoggerProvider.getInstance = function () {
    if (!this._instance) this._instance = new LoggerProvider();
    return this._instance;
  };

  // Register a global logger provider, using a closure for versioning check.
  LoggerProvider.prototype.setGlobalLoggerProvider = function (provider) {
    if (globalVar[symbol]) return this.getLoggerProvider(); // Already registered.

    // Register with a versioned getter function.
    globalVar[symbol] = (function (key, prov, noop) {
      return function (e) {
        return e === key ? prov : noop;
      };
    })(1, provider, noopProvider);

    this._proxyLoggerProvider.setDelegate(provider); // Update proxy.
    return provider;
  };

  // Get the current global provider (real or proxy).
  LoggerProvider.prototype.getLoggerProvider = function () {
    const func = globalVar[symbol];
    return func ? func(1) : this._proxyLoggerProvider;
  };

  // Get a logger from the provider.
  LoggerProvider.prototype.getLogger = function (name, version, options) {
    return this.getLoggerProvider().getLogger(name, version, options);
  };

  // Disable and reset the global provider.
  LoggerProvider.prototype.disable = function () {
    delete globalVar[symbol];
    this._proxyLoggerProvider = new ProxyLoggerProvider();
  };

  return LoggerProvider;
})().getInstance();
