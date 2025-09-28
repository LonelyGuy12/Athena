// THIS IS INCOMPLETE FILE SINCE MY MACBOOK CRASHED HALFWAY! AND ALL THE FILES GOT DELETED IDK HOW! I WILL TRY TO GET A MORE ORGANISED js FILE



/*! For license information please see main.js.LICENSE.txt */
! function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var n = t();
        for (var r in n)("object" == typeof exports ? exports : e)[r] = n[r]
    }
}(global, (() => (() => {
    var e, t, n = {
        3067: (e, t, n) => {
            "use strict";
            n.d(t, {
                TD: () => p
            });
            var r = "object" == typeof globalThis ? globalThis : global,
                i = Symbol.for("io.opentelemetry.js.api.logs"),
                o = r;
            var s = function() {
                    function e() {}
                    return e.prototype.emit = function(e) {}, e
                }(),
                a = new s,
                c = new(function() {
                    function e() {}
                    return e.prototype.getLogger = function(e, t, n) {
                        return new s
                    }, e
                }()),
                l = function() {
                    function e(e, t, n, r) {
                        this._provider = e, this.name = t, this.version = n, this.options = r
                    }
                    return e.prototype.emit = function(e) {
                        this._getLogger().emit(e)
                    }, e.prototype._getLogger = function() {
                        if (this._delegate) return this._delegate;
                        var e = this._provider.getDelegateLogger(this.name, this.version, this.options);
                        return e ? (this._delegate = e, this._delegate) : a
                    }, e
                }(),
                u = function() {
                    function e() {}
                    return e.prototype.getLogger = function(e, t, n) {
                        var r;
                        return null !== (r = this.getDelegateLogger(e, t, n)) && void 0 !== r ? r : new l(this, e, t, n)
                    }, e.prototype.getDelegate = function() {
                        var e;
                        return null !== (e = this._delegate) && void 0 !== e ? e : c
                    }, e.prototype.setDelegate = function(e) {
                        this._delegate = e
                    }, e.prototype.getDelegateLogger = function(e, t, n) {
                        var r;
                        return null === (r = this._delegate) || void 0 === r ? void 0 : r.getLogger(e, t, n)
                    }, e
                }(),
                p = function() {
                    function e() {
                        this._proxyLoggerProvider = new u
                    }
                    return e.getInstance = function() {
                        return this._instance || (this._instance = new e), this._instance
                    }, e.prototype.setGlobalLoggerProvider = function(e) {
                        return o[i] ? this.getLoggerProvider() : (o[i] = (t = 1, n = e, r = c, function(e) {
                            return e === t ? n : r
                        }), this._proxyLoggerProvider.setDelegate(e), e);
                        var t, n, r
                    }, e.prototype.getLoggerProvider = function() {
                        var e, t;
                        return null !== (t = null === (e = o[i]) || void 0 === e ? void 0 : e.call(o, 1)) && void 0 !== t ? t : this._proxyLoggerProvider
                    }, e.prototype.getLogger = function(e, t, n) {
                        return this.getLoggerProvider().getLogger(e, t, n)
                    }, e.prototype.disable = function() {
                        delete o[i], this._proxyLoggerProvider = new u
                    }, e
                }().getInstance()
        },
        7150: (e, t, n) => {
            "use strict";
            n.d(t, {
                c: () => f
            });
            var r = n(5834),
                i = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                },
                o = function(e, t, n) {
                    if (n || 2 === arguments.length)
                        for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
                    return e.concat(r || Array.prototype.slice.call(t))
                },
                s = function() {
                    function e() {}
                    return e.prototype.active = function() {
                        return r.I
                    }, e.prototype.with = function(e, t, n) {
                        for (var r = [], s = 3; s < arguments.length; s++) r[s - 3] = arguments[s];
                        return t.call.apply(t, o([n], i(r), !1))
                    }, e.prototype.bind = function(e, t) {
                        return t
                    }, e.prototype.enable = function() {
                        return this
                    }, e.prototype.disable = function() {
                        return this
                    }, e
                }(),
                a = n(658),
                c = n(5774),
                l = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                },
                u = function(e, t, n) {
                    if (n || 2 === arguments.length)
                        for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
                    return e.concat(r || Array.prototype.slice.call(t))
                },
                p = "context",
                d = new s,
                f = function() {
                    function e() {}
                    return e.getInstance = function() {
                        return this._instance || (this._instance = new e), this._instance
                    }, e.prototype.setGlobalContextManager = function(e) {
                        return (0, a.TG)(p, e, c.G.instance())
                    }, e.prototype.active = function() {
                        return this._getContextManager().active()
                    }, e.prototype.with = function(e, t, n) {
                        for (var r, i = [], o = 3; o < arguments.length; o++) i[o - 3] = arguments[o];
                        return (r = this._getContextManager()).with.apply(r, u([e, t, n], l(i), !1))
                    }, e.prototype.bind = function(e, t) {
                        return this._getContextManager().bind(e, t)
                    }, e.prototype._getContextManager = function() {
                        return (0, a.Rd)(p) || d
                    }, e.prototype.disable = function() {
                        this._getContextManager().disable(), (0, a.J_)(p, c.G.instance())
                    }, e
                }()
        },
        5774: (e, t, n) => {
            "use strict";
            n.d(t, {
                G: () => p
            });
            var r = n(658),
                i = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                },
                o = function(e, t, n) {
                    if (n || 2 === arguments.length)
                        for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
                    return e.concat(r || Array.prototype.slice.call(t))
                },
                s = function() {
                    function e(e) {
                        this._namespace = e.namespace || "DiagComponentLogger"
                    }
                    return e.prototype.debug = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return a("debug", this._namespace, e)
                    }, e.prototype.error = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return a("error", this._namespace, e)
                    }, e.prototype.info = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return a("info", this._namespace, e)
                    }, e.prototype.warn = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return a("warn", this._namespace, e)
                    }, e.prototype.verbose = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return a("verbose", this._namespace, e)
                    }, e
                }();

            function a(e, t, n) {
                var s = (0, r.Rd)("diag");
                if (s) return n.unshift(t), s[e].apply(s, o([], i(n), !1))
            }
            var c = n(6740);
            var l = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                },
                u = function(e, t, n) {
                    if (n || 2 === arguments.length)
                        for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
                    return e.concat(r || Array.prototype.slice.call(t))
                },
                p = function() {
                    function e() {
                        function e(e) {
                            return function() {
                                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                                var i = (0, r.Rd)("diag");
                                if (i) return i[e].apply(i, u([], l(t), !1))
                            }
                        }
                        var t = this;
                        t.setLogger = function(e, n) {
                            var i, o, s;
                            if (void 0 === n && (n = {
                                    logLevel: c.n.INFO
                                }), e === t) {
                                var a = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                                return t.error(null !== (i = a.stack) && void 0 !== i ? i : a.message), !1
                            }
                            "number" == typeof n && (n = {
                                logLevel: n
                            });
                            var l = (0, r.Rd)("diag"),
                                u = function(e, t) {
                                    function n(n, r) {
                                        var i = t[n];
                                        return "function" == typeof i && e >= r ? i.bind(t) : function() {}
                                    }
                                    return e < c.n.NONE ? e = c.n.NONE : e > c.n.ALL && (e = c.n.ALL), t = t || {}, {
                                        error: n("error", c.n.ERROR),
                                        warn: n("warn", c.n.WARN),
                                        info: n("info", c.n.INFO),
                                        debug: n("debug", c.n.DEBUG),
                                        verbose: n("verbose", c.n.VERBOSE)
                                    }
                                }(null !== (o = n.logLevel) && void 0 !== o ? o : c.n.INFO, e);
                            if (l && !n.suppressOverrideMessage) {
                                var p = null !== (s = (new Error).stack) && void 0 !== s ? s : "<failed to generate stacktrace>";
                                l.warn("Current logger will be overwritten from " + p), u.warn("Current logger will overwrite one already registered from " + p)
                            }
                            return (0, r.TG)("diag", u, t, !0)
                        }, t.disable = function() {
                            (0, r.J_)("diag", t)
                        }, t.createComponentLogger = function(e) {
                            return new s(e)
                        }, t.verbose = e("verbose"), t.debug = e("debug"), t.info = e("info"), t.warn = e("warn"), t.error = e("error")
                    }
                    return e.instance = function() {
                        return this._instance || (this._instance = new e), this._instance
                    }, e
                }()
        },
        2599: (e, t, n) => {
            "use strict";
            n.d(t, {
                u: () => u,
                H: () => l
            });
            var r = n(5774),
                i = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                },
                o = function(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                },
                s = function() {
                    function e(e) {
                        this._entries = e ? new Map(e) : new Map
                    }
                    return e.prototype.getEntry = function(e) {
                        var t = this._entries.get(e);
                        if (t) return Object.assign({}, t)
                    }, e.prototype.getAllEntries = function() {
                        return Array.from(this._entries.entries()).map((function(e) {
                            var t = i(e, 2);
                            return [t[0], t[1]]
                        }))
                    }, e.prototype.setEntry = function(t, n) {
                        var r = new e(this._entries);
                        return r._entries.set(t, n), r
                    }, e.prototype.removeEntry = function(t) {
                        var n = new e(this._entries);
                        return n._entries.delete(t), n
                    }, e.prototype.removeEntries = function() {
                        for (var t, n, r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                        var s = new e(this._entries);
                        try {
                            for (var a = o(r), c = a.next(); !c.done; c = a.next()) {
                                var l = c.value;
                                s._entries.delete(l)
                            }
                        } catch (e) {
                            t = {
                                error: e
                            }
                        } finally {
                            try {
                                c && !c.done && (n = a.return) && n.call(a)
                            } finally {
                                if (t) throw t.error
                            }
                        }
                        return s
                    }, e.prototype.clear = function() {
                        return new e
                    }, e
                }(),
                a = Symbol("BaggageEntryMetadata"),
                c = r.G.instance();

            function l(e) {
                return void 0 === e && (e = {}), new s(new Map(Object.entries(e)))
            }

            function u(e) {
                return "string" != typeof e && (c.error("Cannot create baggage metadata from unknown type: " + typeof e), e = ""), {
                    __TYPE__: a,
                    toString: function() {
                        return e
                    }
                }
            }
        },
        6339: (e, t, n) => {
            "use strict";
            n.d(t, {
                D: () => r
            });
            var r = n(7150).c.getInstance()
        },
        5834: (e, t, n) => {
            "use strict";

            function r(e) {
                return Symbol.for(e)
            }
            n.d(t, {
                I: () => i,
                Y: () => r
            });
            var i = new function e(t) {
                var n = this;
                n._currentContext = t ? new Map(t) : new Map, n.getValue = function(e) {
                    return n._currentContext.get(e)
                }, n.setValue = function(t, r) {
                    var i = new e(n._currentContext);
                    return i._currentContext.set(t, r), i
                }, n.deleteValue = function(t) {
                    var r = new e(n._currentContext);
                    return r._currentContext.delete(t), r
                }
            }
        },
        928: (e, t, n) => {
            "use strict";
            n.d(t, {
                K: () => r
            });
            var r = n(5774).G.instance()
        },
        6740: (e, t, n) => {
            "use strict";
            var r;
            n.d(t, {
                n: () => r
            }),
            function(e) {
                e[e.NONE = 0] = "NONE", e[e.ERROR = 30] = "ERROR", e[e.WARN = 50] = "WARN", e[e.INFO = 60] = "INFO", e[e.DEBUG = 70] = "DEBUG", e[e.VERBOSE = 80] = "VERBOSE", e[e.ALL = 9999] = "ALL"
            }(r || (r = {}))
        },
        8095: (e, t, n) => {
            "use strict";
            n.r(t), n.d(t, {
                DiagConsoleLogger: () => a,
                DiagLogLevel: () => c.n,
                INVALID_SPANID: () => S.fQ,
                INVALID_SPAN_CONTEXT: () => S.Rr,
                INVALID_TRACEID: () => S.AE,
                ProxyTracer: () => p.T,
                ProxyTracerProvider: () => d.K,
                ROOT_CONTEXT: () => o.I,
                SamplingDecision: () => f.U,
                SpanKind: () => h.M,
                SpanStatusCode: () => m.Q,
                TraceFlags: () => g.r,
                ValueType: () => r,
                baggageEntryMetadataFromString: () => i.u,
                context: () => T.D,
                createContextKey: () => o.Y,
                createNoopMeter: () => l.v7,
                createTraceState: () => w,
                default: () => R,
                defaultTextMapGetter: () => u.r,
                defaultTextMapSetter: () => u.M,
                diag: () => O.K,
                isSpanContextValid: () => E.BM,
                isValidSpanId: () => E.Lc,
                isValidTraceId: () => E.jN,
                metrics: () => k.q,
                propagation: () => A.u,
                trace: () => C.g
            });
            var r, i = n(2599),
                o = n(5834),
                s = [{
                    n: "error",
                    c: "error"
                }, {
                    n: "warn",
                    c: "warn"
                }, {
                    n: "info",
                    c: "info"
                }, {
                    n: "debug",
                    c: "debug"
                }, {
                    n: "verbose",
                    c: "trace"
                }],
                a = function() {
                    function e(e) {
                        return function() {
                            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                            if (console) {
                                var r = console[e];
                                if ("function" != typeof r && (r = console.log), "function" == typeof r) return r.apply(console, t)
                            }
                        }
                    }
                    for (var t = 0; t < s.length; t++) this[s[t].n] = e(s[t].c)
                },
                c = n(6740),
                l = n(4027);
            ! function(e) {
                e[e.INT = 0] = "INT", e[e.DOUBLE = 1] = "DOUBLE"
            }(r || (r = {}));
            var u = n(7008),
                p = n(9953),
                d = n(5236),
                f = n(2297),
                h = n(87),
                m = n(1820),
                g = n(8726),
                v = "[_0-9a-z-*/]",
                b = new RegExp("^(?:" + ("[a-z]" + v + "{0,255}") + "|" + ("[a-z0-9]" + v + "{0,240}@[a-z]" + v + "{0,13}") + ")$"),
                y = /^[ -~]{0,255}[!-~]$/,
                _ = /,|=/;
            var x = function() {
                function e(e) {
                    this._internalState = new Map, e && this._parse(e)
                }
                return e.prototype.set = function(e, t) {
                    var n = this._clone();
                    return n._internalState.has(e) && n._internalState.delete(e), n._internalState.set(e, t), n
                }, e.prototype.unset = function(e) {
                    var t = this._clone();
                    return t._internalState.delete(e), t
                }, e.prototype.get = function(e) {
                    return this._internalState.get(e)
                }, e.prototype.serialize = function() {
                    var e = this;
                    return this._keys().reduce((function(t, n) {
                        return t.push(n + "=" + e.get(n)), t
                    }), []).join(",")
                }, e.prototype._parse = function(e) {
                    e.length > 512 || (this._internalState = e.split(",").reverse().reduce((function(e, t) {
                        var n = t.trim(),
                            r = n.indexOf("=");
                        if (-1 !== r) {
                            var i = n.slice(0, r),
                                o = n.slice(r + 1, t.length);
                            (function(e) {
                                return b.test(e)
                            })(i) && function(e) {
                                return y.test(e) && !_.test(e)
                            }(o) && e.set(i, o)
                        }
                        return e
                    }), new Map), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))))
                }, e.prototype._keys = function() {
                    return Array.from(this._internalState.keys()).reverse()
                }, e.prototype._clone = function() {
                    var t = new e;
                    return t._internalState = new Map(this._internalState), t
                }, e
            }();

            function w(e) {
                return new x(e)
            }
            var E = n(7228),
                S = n(7007),
                T = n(6339),
                O = n(928),
                k = n(1868),
                A = n(8303),
                C = n(2210);
            const R = {
                context: T.D,
                diag: O.K,
                metrics: k.q,
                propagation: A.u,
                trace: C.g
            }
        },
        658: (e, t, n) => {
            "use strict";
            n.d(t, {
                Rd: () => p,
                TG: () => u,
                J_: () => d
            });
            var r = "object" == typeof globalThis ? globalThis : global,
                i = "1.9.0",
                o = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            var s = function(e) {
                    var t = new Set([e]),
                        n = new Set,
                        r = e.match(o);
                    if (!r) return function() {
                        return !1
                    };
                    var i = +r[1],
                        s = +r[2],
                        a = +r[3];
                    if (null != r[4]) return function(t) {
                        return t === e
                    };

                    function c(e) {
                        return n.add(e), !1
                    }

                    function l(e) {
                        return t.add(e), !0
                    }
                    return function(e) {
                        if (t.has(e)) return !0;
                        if (n.has(e)) return !1;
                        var r = e.match(o);
                        if (!r) return c(e);
                        var u = +r[1],
                            p = +r[2],
                            d = +r[3];
                        return null != r[4] || i !== u ? c(e) : 0 === i ? s === p && a <= d ? l(e) : c(e) : s <= p ? l(e) : c(e)
                    }
                }(i),
                a = i.split(".")[0],
                c = Symbol.for("opentelemetry.js.api." + a),
                l = r;

            function u(e, t, n, r) {
                var o;
                void 0 === r && (r = !1);
                var s = l[c] = null !== (o = l[c]) && void 0 !== o ? o : {
                    version: i
                };
                if (!r && s[e]) {
                    var a = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + e);
                    return n.error(a.stack || a.message), !1
                }
                if (s.version !== i) {
                    a = new Error("@opentelemetry/api: Registration of version v" + s.version + " for " + e + " does not match previously registered API v" + i);
                    return n.error(a.stack || a.message), !1
                }
                return s[e] = t, n.debug("@opentelemetry/api: Registered a global for " + e + " v" + i + "."), !0
            }

            function p(e) {
                var t, n, r = null === (t = l[c]) || void 0 === t ? void 0 : t.version;
                if (r && s(r)) return null === (n = l[c]) || void 0 === n ? void 0 : n[e]
            }

            function d(e, t) {
                t.debug("@opentelemetry/api: Unregistering a global for " + e + " v" + i + ".");
                var n = l[c];
                n && delete n[e]
            }
        },
        1868: (e, t, n) => {
            "use strict";
            n.d(t, {
                q: () => c
            });
            var r = n(4027),
                i = new(function() {
                    function e() {}
                    return e.prototype.getMeter = function(e, t, n) {
                        return r.dI
                    }, e
                }()),
                o = n(658),
                s = n(5774),
                a = "metrics",
                c = function() {
                    function e() {}
                    return e.getInstance = function() {
                        return this._instance || (this._instance = new e), this._instance
                    }, e.prototype.setGlobalMeterProvider = function(e) {
                        return (0, o.TG)(a, e, s.G.instance())
                    }, e.prototype.getMeterProvider = function() {
                        return (0, o.Rd)(a) || i
                    }, e.prototype.getMeter = function(e, t, n) {
                        return this.getMeterProvider().getMeter(e, t, n)
                    }, e.prototype.disable = function() {
                        (0, o.J_)(a, s.G.instance())
                    }, e
                }().getInstance()
        },
        4027: (e, t, n) => {
            "use strict";
            n.d(t, {
                dI: () => m,
                v7: () => E
            });
            var r, i = (r = function(e, t) {
                    return r = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }, r(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                o = function() {
                    function e() {}
                    return e.prototype.createGauge = function(e, t) {
                        return v
                    }, e.prototype.createHistogram = function(e, t) {
                        return b
                    }, e.prototype.createCounter = function(e, t) {
                        return g
                    }, e.prototype.createUpDownCounter = function(e, t) {
                        return y
                    }, e.prototype.createObservableGauge = function(e, t) {
                        return x
                    }, e.prototype.createObservableCounter = function(e, t) {
                        return _
                    }, e.prototype.createObservableUpDownCounter = function(e, t) {
                        return w
                    }, e.prototype.addBatchObservableCallback = function(e, t) {}, e.prototype.removeBatchObservableCallback = function(e) {}, e
                }(),
                s = function() {},
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i(t, e), t.prototype.add = function(e, t) {}, t
                }(s),
                c = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i(t, e), t.prototype.add = function(e, t) {}, t
                }(s),
                l = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i(t, e), t.prototype.record = function(e, t) {}, t
                }(s),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i(t, e), t.prototype.record = function(e, t) {}, t
                }(s),
                p = function() {
                    function e() {}
                    return e.prototype.addCallback = function(e) {}, e.prototype.removeCallback = function(e) {}, e
                }(),
                d = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i(t, e), t
                }(p),
                f = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i(t, e), t
                }(p),
                h = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i(t, e), t
                }(p),
                m = new o,
                g = new a,
                v = new l,
                b = new u,
                y = new c,
                _ = new d,
                x = new f,
                w = new h;

            function E() {
                return m
            }
        },
        8303: (e, t, n) => {
            "use strict";
            n.d(t, {
                u: () => v
            });
            var r = n(658),
                i = function() {
                    function e() {}
                    return e.prototype.inject = function(e, t) {}, e.prototype.extract = function(e, t) {
                        return e
                    }, e.prototype.fields = function() {
                        return []
                    }, e
                }(),
                o = n(7008),
                s = n(7150),
                a = (0, n(5834).Y)("OpenTelemetry Baggage Key");

            function c(e) {
                return e.getValue(a) || void 0
            }

            function l() {
                return c(s.c.getInstance().active())
            }

            function u(e, t) {
                return e.setValue(a, t)
            }

            function p(e) {
                return e.deleteValue(a)
            }
            var d = n(2599),
                f = n(5774),
                h = "propagation",
                m = new i,
                g = function() {
                    function e() {
                        this.createBaggage = d.H, this.getBaggage = c, this.getActiveBaggage = l, this.setBaggage = u, this.deleteBaggage = p
                    }
                    return e.getInstance = function() {
                        return this._instance || (this._instance = new e), this._instance
                    }, e.prototype.setGlobalPropagator = function(e) {
                        return (0, r.TG)(h, e, f.G.instance())
                    }, e.prototype.inject = function(e, t, n) {
                        return void 0 === n && (n = o.M), this._getGlobalPropagator().inject(e, t, n)
                    }, e.prototype.extract = function(e, t, n) {
                        return void 0 === n && (n = o.r), this._getGlobalPropagator().extract(e, t, n)
                    }, e.prototype.fields = function() {
                        return this._getGlobalPropagator().fields()
                    }, e.prototype.disable = function() {
                        (0, r.J_)(h, f.G.instance())
                    }, e.prototype._getGlobalPropagator = function() {
                        return (0, r.Rd)(h) || m
                    }, e
                }(),
                v = g.getInstance()
        },
        7008: (e, t, n) => {
            "use strict";
            n.d(t, {
                M: () => i,
                r: () => r
            });
            var r = {
                    get: function(e, t) {
                        if (null != e) return e[t]
                    },
                    keys: function(e) {
                        return null == e ? [] : Object.keys(e)
                    }
                },
                i = {
                    set: function(e, t, n) {
                        null != e && (e[t] = n)
                    }
                }
        },
        2210: (e, t, n) => {
            "use strict";
            n.d(t, {
                g: () => l
            });
            var r = n(658),
                i = n(5236),
                o = n(7228),
                s = n(3557),
                a = n(5774),
                c = "trace",
                l = function() {
                    function e() {
                        this._proxyTracerProvider = new i.K, this.wrapSpanContext = o.kw, this.isSpanContextValid = o.BM, this.deleteSpan = s.TW, this.getSpan = s.Br, this.getActiveSpan = s.HN, this.getSpanContext = s.A3, this.setSpan = s.WZ, this.setSpanContext = s.G3
                    }
                    return e.getInstance = function() {
                        return this._instance || (this._instance = new e), this._instance
                    }, e.prototype.setGlobalTracerProvider = function(e) {
                        var t = (0, r.TG)(c, this._proxyTracerProvider, a.G.instance());
                        return t && this._proxyTracerProvider.setDelegate(e), t
                    }, e.prototype.getTracerProvider = function() {
                        return (0, r.Rd)(c) || this._proxyTracerProvider
                    }, e.prototype.getTracer = function(e, t) {
                        return this.getTracerProvider().getTracer(e, t)
                    }, e.prototype.disable = function() {
                        (0, r.J_)(c, a.G.instance()), this._proxyTracerProvider = new i.K
                    }, e
                }().getInstance()
        },
        7817: (e, t, n) => {
            "use strict";
            n.d(t, {
                s: () => i
            });
            var r = n(7007),
                i = function() {
                    function e(e) {
                        void 0 === e && (e = r.Rr), this._spanContext = e
                    }
                    return e.prototype.spanContext = function() {
                        return this._spanContext
                    }, e.prototype.setAttribute = function(e, t) {
                        return this
                    }, e.prototype.setAttributes = function(e) {
                        return this
                    }, e.prototype.addEvent = function(e, t) {
                        return this
                    }, e.prototype.addLink = function(e) {
                        return this
                    }, e.prototype.addLinks = function(e) {
                        return this
                    }, e.prototype.setStatus = function(e) {
                        return this
                    }, e.prototype.updateName = function(e) {
                        return this
                    }, e.prototype.end = function(e) {}, e.prototype.isRecording = function() {
                        return !1
                    }, e.prototype.recordException = function(e, t) {}, e
                }()
        },
        9127: (e, t, n) => {
            "use strict";
            n.d(t, {
                E: () => c
            });
            var r = n(7150),
                i = n(3557),
                o = n(7817),
                s = n(7228),
                a = r.c.getInstance(),
                c = function() {
                    function e() {}
                    return e.prototype.startSpan = function(e, t, n) {
                        if (void 0 === n && (n = a.active()), Boolean(null == t ? void 0 : t.root)) return new o.s;
                        var r, c = n && (0, i.A3)(n);
                        return "object" == typeof(r = c) && "string" == typeof r.spanId && "string" == typeof r.traceId && "number" == typeof r.traceFlags && (0, s.BM)(c) ? new o.s(c) : new o.s
                    }, e.prototype.startActiveSpan = function(e, t, n, r) {
                        var o, s, c;
                        if (!(arguments.length < 2)) {
                            2 === arguments.length ? c = t : 3 === arguments.length ? (o = t, c = n) : (o = t, s = n, c = r);
                            var l = null != s ? s : a.active(),
                                u = this.startSpan(e, o, l),
                                p = (0, i.WZ)(l, u);
                            return a.with(p, c, void 0, u)
                        }
                    }, e
                }()
        },
        9953: (e, t, n) => {
            "use strict";
            n.d(t, {
                T: () => i
            });
            var r = new(n(9127).E),
                i = function() {
                    function e(e, t, n, r) {
                        this._provider = e, this.name = t, this.version = n, this.options = r
                    }
                    return e.prototype.startSpan = function(e, t, n) {
                        return this._getTracer().startSpan(e, t, n)
                    }, e.prototype.startActiveSpan = function(e, t, n, r) {
                        var i = this._getTracer();
                        return Reflect.apply(i.startActiveSpan, i, arguments)
                    }, e.prototype._getTracer = function() {
                        if (this._delegate) return this._delegate;
                        var e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                        return e ? (this._delegate = e, this._delegate) : r
                    }, e
                }()
        },
        5236: (e, t, n) => {
            "use strict";
            n.d(t, {
                K: () => s
            });
            var r = n(9953),
                i = n(9127),
                o = new(function() {
                    function e() {}
                    return e.prototype.getTracer = function(e, t, n) {
                        return new i.E
                    }, e
                }()),
                s = function() {
                    function e() {}
                    return e.prototype.getTracer = function(e, t, n) {
                        var i;
                        return null !== (i = this.getDelegateTracer(e, t, n)) && void 0 !== i ? i : new r.T(this, e, t, n)
                    }, e.prototype.getDelegate = function() {
                        var e;
                        return null !== (e = this._delegate) && void 0 !== e ? e : o
                    }, e.prototype.setDelegate = function(e) {
                        this._delegate = e
                    }, e.prototype.getDelegateTracer = function(e, t, n) {
                        var r;
                        return null === (r = this._delegate) || void 0 === r ? void 0 : r.getTracer(e, t, n)
                    }, e
                }()
        },
        2297: (e, t, n) => {
            "use strict";
            var r;
            n.d(t, {
                U: () => r
            }),
            function(e) {
                e[e.NOT_RECORD = 0] = "NOT_RECORD", e[e.RECORD = 1] = "RECORD", e[e.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED"
            }(r || (r = {}))
        },
        3557: (e, t, n) => {
            "use strict";
            n.d(t, {
                A3: () => d,
                Br: () => a,
                G3: () => p,
                HN: () => c,
                TW: () => u,
                WZ: () => l
            });
            var r = n(5834),
                i = n(7817),
                o = n(7150),
                s = (0, r.Y)("OpenTelemetry Context Key SPAN");

            function a(e) {
                return e.getValue(s) || void 0
            }

            function c() {
                return a(o.c.getInstance().active())
            }

            function l(e, t) {
                return e.setValue(s, t)
            }

            function u(e) {
                return e.deleteValue(s)
            }

            function p(e, t) {
                return l(e, new i.s(t))
            }

            function d(e) {
                var t;
                return null === (t = a(e)) || void 0 === t ? void 0 : t.spanContext()
            }
        },
        7007: (e, t, n) => {
            "use strict";
            n.d(t, {
                AE: () => o,
                Rr: () => s,
                fQ: () => i
            });
            var r = n(8726),
                i = "0000000000000000",
                o = "00000000000000000000000000000000",
                s = {
                    traceId: o,
                    spanId: i,
                    traceFlags: r.r.NONE
                }
        },
        87: (e, t, n) => {
            "use strict";
            var r;
            n.d(t, {
                M: () => r
            }),
            function(e) {
                e[e.INTERNAL = 0] = "INTERNAL", e[e.SERVER = 1] = "SERVER", e[e.CLIENT = 2] = "CLIENT", e[e.PRODUCER = 3] = "PRODUCER", e[e.CONSUMER = 4] = "CONSUMER"
            }(r || (r = {}))
        },
        7228: (e, t, n) => {
            "use strict";
            n.d(t, {
                BM: () => l,
                Lc: () => c,
                jN: () => a,
                kw: () => u
            });
            var r = n(7007),
                i = n(7817),
                o = /^([0-9a-f]{32})$/i,
                s = /^[0-9a-f]{16}$/i;

            function a(e) {
                return o.test(e) && e !== r.AE
            }

            function c(e) {
                return s.test(e) && e !== r.fQ
            }

            function l(e) {
                return a(e.traceId) && c(e.spanId)
            }

            function u(e) {
                return new i.s(e)
            }
        },
        1820: (e, t, n) => {
            "use strict";
            var r;
            n.d(t, {
                Q: () => r
            }),
            function(e) {
                e[e.UNSET = 0] = "UNSET", e[e.OK = 1] = "OK", e[e.ERROR = 2] = "ERROR"
            }(r || (r = {}))
        },
        8726: (e, t, n) => {
            "use strict";
            var r;
            n.d(t, {
                r: () => r
            }),
            function(e) {
                e[e.NONE = 0] = "NONE", e[e.SAMPLED = 1] = "SAMPLED"
            }(r || (r = {}))
        },
        1954: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AbstractAsyncHooksContextManager = void 0;
            const r = n(2361),
                i = ["addListener", "on", "once", "prependListener", "prependOnceListener"];
            t.AbstractAsyncHooksContextManager = class {
                constructor() {
                    this._kOtListeners = Symbol("OtListeners"), this._wrapped = !1
                }
                bind(e, t) {
                    return t instanceof r.EventEmitter ? this._bindEventEmitter(e, t) : "function" == typeof t ? this._bindFunction(e, t) : t
                }
                _bindFunction(e, t) {
                    const n = this,
                        r = function(...r) {
                            return n.with(e, (() => t.apply(this, r)))
                        };
                    return Object.defineProperty(r, "length", {
                        enumerable: !1,
                        configurable: !0,
                        writable: !1,
                        value: t.length
                    }), r
                }
                _bindEventEmitter(e, t) {
                    return void 0 !== this._getPatchMap(t) || (this._createPatchMap(t), i.forEach((n => {
                        void 0 !== t[n] && (t[n] = this._patchAddListener(t, t[n], e))
                    })), "function" == typeof t.removeListener && (t.removeListener = this._patchRemoveListener(t, t.removeListener)), "function" == typeof t.off && (t.off = this._patchRemoveListener(t, t.off)), "function" == typeof t.removeAllListeners && (t.removeAllListeners = this._patchRemoveAllListeners(t, t.removeAllListeners))), t
                }
                _patchRemoveListener(e, t) {
                    const n = this;
                    return function(r, i) {
                        var o;
                        const s = null === (o = n._getPatchMap(e)) || void 0 === o ? void 0 : o[r];
                        if (void 0 === s) return t.call(this, r, i);
                        const a = s.get(i);
                        return t.call(this, r, a || i)
                    }
                }
                _patchRemoveAllListeners(e, t) {
                    const n = this;
                    return function(r) {
                        const i = n._getPatchMap(e);
                        return void 0 !== i && (0 === arguments.length ? n._createPatchMap(e) : void 0 !== i[r] && delete i[r]), t.apply(this, arguments)
                    }
                }
                _patchAddListener(e, t, n) {
                    const r = this;
                    return function(i, o) {
                        if (r._wrapped) return t.call(this, i, o);
                        let s = r._getPatchMap(e);
                        void 0 === s && (s = r._createPatchMap(e));
                        let a = s[i];
                        void 0 === a && (a = new WeakMap, s[i] = a);
                        const c = r.bind(n, o);
                        a.set(o, c), r._wrapped = !0;
                        try {
                            return t.call(this, i, c)
                        } finally {
                            r._wrapped = !1
                        }
                    }
                }
                _createPatchMap(e) {
                    const t = Object.create(null);
                    return e[this._kOtListeners] = t, t
                }
                _getPatchMap(e) {
                    return e[this._kOtListeners]
                }
            }
        },
        7605: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AsyncHooksContextManager = void 0;
            const r = n(8095),
                i = n(852),
                o = n(1954);
            class s extends o.AbstractAsyncHooksContextManager {
                constructor() {
                    super(), this._contexts = new Map, this._stack = [], this._asyncHook = i.createHook({
                        init: this._init.bind(this),
                        before: this._before.bind(this),
                        after: this._after.bind(this),
                        destroy: this._destroy.bind(this),
                        promiseResolve: this._destroy.bind(this)
                    })
                }
                active() {
                    var e;
                    return null !== (e = this._stack[this._stack.length - 1]) && void 0 !== e ? e : r.ROOT_CONTEXT
                }
                with (e, t, n, ...r) {
                    this._enterContext(e);
                    try {
                        return t.call(n, ...r)
                    } finally {
                        this._exitContext()
                    }
                }
                enable() {
                    return this._asyncHook.enable(), this
                }
                disable() {
                    return this._asyncHook.disable(), this._contexts.clear(), this._stack = [], this
                }
                _init(e, t) {
                    if ("TIMERWRAP" === t) return;
                    const n = this._stack[this._stack.length - 1];
                    void 0 !== n && this._contexts.set(e, n)
                }
                _destroy(e) {
                    this._contexts.delete(e)
                }
                _before(e) {
                    const t = this._contexts.get(e);
                    void 0 !== t && this._enterContext(t)
                }
                _after() {
                    this._exitContext()
                }
                _enterContext(e) {
                    this._stack.push(e)
                }
                _exitContext() {
                    this._stack.pop()
                }
            }
            t.AsyncHooksContextManager = s
        },
        7616: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AsyncLocalStorageContextManager = void 0;
            const r = n(8095),
                i = n(852),
                o = n(1954);
            class s extends o.AbstractAsyncHooksContextManager {
                constructor() {
                    super(), this._asyncLocalStorage = new i.AsyncLocalStorage
                }
                active() {
                    var e;
                    return null !== (e = this._asyncLocalStorage.getStore()) && void 0 !== e ? e : r.ROOT_CONTEXT
                }
                with (e, t, n, ...r) {
                    const i = null == n ? t : t.bind(n);
                    return this._asyncLocalStorage.run(e, i, ...r)
                }
                enable() {
                    return this
                }
                disable() {
                    return this._asyncLocalStorage.disable(), this
                }
            }
            t.AsyncLocalStorageContextManager = s
        },
        5706: (e, t, n) => {
            "use strict";
            t.R9 = void 0;
            var r = n(7605);
            var i = n(7616);
            Object.defineProperty(t, "R9", {
                enumerable: !0,
                get: function() {
                    return i.AsyncLocalStorageContextManager
                }
            })
        },
        3420: (e, t, n) => {
            "use strict";
            var r;
            n.d(t, {
                I: () => r
            }),
            function(e) {
                e[e.SUCCESS = 0] = "SUCCESS", e[e.FAILED = 1] = "FAILED"
            }(r || (r = {}))
        },
        3250: (e, t, n) => {
            "use strict";
            n.d(t, {
                Cx: () => a,
                H3: () => l,
                Vo: () => r,
                WM: () => s,
                bO: () => i,
                bU: () => o,
                ef: () => c
            });
            var r = "=",
                i = ";",
                o = ",",
                s = "baggage",
                a = 180,
                c = 4096,
                l = 8192
        },
        926: (e, t, n) => {
            "use strict";
            n.d(t, {
                a: () => a
            });
            var r = n(8303),
                i = n(8397),
                o = n(3250),
                s = n(315),
                a = function() {
                    function e() {}
                    return e.prototype.inject = function(e, t, n) {
                        var a = r.u.getBaggage(e);
                        if (a && !(0, i.Ll)(e)) {
                            var c = (0, s.Q8)(a).filter((function(e) {
                                    return e.length <= o.ef
                                })).slice(0, o.Cx),
                                l = (0, s.gq)(c);
                            l.length > 0 && n.set(t, o.WM, l)
                        }
                    }, e.prototype.extract = function(e, t, n) {
                        var i = n.get(t, o.WM),
                            a = Array.isArray(i) ? i.join(o.bU) : i;
                        if (!a) return e;
                        var c = {};
                        return 0 === a.length ? e : (a.split(o.bU).forEach((function(e) {
                            var t = (0, s.RZ)(e);
                            if (t) {
                                var n = {
                                    value: t.value
                                };
                                t.metadata && (n.metadata = t.metadata), c[t.key] = n
                            }
                        })), 0 === Object.entries(c).length ? e : r.u.setBaggage(e, r.u.createBaggage(c)))
                    }, e.prototype.fields = function() {
                        return [o.WM]
                    }, e
                }()
        },
        315: (e, t, n) => {
            "use strict";
            n.d(t, {
                Q8: () => a,
                RZ: () => c,
                _T: () => l,
                gq: () => s
            });
            var r = n(2599),
                i = n(3250),
                o = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                };

            function s(e) {
                return e.reduce((function(e, t) {
                    var n = "" + e + ("" !== e ? i.bU : "") + t;
                    return n.length > i.H3 ? e : n
                }), "")
            }

            function a(e) {
                return e.getAllEntries().map((function(e) {
                    var t = o(e, 2),
                        n = t[0],
                        r = t[1],
                        s = encodeURIComponent(n) + "=" + encodeURIComponent(r.value);
                    return void 0 !== r.metadata && (s += i.bO + r.metadata.toString()), s
                }))
            }

            function c(e) {
                var t = e.split(i.bO);
                if (!(t.length <= 0)) {
                    var n = t.shift();
                    if (n) {
                        var o = n.indexOf(i.Vo);
                        if (!(o <= 0)) {
                            var s, a = decodeURIComponent(n.substring(0, o).trim()),
                                c = decodeURIComponent(n.substring(o + 1).trim());
                            return t.length > 0 && (s = (0, r.u)(t.join(i.bO))), {
                                key: a,
                                value: c,
                                metadata: s
                            }
                        }
                    }
                }
            }

            function l(e) {
                return "string" != typeof e || 0 === e.length ? {} : e.split(i.bU).map((function(e) {
                    return c(e)
                })).filter((function(e) {
                    return void 0 !== e && e.value.length > 0
                })).reduce((function(e, t) {
                    return e[t.key] = t.value, e
                }), {})
            }
        },
        551: (e, t, n) => {
            "use strict";
            n.d(t, {
                Do: () => c,
                FT: () => s,
                sy: () => a
            });
            var r = n(928),
                i = function(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                },
                o = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                };

            function s(e) {
                var t, n, s = {};
                if ("object" != typeof e || null == e) return s;
                try {
                    for (var l = i(Object.entries(e)), u = l.next(); !u.done; u = l.next()) {
                        var p = o(u.value, 2),
                            d = p[0],
                            f = p[1];
                        a(d) ? c(f) ? Array.isArray(f) ? s[d] = f.slice() : s[d] = f : r.K.warn("Invalid attribute value set for key: " + d) : r.K.warn("Invalid attribute key: " + d)
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        u && !u.done && (n = l.return) && n.call(l)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return s
            }

            function a(e) {
                return "string" == typeof e && e.length > 0
            }

            function c(e) {
                return null == e || (Array.isArray(e) ? function(e) {
                    var t, n, r;
                    try {
                        for (var o = i(e), s = o.next(); !s.done; s = o.next()) {
                            var a = s.value;
                            if (null != a) {
                                if (!r) {
                                    if (l(a)) {
                                        r = typeof a;
                                        continue
                                    }
                                    return !1
                                }
                                if (typeof a !== r) return !1
                            }
                        }
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            s && !s.done && (n = o.return) && n.call(o)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                    return !0
                }(e) : l(e))
            }

            function l(e) {
                switch (typeof e) {
                    case "number":
                    case "boolean":
                    case "string":
                        return !0
                }
                return !1
            }
        },
        6220: (e, t, n) => {
            "use strict";
            n.d(t, {
                L: () => o,
                c: () => i
            });
            var r = (0, n(6470).x)();

            function i(e) {
                r = e
            }

            function o(e) {
                try {
                    r(e)
                } catch (e) {}
            }
        },
        6470: (e, t, n) => {
            "use strict";
            n.d(t, {
                x: () => i
            });
            var r = n(928);

            function i() {
                return function(e) {
                    r.K.error(function(e) {
                        return "string" == typeof e ? e : JSON.stringify(function(e) {
                            var t = {},
                                n = e;
                            for (; null !== n;) Object.getOwnPropertyNames(n).forEach((function(e) {
                                if (!t[e]) {
                                    var r = n[e];
                                    r && (t[e] = String(r))
                                }
                            })), n = Object.getPrototypeOf(n);
                            return t
                        }(e))
                    }(e))
                }
            }
        },
        7664: (e, t, n) => {
            "use strict";
            n.d(t, {
                Dt: () => g,
                J3: () => p,
                Jt: () => l,
                KO: () => h,
                PW: () => f,
                U: () => c,
                Us: () => d,
                X_: () => v,
                aE: () => u,
                i5: () => a,
                ji: () => m,
                vF: () => b
            });
            var r = n(471),
                i = 9,
                o = Math.pow(10, 6),
                s = Math.pow(10, i);

            function a(e) {
                var t = e / 1e3;
                return [Math.trunc(t), Math.round(e % 1e3 * o)]
            }

            function c() {
                var e = r.t.timeOrigin;
                if ("number" != typeof e) {
                    var t = r.t;
                    e = t.timing && t.timing.fetchStart
                }
                return e
            }

            function l(e) {
                return b(a(c()), a("number" == typeof e ? e : r.t.now()))
            }

            function u(e) {
                if (g(e)) return e;
                if ("number" == typeof e) return e < c() ? l(e) : a(e);
                if (e instanceof Date) return a(e.getTime());
                throw TypeError("Invalid input type")
            }

            function p(e, t) {
                var n = t[0] - e[0],
                    r = t[1] - e[1];
                return r < 0 && (n -= 1, r += s), [n, r]
            }

            function d(e) {
                var t = i,
                    n = "" + "0".repeat(t) + e[1] + "Z",
                    r = n.substring(n.length - t - 1);
                return new Date(1e3 * e[0]).toISOString().replace("000Z", r)
            }

            function f(e) {
                return e[0] * s + e[1]
            }

            function h(e) {
                return 1e3 * e[0] + e[1] / 1e6
            }

            function m(e) {
                return 1e6 * e[0] + e[1] / 1e3
            }

            function g(e) {
                return Array.isArray(e) && 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1]
            }

            function v(e) {
                return g(e) || "number" == typeof e || e instanceof Date
            }

            function b(e, t) {
                var n = [e[0] + t[0], e[1] + t[1]];
                return n[1] >= s && (n[1] -= s, n[0] += 1), n
            }
        },
        4205: (e, t, n) => {
            "use strict";
            n.r(t), n.d(t, {
                AlwaysOffSampler: () => I,
                AlwaysOnSampler: () => P,
                AnchoredClock: () => i,
                BindOnceFuture: () => X.q,
                CompositePropagator: () => E.Y,
                DEFAULT_ATTRIBUTE_COUNT_LIMIT: () => $.qG,
                DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT: () => $.KR,
                DEFAULT_ENVIRONMENT: () => $.J9,
                DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: () => $.Ys,
                DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: () => $.VH,
                ExportResultCode: () => p.I,
                ParentBasedSampler: () => j,
                RPCType: () => b,
                RandomIdGenerator: () => f,
                SDK_INFO: () => y.m,
                TRACE_PARENT_HEADER: () => S.FX,
                TRACE_STATE_HEADER: () => S.C3,
                TimeoutError: () => G,
                TraceIdRatioBasedSampler: () => M,
                TraceState: () => F.n,
                TracesSamplerValues: () => z.J,
                VERSION: () => Z.q,
                W3CBaggagePropagator: () => r.a,
                W3CTraceContextPropagator: () => S.jf,
                _globalThis: () => g,
                addHrTimes: () => c.vF,
                baggageUtils: () => Q,
                callWithTimeout: () => W,
                deleteRPCMetadata: () => k,
                getEnv: () => _.d,
                getEnvWithoutDefaults: () => _.v,
                getRPCMetadata: () => A,
                getTimeOrigin: () => c.U,
                globalErrorHandler: () => s.L,
                hexToBase64: () => v,
                hexToBinary: () => u,
                hrTime: () => c.Jt,
                hrTimeDuration: () => c.J3,
                hrTimeToMicroseconds: () => c.ji,
                hrTimeToMilliseconds: () => c.KO,
                hrTimeToNanoseconds: () => c.PW,
                hrTimeToTimeStamp: () => c.Us,
                internal: () => ee,
                isAttributeKey: () => o.sy,
                isAttributeValue: () => o.Do,
                isTimeInput: () => c.X_,
                isTimeInputHrTime: () => c.Dt,
                isTracingSuppressed: () => U.Ll,
                isUrlIgnored: () => K,
                isWrapped: () => Y,
                loggingErrorHandler: () => a.x,
                merge: () => B.T,
                millisToHrTime: () => c.i5,
                otperformance: () => x.t,
                parseEnvironment: () => $.Ds,
                parseTraceParent: () => S.j_,
                sanitizeAttributes: () => o.FT,
                setGlobalErrorHandler: () => s.c,
                setRPCMetadata: () => O,
                suppressTracing: () => U.hE,
                timeInputToHrTime: () => c.aE,
                unrefTimer: () => w.g,
                unsuppressTracing: () => U.yy,
                urlMatches: () => V
            });
            var r = n(926),
                i = function() {
                    function e(e, t) {
                        this._monotonicClock = t, this._epochMillis = e.now(), this._performanceMillis = t.now()
                    }
                    return e.prototype.now = function() {
                        var e = this._monotonicClock.now() - this._performanceMillis;
                        return this._epochMillis + e
                    }, e
                }(),
                o = n(551),
                s = n(6220),
                a = n(6470),
                c = n(7664);

            function l(e) {
                return e >= 48 && e <= 57 ? e - 48 : e >= 97 && e <= 102 ? e - 87 : e - 55
            }

            function u(e) {
                for (var t = new Uint8Array(e.length / 2), n = 0, r = 0; r < e.length; r += 2) {
                    var i = l(e.charCodeAt(r)),
                        o = l(e.charCodeAt(r + 1));
                    t[n++] = i << 4 | o
                }
                return t
            }
            var p = n(3420),
                d = n(315),
                f = function() {
                    this.generateTraceId = m(16), this.generateSpanId = m(8)
                },
                h = Buffer.allocUnsafe(16);

            function m(e) {
                return function() {
                    for (var t = 0; t < e / 4; t++) h.writeUInt32BE(Math.random() * Math.pow(2, 32) >>> 0, 4 * t);
                    for (t = 0; t < e && !(h[t] > 0); t++) t === e - 1 && (h[e - 1] = 1);
                    return h.toString("hex", 0, e)
                }
            }
            var g = "object" == typeof globalThis ? globalThis : global;

            function v(e) {
                return Buffer.from(u(e)).toString("base64")
            }
            var b, y = n(856),
                _ = n(4241),
                x = n(471),
                w = n(2140),
                E = n(3135),
                S = n(9588),
                T = (0, n(5834).Y)("OpenTelemetry SDK Context Key RPC_METADATA");

            function O(e, t) {
                return e.setValue(T, t)
            }

            function k(e) {
                return e.deleteValue(T)
            }

            function A(e) {
                return e.getValue(T)
            }! function(e) {
                e.HTTP = "http"
            }(b || (b = {}));
            var C, R = n(2297),
                I = function() {
                    function e() {}
                    return e.prototype.shouldSample = function() {
                        return {
                            decision: R.U.NOT_RECORD
                        }
                    }, e.prototype.toString = function() {
                        return "AlwaysOffSampler"
                    }, e
                }(),
                P = function() {
                    function e() {}
                    return e.prototype.shouldSample = function() {
                        return {
                            decision: R.U.RECORD_AND_SAMPLED
                        }
                    }, e.prototype.toString = function() {
                        return "AlwaysOnSampler"
                    }, e
                }(),
                N = n(2210),
                L = n(7228),
                D = n(8726),
                j = function() {
                    function e(e) {
                        var t, n, r, i;
                        this._root = e.root, this._root || ((0, s.L)(new Error("ParentBasedSampler must have a root sampler configured")), this._root = new P), this._remoteParentSampled = null !== (t = e.remoteParentSampled) && void 0 !== t ? t : new P, this._remoteParentNotSampled = null !== (n = e.remoteParentNotSampled) && void 0 !== n ? n : new I, this._localParentSampled = null !== (r = e.localParentSampled) && void 0 !== r ? r : new P, this._localParentNotSampled = null !== (i = e.localParentNotSampled) && void 0 !== i ? i : new I
                    }
                    return e.prototype.shouldSample = function(e, t, n, r, i, o) {
                        var s = N.g.getSpanContext(e);
                        return s && (0, L.BM)(s) ? s.isRemote ? s.traceFlags & D.r.SAMPLED ? this._remoteParentSampled.shouldSample(e, t, n, r, i, o) : this._remoteParentNotSampled.shouldSample(e, t, n, r, i, o) : s.traceFlags & D.r.SAMPLED ? this._localParentSampled.shouldSample(e, t, n, r, i, o) : this._localParentNotSampled.shouldSample(e, t, n, r, i, o) : this._root.shouldSample(e, t, n, r, i, o)
                    }, e.prototype.toString = function() {
                        return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}"
                    }, e
                }(),
                M = function() {
                    function e(e) {
                        void 0 === e && (e = 0), this._ratio = e, this._ratio = this._normalize(e), this._upperBound = Math.floor(4294967295 * this._ratio)
                    }
                    return e.prototype.shouldSample = function(e, t) {
                        return {
                            decision: (0, L.jN)(t) && this._accumulate(t) < this._upperBound ? R.U.RECORD_AND_SAMPLED : R.U.NOT_RECORD
                        }
                    }, e.prototype.toString = function() {
                        return "TraceIdRatioBased{" + this._ratio + "}"
                    }, e.prototype._normalize = function(e) {
                        return "number" != typeof e || isNaN(e) ? 0 : e >= 1 ? 1 : e <= 0 ? 0 : e
                    }, e.prototype._accumulate = function(e) {
                        for (var t = 0, n = 0; n < e.length / 8; n++) {
                            var r = 8 * n;
                            t = (t ^ parseInt(e.slice(r, r + 8), 16)) >>> 0
                        }
                        return t
                    }, e
                }(),
                U = n(8397),
                F = n(9598),
                $ = n(851),
                B = n(9009),
                z = n(9290),
                q = (C = function(e, t) {
                    return C = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }, C(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    C(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                G = function(e) {
                    function t(n) {
                        var r = e.call(this, n) || this;
                        return Object.setPrototypeOf(r, t.prototype), r
                    }
                    return q(t, e), t
                }(Error);

            function W(e, t) {
                var n, r = new Promise((function(e, r) {
                    n = setTimeout((function() {
                        r(new G("Operation timed out."))
                    }), t)
                }));
                return Promise.race([e, r]).then((function(e) {
                    return clearTimeout(n), e
                }), (function(e) {
                    throw clearTimeout(n), e
                }))
            }
            var H = function(e) {
                var t = "function" == typeof Symbol && Symbol.iterator,
                    n = t && e[t],
                    r = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function() {
                        return e && r >= e.length && (e = void 0), {
                            value: e && e[r++],
                            done: !e
                        }
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            };

            function V(e, t) {
                return "string" == typeof t ? e === t : !!e.match(t)
            }

            function K(e, t) {
                var n, r;
                if (!t) return !1;
                try {
                    for (var i = H(t), o = i.next(); !o.done; o = i.next()) {
                        if (V(e, o.value)) return !0
                    }
                } catch (e) {
                    n = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (r = i.return) && r.call(i)
                    } finally {
                        if (n) throw n.error
                    }
                }
                return !1
            }

            function Y(e) {
                return "function" == typeof e && "function" == typeof e.__original && "function" == typeof e.__unwrap && !0 === e.__wrapped
            }
            var X = n(1399),
                Z = n(8923),
                J = n(6339);
            var Q = {
                    getKeyPairs: d.Q8,
                    serializeKeyPairs: d.gq,
                    parseKeyPairsIntoRecord: d._T,
                    parsePairKeyValue: d.RZ
                },
                ee = {
                    _export: function(e, t) {
                        return new Promise((function(n) {
                            J.D.with((0, U.hE)(J.D.active()), (function() {
                                e.export(t, (function(e) {
                                    n(e)
                                }))
                            }))
                        }))
                    }
                }
        },
        4241: (e, t, n) => {
            "use strict";
            n.d(t, {
                d: () => i,
                v: () => o
            });
            var r = n(851);

            function i() {
                var e = (0, r.Ds)(process.env);
                return Object.assign({}, r.J9, e)
            }

            function o() {
                return (0, r.Ds)(process.env)
            }
        },
        471: (e, t, n) => {
            "use strict";
            n.d(t, {
                t: () => r
            });
            var r = require("perf_hooks").performance
        },
        856: (e, t, n) => {
            "use strict";
            n.d(t, {
                m: () => m
            });
            var r = n(8923);
            var i, o = "process.runtime.name",
                s = "telemetry.sdk.name",
                a = "telemetry.sdk.language",
                c = "telemetry.sdk.version",
                l = o,
                u = s,
                p = a,
                d = c,
                f = "nodejs",
                h = f,
                m = ((i = {})[u] = "opentelemetry", i[l] = "node", i[p] = h, i[d] = r.q, i)
        },
        2140: (e, t, n) => {
            "use strict";

            function r(e) {
                e.unref()
            }
            n.d(t, {
                g: () => r
            })
        },
        3135: (e, t, n) => {
            "use strict";
            n.d(t, {
                Y: () => o
            });
            var r = n(928),
                i = function(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                },
                o = function() {
                    function e(e) {
                        var t;
                        void 0 === e && (e = {}), this._propagators = null !== (t = e.propagators) && void 0 !== t ? t : [], this._fields = Array.from(new Set(this._propagators.map((function(e) {
                            return "function" == typeof e.fields ? e.fields() : []
                        })).reduce((function(e, t) {
                            return e.concat(t)
                        }), [])))
                    }
                    return e.prototype.inject = function(e, t, n) {
                        var o, s;
                        try {
                            for (var a = i(this._propagators), c = a.next(); !c.done; c = a.next()) {
                                var l = c.value;
                                try {
                                    l.inject(e, t, n)
                                } catch (e) {
                                    r.K.warn("Failed to inject with " + l.constructor.name + ". Err: " + e.message)
                                }
                            }
                        } catch (e) {
                            o = {
                                error: e
                            }
                        } finally {
                            try {
                                c && !c.done && (s = a.return) && s.call(a)
                            } finally {
                                if (o) throw o.error
                            }
                        }
                    }, e.prototype.extract = function(e, t, n) {
                        return this._propagators.reduce((function(e, i) {
                            try {
                                return i.extract(e, t, n)
                            } catch (e) {
                                r.K.warn("Failed to extract with " + i.constructor.name + ". Err: " + e.message)
                            }
                            return e
                        }), e)
                    }, e.prototype.fields = function() {
                        return this._fields.slice()
                    }, e
                }()
        },
        9598: (e, t, n) => {
            "use strict";
            n.d(t, {
                n: () => a
            });
            var r = "[_0-9a-z-*/]",
                i = new RegExp("^(?:" + ("[a-z]" + r + "{0,255}") + "|" + ("[a-z0-9]" + r + "{0,240}@[a-z]" + r + "{0,13}") + ")$"),
                o = /^[ -~]{0,255}[!-~]$/,
                s = /,|=/;
            var a = function() {
                function e(e) {
                    this._internalState = new Map, e && this._parse(e)
                }
                return e.prototype.set = function(e, t) {
                    var n = this._clone();
                    return n._internalState.has(e) && n._internalState.delete(e), n._internalState.set(e, t), n
                }, e.prototype.unset = function(e) {
                    var t = this._clone();
                    return t._internalState.delete(e), t
                }, e.prototype.get = function(e) {
                    return this._internalState.get(e)
                }, e.prototype.serialize = function() {
                    var e = this;
                    return this._keys().reduce((function(t, n) {
                        return t.push(n + "=" + e.get(n)), t
                    }), []).join(",")
                }, e.prototype._parse = function(e) {
                    e.length > 512 || (this._internalState = e.split(",").reverse().reduce((function(e, t) {
                        var n = t.trim(),
                            r = n.indexOf("=");
                        if (-1 !== r) {
                            var a = n.slice(0, r),
                                c = n.slice(r + 1, t.length);
                            (function(e) {
                                return i.test(e)
                            })(a) && function(e) {
                                return o.test(e) && !s.test(e)
                            }(c) && e.set(a, c)
                        }
                        return e
                    }), new Map), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))))
                }, e.prototype._keys = function() {
                    return Array.from(this._internalState.keys()).reverse()
                }, e.prototype._clone = function() {
                    var t = new e;
                    return t._internalState = new Map(this._internalState), t
                }, e
            }()
        },
        9588: (e, t, n) => {
            "use strict";
            n.d(t, {
                C3: () => l,
                FX: () => c,
                j_: () => p,
                jf: () => d
            });
            var r = n(2210),
                i = n(7228),
                o = n(8726),
                s = n(8397),
                a = n(9598),
                c = "traceparent",
                l = "tracestate",
                u = new RegExp("^\\s?((?!ff)[\\da-f]{2})-((?![0]{32})[\\da-f]{32})-((?![0]{16})[\\da-f]{16})-([\\da-f]{2})(-.*)?\\s?$");

            function p(e) {
                var t = u.exec(e);
                return t ? "00" === t[1] && t[5] ? null : {
                    traceId: t[2],
                    spanId: t[3],
                    traceFlags: parseInt(t[4], 16)
                } : null
            }
            var d = function() {
                function e() {}
                return e.prototype.inject = function(e, t, n) {
                    var a = r.g.getSpanContext(e);
                    if (a && !(0, s.Ll)(e) && (0, i.BM)(a)) {
                        var u = "00-" + a.traceId + "-" + a.spanId + "-0" + Number(a.traceFlags || o.r.NONE).toString(16);
                        n.set(t, c, u), a.traceState && n.set(t, l, a.traceState.serialize())
                    }
                }, e.prototype.extract = function(e, t, n) {
                    var i = n.get(t, c);
                    if (!i) return e;
                    var o = Array.isArray(i) ? i[0] : i;
                    if ("string" != typeof o) return e;
                    var s = p(o);
                    if (!s) return e;
                    s.isRemote = !0;
                    var u = n.get(t, l);
                    if (u) {
                        var d = Array.isArray(u) ? u.join(",") : u;
                        s.traceState = new a.n("string" == typeof d ? d : void 0)
                    }
                    return r.g.setSpanContext(e, s)
                }, e.prototype.fields = function() {
                    return [c, l]
                }, e
            }()
        },
        8397: (e, t, n) => {
            "use strict";
            n.d(t, {
                Ll: () => s,
                hE: () => i,
                yy: () => o
            });
            var r = (0, n(5834).Y)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");

            function i(e) {
                return e.setValue(r, !0)
            }

            function o(e) {
                return e.deleteValue(r)
            }

            function s(e) {
                return !0 === e.getValue(r)
            }
        },
        1399: (e, t, n) => {
            "use strict";
            n.d(t, {
                q: () => s
            });
            var r = function() {
                    function e() {
                        var e = this;
                        this._promise = new Promise((function(t, n) {
                            e._resolve = t, e._reject = n
                        }))
                    }
                    return Object.defineProperty(e.prototype, "promise", {
                        get: function() {
                            return this._promise
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.resolve = function(e) {
                        this._resolve(e)
                    }, e.prototype.reject = function(e) {
                        this._reject(e)
                    }, e
                }(),
                i = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                },
                o = function(e, t, n) {
                    if (n || 2 === arguments.length)
                        for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
                    return e.concat(r || Array.prototype.slice.call(t))
                },
                s = function() {
                    function e(e, t) {
                        this._callback = e, this._that = t, this._isCalled = !1, this._deferred = new r
                    }
                    return Object.defineProperty(e.prototype, "isCalled", {
                        get: function() {
                            return this._isCalled
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "promise", {
                        get: function() {
                            return this._deferred.promise
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.call = function() {
                        for (var e, t = this, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                        if (!this._isCalled) {
                            this._isCalled = !0;
                            try {
                                Promise.resolve((e = this._callback).call.apply(e, o([this._that], i(n), !1))).then((function(e) {
                                    return t._deferred.resolve(e)
                                }), (function(e) {
                                    return t._deferred.reject(e)
                                }))
                            } catch (e) {
                                this._deferred.reject(e)
                            }
                        }
                        return this._deferred.promise
                    }, e
                }()
        },
        851: (e, t, n) => {
            "use strict";
            n.d(t, {
                Ds: () => w,
                J9: () => g,
                KR: () => d,
                VH: () => m,
                Ys: () => h,
                qG: () => f
            });
            var r = n(6740),
                i = n(9290),
                o = ",",
                s = ["OTEL_SDK_DISABLED"];

            function a(e) {
                return s.indexOf(e) > -1
            }
            var c = ["OTEL_BSP_EXPORT_TIMEOUT", "OTEL_BSP_MAX_EXPORT_BATCH_SIZE", "OTEL_BSP_MAX_QUEUE_SIZE", "OTEL_BSP_SCHEDULE_DELAY", "OTEL_BLRP_EXPORT_TIMEOUT", "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE", "OTEL_BLRP_MAX_QUEUE_SIZE", "OTEL_BLRP_SCHEDULE_DELAY", "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_ATTRIBUTE_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT", "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT", "OTEL_SPAN_EVENT_COUNT_LIMIT", "OTEL_SPAN_LINK_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT", "OTEL_EXPORTER_OTLP_TIMEOUT", "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT", "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT", "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT", "OTEL_EXPORTER_JAEGER_AGENT_PORT"];

            function l(e) {
                return c.indexOf(e) > -1
            }
            var u = ["OTEL_NO_PATCH_MODULES", "OTEL_PROPAGATORS", "OTEL_SEMCONV_STABILITY_OPT_IN"];

            function p(e) {
                return u.indexOf(e) > -1
            }
            var d = 1 / 0,
                f = 128,
                h = 128,
                m = 128,
                g = {
                    OTEL_SDK_DISABLED: !1,
                    CONTAINER_NAME: "",
                    ECS_CONTAINER_METADATA_URI_V4: "",
                    ECS_CONTAINER_METADATA_URI: "",
                    HOSTNAME: "",
                    KUBERNETES_SERVICE_HOST: "",
                    NAMESPACE: "",
                    OTEL_BSP_EXPORT_TIMEOUT: 3e4,
                    OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
                    OTEL_BSP_MAX_QUEUE_SIZE: 2048,
                    OTEL_BSP_SCHEDULE_DELAY: 5e3,
                    OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
                    OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
                    OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
                    OTEL_BLRP_SCHEDULE_DELAY: 5e3,
                    OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
                    OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
                    OTEL_EXPORTER_JAEGER_ENDPOINT: "",
                    OTEL_EXPORTER_JAEGER_PASSWORD: "",
                    OTEL_EXPORTER_JAEGER_USER: "",
                    OTEL_EXPORTER_OTLP_ENDPOINT: "",
                    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
                    OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
                    OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
                    OTEL_EXPORTER_OTLP_HEADERS: "",
                    OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
                    OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
                    OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
                    OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
                    OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
                    OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
                    OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
                    OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
                    OTEL_LOG_LEVEL: r.n.INFO,
                    OTEL_NO_PATCH_MODULES: [],
                    OTEL_PROPAGATORS: ["tracecontext", "baggage"],
                    OTEL_RESOURCE_ATTRIBUTES: "",
                    OTEL_SERVICE_NAME: "",
                    OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: d,
                    OTEL_ATTRIBUTE_COUNT_LIMIT: f,
                    OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: d,
                    OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: f,
                    OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: d,
                    OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: f,
                    OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
                    OTEL_SPAN_LINK_COUNT_LIMIT: 128,
                    OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: h,
                    OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: m,
                    OTEL_TRACES_EXPORTER: "",
                    OTEL_TRACES_SAMPLER: i.J.ParentBasedAlwaysOn,
                    OTEL_TRACES_SAMPLER_ARG: "",
                    OTEL_LOGS_EXPORTER: "",
                    OTEL_EXPORTER_OTLP_INSECURE: "",
                    OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
                    OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
                    OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
                    OTEL_EXPORTER_OTLP_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_COMPRESSION: "",
                    OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
                    OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
                    OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
                    OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
                    OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
                    OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
                    OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
                    OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
                    OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
                    OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
                    OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
                    OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
                    OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative",
                    OTEL_SEMCONV_STABILITY_OPT_IN: []
                };

            function v(e, t, n) {
                if (void 0 !== n[e]) {
                    var r = String(n[e]);
                    t[e] = "true" === r.toLowerCase()
                }
            }

            function b(e, t, n, r, i) {
                if (void 0 === r && (r = -1 / 0), void 0 === i && (i = 1 / 0), void 0 !== n[e]) {
                    var o = Number(n[e]);
                    isNaN(o) || (t[e] = o < r ? r : o > i ? i : o)
                }
            }

            function y(e, t, n, r) {
                void 0 === r && (r = o);
                var i = n[e];
                "string" == typeof i && (t[e] = i.split(r).map((function(e) {
                    return e.trim()
                })))
            }
            var _ = {
                ALL: r.n.ALL,
                VERBOSE: r.n.VERBOSE,
                DEBUG: r.n.DEBUG,
                INFO: r.n.INFO,
                WARN: r.n.WARN,
                ERROR: r.n.ERROR,
                NONE: r.n.NONE
            };

            function x(e, t, n) {
                var r = n[e];
                if ("string" == typeof r) {
                    var i = _[r.toUpperCase()];
                    null != i && (t[e] = i)
                }
            }

            function w(e) {
                var t = {};
                for (var n in g) {
                    var r = n;
                    if ("OTEL_LOG_LEVEL" === r) x(r, t, e);
                    else if (a(r)) v(r, t, e);
                    else if (l(r)) b(r, t, e);
                    else if (p(r)) y(r, t, e);
                    else {
                        var i = e[r];
                        null != i && (t[r] = String(i))
                    }
                }
                return t
            }
        },
        9009: (e, t, n) => {
            "use strict";
            n.d(t, {
                T: () => v
            });
            var r, i, o = "[object Object]",
                s = "[object Null]",
                a = "[object Undefined]",
                c = Function.prototype.toString,
                l = c.call(Object),
                u = (r = Object.getPrototypeOf, i = Object, function(e) {
                    return r(i(e))
                }),
                p = Object.prototype,
                d = p.hasOwnProperty,
                f = Symbol ? Symbol.toStringTag : void 0,
                h = p.toString;

            function m(e) {
                if (! function(e) {
                        return null != e && "object" == typeof e
                    }(e) || function(e) {
                        if (null == e) return void 0 === e ? a : s;
                        return f && f in Object(e) ? function(e) {
                            var t = d.call(e, f),
                                n = e[f],
                                r = !1;
                            try {
                                e[f] = void 0, r = !0
                            } catch (e) {}
                            var i = h.call(e);
                            r && (t ? e[f] = n : delete e[f]);
                            return i
                        }(e) : function(e) {
                            return h.call(e)
                        }(e)
                    }(e) !== o) return !1;
                var t = u(e);
                if (null === t) return !0;
                var n = d.call(t, "constructor") && t.constructor;
                return "function" == typeof n && n instanceof n && c.call(n) === l
            }
            var g = 20;

            function v() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                for (var n = e.shift(), r = new WeakMap; e.length > 0;) n = y(n, e.shift(), 0, r);
                return n
            }

            function b(e) {
                return x(e) ? e.slice() : e
            }

            function y(e, t, n, r) {
                var i;
                if (void 0 === n && (n = 0), !(n > g)) {
                    if (n++, S(e) || S(t) || w(t)) i = b(t);
                    else if (x(e)) {
                        if (i = e.slice(), x(t))
                            for (var o = 0, s = t.length; o < s; o++) i.push(b(t[o]));
                        else if (E(t))
                            for (o = 0, s = (a = Object.keys(t)).length; o < s; o++) {
                                i[c = a[o]] = b(t[c])
                            }
                    } else if (E(e))
                        if (E(t)) {
                            if (! function(e, t) {
                                    if (!m(e) || !m(t)) return !1;
                                    return !0
                                }(e, t)) return t;
                            i = Object.assign({}, e);
                            var a;
                            for (o = 0, s = (a = Object.keys(t)).length; o < s; o++) {
                                var c, l = t[c = a[o]];
                                if (S(l)) void 0 === l ? delete i[c] : i[c] = l;
                                else {
                                    var u = i[c],
                                        p = l;
                                    if (_(e, c, r) || _(t, c, r)) delete i[c];
                                    else {
                                        if (E(u) && E(p)) {
                                            var d = r.get(u) || [],
                                                f = r.get(p) || [];
                                            d.push({
                                                obj: e,
                                                key: c
                                            }), f.push({
                                                obj: t,
                                                key: c
                                            }), r.set(u, d), r.set(p, f)
                                        }
                                        i[c] = y(i[c], l, n, r)
                                    }
                                }
                            }
                        } else i = t;
                    return i
                }
            }

            function _(e, t, n) {
                for (var r = n.get(e[t]) || [], i = 0, o = r.length; i < o; i++) {
                    var s = r[i];
                    if (s.key === t && s.obj === e) return !0
                }
                return !1
            }

            function x(e) {
                return Array.isArray(e)
            }

            function w(e) {
                return "function" == typeof e
            }

            function E(e) {
                return !S(e) && !x(e) && !w(e) && "object" == typeof e
            }

            function S(e) {
                return "string" == typeof e || "number" == typeof e || "boolean" == typeof e || void 0 === e || e instanceof Date || e instanceof RegExp || null === e
            }
        },
        9290: (e, t, n) => {
            "use strict";
            var r;
            n.d(t, {
                J: () => r
            }),
            function(e) {
                e.AlwaysOff = "always_off", e.AlwaysOn = "always_on", e.ParentBasedAlwaysOff = "parentbased_always_off", e.ParentBasedAlwaysOn = "parentbased_always_on", e.ParentBasedTraceIdRatio = "parentbased_traceidratio", e.TraceIdRatio = "traceidratio"
            }(r || (r = {}))
        },
        8923: (e, t, n) => {
            "use strict";
            n.d(t, {
                q: () => r
            });
            var r = "1.30.1"
        },
        8690: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SemanticAttributes = void 0, t.SemanticAttributes = {
                HTTP_CONNECTION_STATE: "http.connection.state",
                ERROR_TYPE: "error.type",
                HTTP_REQUEST_BODY_SIZE: "http.request.body.size",
                HTTP_REQUEST_METHOD: "http.request.method",
                HTTP_REQUEST_METHOD_ORIGINAL: "http.request.method_original",
                HTTP_REQUEST_RESEND_COUNT: "http.request.resend_count",
                HTTP_RESPONSE_BODY_SIZE: "http.response.body.size",
                HTTP_RESPONSE_STATUS_CODE: "http.response.status_code",
                HTTP_ROUTE: "http.route",
                NETWORK_PEER_ADDRESS: "network.peer.address",
                NETWORK_PEER_PORT: "network.peer.port",
                NETWORK_PROTOCOL_NAME: "network.protocol.name",
                NETWORK_PROTOCOL_VERSION: "network.protocol.version",
                SERVER_ADDRESS: "server.address",
                SERVER_PORT: "server.port",
                URL_FULL: "url.full",
                URL_PATH: "url.path",
                URL_QUERY: "url.query",
                URL_SCHEME: "url.scheme",
                USER_AGENT_ORIGINAL: "user_agent.original"
            }
        },
        3189: function(e, t, n) {
            "use strict";
            var r = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
                    void 0 === r && (r = n), Object.defineProperty(e, r, {
                        enumerable: !0,
                        get: function() {
                            return t[n]
                        }
                    })
                } : function(e, t, n, r) {
                    void 0 === r && (r = n), e[r] = t[n]
                }),
                i = this && this.__exportStar || function(e, t) {
                    for (var n in e) "default" === n || Object.prototype.hasOwnProperty.call(t, n) || r(t, e, n)
                };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), i(n(1714), t), i(n(4344), t)
        },
        4344: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        },
        1714: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.UndiciInstrumentation = void 0;
            const r = n(7643),
                i = n(7310),
                o = n(9112),
                s = n(8095),
                a = n(918),
                c = n(8690),
                l = n(4205);
            class u extends o.InstrumentationBase {
                constructor(e = {}) {
                    super(a.PACKAGE_NAME, a.PACKAGE_VERSION, e), this._recordFromReq = new WeakMap
                }
                init() {}
                disable() {
                    super.disable(), this._channelSubs.forEach((e => e.unsubscribe())), this._channelSubs.length = 0
                }
                enable() {
                    super.enable(), this._channelSubs = this._channelSubs || [], this._channelSubs.length > 0 || (this.subscribeToChannel("undici:request:create", this.onRequestCreated.bind(this)), this.subscribeToChannel("undici:client:sendHeaders", this.onRequestHeaders.bind(this)), this.subscribeToChannel("undici:request:headers", this.onResponseHeaders.bind(this)), this.subscribeToChannel("undici:request:trailers", this.onDone.bind(this)), this.subscribeToChannel("undici:request:error", this.onError.bind(this)))
                }
                _updateMetricInstruments() {
                    this._httpClientDurationHistogram = this.meter.createHistogram("http.client.request.duration", {
                        description: "Measures the duration of outbound HTTP requests.",
                        unit: "s",
                        valueType: s.ValueType.DOUBLE,
                        advice: {
                            explicitBucketBoundaries: [.005, .01, .025, .05, .075, .1, .25, .5, .75, 1, 2.5, 5, 7.5, 10]
                        }
                    })
                }
                subscribeToChannel(e, t) {
                    var n;
                    const [i, o] = process.version.replace("v", "").split(".").map((e => Number(e)));
                    let s;
                    if (i > 18 || 18 === i && o >= 19) null === (n = r.subscribe) || void 0 === n || n.call(r, e, t), s = () => {
                        var n;
                        return null === (n = r.unsubscribe) || void 0 === n ? void 0 : n.call(r, e, t)
                    };
                    else {
                        const n = r.channel(e);
                        n.subscribe(t), s = () => n.unsubscribe(t)
                    }
                    this._channelSubs.push({
                        name: e,
                        unsubscribe: s
                    })
                }
                onRequestCreated({
                    request: e
                }) {
                    const t = this.getConfig(),
                        n = !1 !== t.enabled;
                    if ((0, o.safeExecuteInTheMiddle)((() => {
                            var r;
                            return !n || "CONNECT" === e.method || (null === (r = t.ignoreRequestHook) || void 0 === r ? void 0 : r.call(t, e))
                        }), (e => e && this._diag.error("caught ignoreRequestHook error: ", e)), !0)) return;
                    const r = (0, l.hrTime)();
                    let a;
                    try {
                        a = new i.URL(e.path, e.origin)
                    } catch (e) {
                        return void this._diag.warn("could not determine url.full:", e)
                    }
                    const u = a.protocol.replace(":", ""),
                        p = this.getRequestMethod(e.method),
                        d = {
                            [c.SemanticAttributes.HTTP_REQUEST_METHOD]: p,
                            [c.SemanticAttributes.HTTP_REQUEST_METHOD_ORIGINAL]: e.method,
                            [c.SemanticAttributes.URL_FULL]: a.toString(),
                            [c.SemanticAttributes.URL_PATH]: a.pathname,
                            [c.SemanticAttributes.URL_QUERY]: a.search,
                            [c.SemanticAttributes.URL_SCHEME]: u
                        },
                        f = a.hostname,
                        h = a.port || {
                            https: "443",
                            http: "80"
                        } [u];
                    let m;
                    if (d[c.SemanticAttributes.SERVER_ADDRESS] = f, h && !isNaN(Number(h)) && (d[c.SemanticAttributes.SERVER_PORT] = Number(h)), Array.isArray(e.headers)) {
                        const t = e.headers.findIndex((e => "user-agent" === e.toLowerCase()));
                        t >= 0 && (m = e.headers[t + 1])
                    } else if ("string" == typeof e.headers) {
                        const t = e.headers.split("\r\n").find((e => e.toLowerCase().startsWith("user-agent")));
                        m = t && t.substring(t.indexOf(":") + 1).trim()
                    }
                    m && (d[c.SemanticAttributes.USER_AGENT_ORIGINAL] = m);
                    const g = (0, o.safeExecuteInTheMiddle)((() => {
                        var n;
                        return null === (n = t.startSpanHook) || void 0 === n ? void 0 : n.call(t, e)
                    }), (e => e && this._diag.error("caught startSpanHook error: ", e)), !0);
                    g && Object.entries(g).forEach((([e, t]) => {
                        d[e] = t
                    }));
                    const v = s.context.active(),
                        b = s.trace.getSpan(v);
                    let y;
                    y = !t.requireParentforSpans || b && s.trace.isSpanContextValid(b.spanContext()) ? this.tracer.startSpan("_OTHER" === p ? "HTTP" : p, {
                        kind: s.SpanKind.CLIENT,
                        attributes: d
                    }, v) : s.trace.wrapSpanContext(s.INVALID_SPAN_CONTEXT), (0, o.safeExecuteInTheMiddle)((() => {
                        var n;
                        return null === (n = t.requestHook) || void 0 === n ? void 0 : n.call(t, y, e)
                    }), (e => e && this._diag.error("caught requestHook error: ", e)), !0);
                    const _ = s.trace.setSpan(s.context.active(), y),
                        x = {};
                    s.propagation.inject(_, x);
                    const w = Object.entries(x);
                    for (let t = 0; t < w.length; t++) {
                        const [n, r] = w[t];
                        "function" == typeof e.addHeader ? e.addHeader(n, r) : "string" == typeof e.headers ? e.headers += `${n}: ${r}\r\n` : Array.isArray(e.headers) && e.headers.push(n, r)
                    }
                    this._recordFromReq.set(e, {
                        span: y,
                        attributes: d,
                        startTime: r
                    })
                }
                onRequestHeaders({
                    request: e,
                    socket: t
                }) {
                    var n;
                    const r = this._recordFromReq.get(e);
                    if (!r) return;
                    const i = this.getConfig(),
                        {
                            span: o
                        } = r,
                        {
                            remoteAddress: s,
                            remotePort: a
                        } = t,
                        l = {
                            [c.SemanticAttributes.NETWORK_PEER_ADDRESS]: s,
                            [c.SemanticAttributes.NETWORK_PEER_PORT]: a
                        };
                    if (null === (n = i.headersToSpanAttributes) || void 0 === n ? void 0 : n.requestHeaders) {
                        const t = new Set(i.headersToSpanAttributes.requestHeaders.map((e => e.toLowerCase()))),
                            n = Array.isArray(e.headers) ? e.headers : e.headers.split("\r\n");
                        n.forEach(((e, r) => {
                            const i = e.indexOf(":"),
                                o = -1 !== i,
                                s = (o ? e.substring(0, i) : e).toLowerCase(),
                                a = o ? e.substring(i + 1) : n[r + 1];
                            t.has(s) && (l[`http.request.header.${s}`] = a.trim())
                        }))
                    }
                    o.setAttributes(l)
                }
                onResponseHeaders({
                    request: e,
                    response: t
                }) {
                    var n, r;
                    const i = this._recordFromReq.get(e);
                    if (!i) return;
                    const {
                        span: a,
                        attributes: l
                    } = i, u = {
                        [c.SemanticAttributes.HTTP_RESPONSE_STATUS_CODE]: t.statusCode
                    }, p = this.getConfig();
                    (0, o.safeExecuteInTheMiddle)((() => {
                        var n;
                        return null === (n = p.responseHook) || void 0 === n ? void 0 : n.call(p, a, {
                            request: e,
                            response: t
                        })
                    }), (e => e && this._diag.error("caught responseHook error: ", e)), !0);
                    const d = new Set;
                    (null === (n = p.headersToSpanAttributes) || void 0 === n ? void 0 : n.responseHeaders) && (null === (r = p.headersToSpanAttributes) || void 0 === r || r.responseHeaders.forEach((e => d.add(e.toLowerCase()))));
                    for (let e = 0; e < t.headers.length; e += 2) {
                        const n = t.headers[e].toString().toLowerCase(),
                            r = t.headers[e + 1];
                        if (d.has(n) && (u[`http.response.header.${n}`] = r.toString()), "content-length" === n) {
                            const e = Number(r.toString());
                            isNaN(e) || (u["http.response.header.content-length"] = e)
                        }
                    }
                    a.setAttributes(u), a.setStatus({
                        code: t.statusCode >= 400 ? s.SpanStatusCode.ERROR : s.SpanStatusCode.UNSET
                    }), i.attributes = Object.assign(l, u)
                }
                onDone({
                    request: e
                }) {
                    const t = this._recordFromReq.get(e);
                    if (!t) return;
                    const {
                        span: n,
                        attributes: r,
                        startTime: i
                    } = t;
                    n.end(), this._recordFromReq.delete(e), this.recordRequestDuration(r, i)
                }
                onError({
                    request: e,
                    error: t
                }) {
                    const n = this._recordFromReq.get(e);
                    if (!n) return;
                    const {
                        span: r,
                        attributes: i,
                        startTime: o
                    } = n;
                    r.recordException(t), r.setStatus({
                        code: s.SpanStatusCode.ERROR,
                        message: t.message
                    }), r.end(), this._recordFromReq.delete(e), i[c.SemanticAttributes.ERROR_TYPE] = t.message, this.recordRequestDuration(i, o)
                }
                recordRequestDuration(e, t) {
                    const n = {};
                    [c.SemanticAttributes.HTTP_RESPONSE_STATUS_CODE, c.SemanticAttributes.HTTP_REQUEST_METHOD, c.SemanticAttributes.SERVER_ADDRESS, c.SemanticAttributes.SERVER_PORT, c.SemanticAttributes.URL_SCHEME, c.SemanticAttributes.ERROR_TYPE].forEach((t => {
                        t in e && (n[t] = e[t])
                    }));
                    const r = (0, l.hrTimeToMilliseconds)((0, l.hrTimeDuration)(t, (0, l.hrTime)())) / 1e3;
                    this._httpClientDurationHistogram.record(r, n)
                }
                getRequestMethod(e) {
                    return e.toUpperCase() in {
                        CONNECT: !0,
                        OPTIONS: !0,
                        HEAD: !0,
                        GET: !0,
                        POST: !0,
                        PUT: !0,
                        PATCH: !0,
                        DELETE: !0,
                        TRACE: !0
                    } ? e.toUpperCase() : "_OTHER"
                }
            }
            t.UndiciInstrumentation = u
        },
        918: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.PACKAGE_NAME = t.PACKAGE_VERSION = void 0, t.PACKAGE_VERSION = "0.10.1", t.PACKAGE_NAME = "@opentelemetry/instrumentation-undici"
        },
        9448: (e, t, n) => {
            "use strict";
            n.d(t, {
                X: () => s
            });
            var r = n(2210),
                i = n(1868),
                o = n(3067);

            function s(e) {
                var t, n, s = e.tracerProvider || r.g.getTracerProvider(),
                    a = e.meterProvider || i.q.getMeterProvider(),
                    c = e.loggerProvider || o.TD.getLoggerProvider(),
                    l = null !== (n = null === (t = e.instrumentations) || void 0 === t ? void 0 : t.flat()) && void 0 !== n ? n : [];
                return function(e, t, n, r) {
                    for (var i = 0, o = e.length; i < o; i++) {
                        var s = e[i];
                        t && s.setTracerProvider(t), n && s.setMeterProvider(n), r && s.setLoggerProvider && s.setLoggerProvider(r), s.getConfig().enabled || s.enable()
                    }
                }(l, s, a, c),
                function() {
                    ! function(e) {
                        e.forEach((function(e) {
                            return e.disable()
                        }))
                    }(l)
                }
            }
        },
        9112: (e, t, n) => {
            "use strict";
            n.r(t), n.d(t, {
                InstrumentationBase: () => i.w,
                InstrumentationNodeModuleDefinition: () => o,
                InstrumentationNodeModuleFile: () => a,
                isWrapped: () => c.UW,
                registerInstrumentations: () => r.X,
                safeExecuteInTheMiddle: () => c._W,
                safeExecuteInTheMiddleAsync: () => c.d0
            });
            var r = n(9448),
                i = n(1107),
                o = function(e, t, n, r, i) {
                    this.name = e, this.supportedVersions = t, this.patch = n, this.unpatch = r, this.files = i || []
                },
                s = n(1017),
                a = function(e, t, n, r) {
                    this.supportedVersions = t, this.patch = n, this.unpatch = r, this.name = (0, s.normalize)(e)
                },
                c = n(6789)
        },
        1107: (e, t, n) => {
            "use strict";
            n.d(t, {
                w: () => C
            });
            var r = n(1017),
                i = n(3837),
                o = n(1249),
                s = n(6372),
                a = n(928),
                c = n(2210),
                l = n(1868),
                u = n(3067),
                p = function() {
                    return p = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                        return e
                    }, p.apply(this, arguments)
                },
                d = function() {
                    function e(e, t, n) {
                        this.instrumentationName = e, this.instrumentationVersion = t, this._config = {}, this._wrap = s.wrap, this._unwrap = s.unwrap, this._massWrap = s.massWrap, this._massUnwrap = s.massUnwrap, this.setConfig(n), this._diag = a.K.createComponentLogger({
                            namespace: e
                        }), this._tracer = c.g.getTracer(e, t), this._meter = l.q.getMeter(e, t), this._logger = u.TD.getLogger(e, t), this._updateMetricInstruments()
                    }
                    return Object.defineProperty(e.prototype, "meter", {
                        get: function() {
                            return this._meter
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.setMeterProvider = function(e) {
                        this._meter = e.getMeter(this.instrumentationName, this.instrumentationVersion), this._updateMetricInstruments()
                    }, Object.defineProperty(e.prototype, "logger", {
                        get: function() {
                            return this._logger
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.setLoggerProvider = function(e) {
                        this._logger = e.getLogger(this.instrumentationName, this.instrumentationVersion)
                    }, e.prototype.getModuleDefinitions = function() {
                        var e, t = null !== (e = this.init()) && void 0 !== e ? e : [];
                        return Array.isArray(t) ? t : [t]
                    }, e.prototype._updateMetricInstruments = function() {}, e.prototype.getConfig = function() {
                        return this._config
                    }, e.prototype.setConfig = function(e) {
                        this._config = p({
                            enabled: !0
                        }, e)
                    }, e.prototype.setTracerProvider = function(e) {
                        this._tracer = e.getTracer(this.instrumentationName, this.instrumentationVersion)
                    }, Object.defineProperty(e.prototype, "tracer", {
                        get: function() {
                            return this._tracer
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype._runSpanCustomizationHook = function(e, t, n, r) {
                        if (e) try {
                            e(n, r)
                        } catch (e) {
                            this._diag.error("Error running span customization hook due to exception in handler", {
                                triggerName: t
                            }, e)
                        }
                    }, e
                }(),
                f = n(2932),
                h = function(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                },
                m = function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, i, o = n.call(e),
                        s = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = o.next()).done;) s.push(r.value)
                    } catch (e) {
                        i = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = o.return) && n.call(o)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    return s
                },
                g = function(e, t, n) {
                    if (n || 2 === arguments.length)
                        for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
                    return e.concat(r || Array.prototype.slice.call(t))
                },
                v = "/",
                b = function() {
                    this.hooks = [], this.children = new Map
                },
                y = function() {
                    function e() {
                        this._trie = new b, this._counter = 0
                    }
                    return e.prototype.insert = function(e) {
                        var t, n, r = this._trie;
                        try {
                            for (var i = h(e.moduleName.split(v)), o = i.next(); !o.done; o = i.next()) {
                                var s = o.value,
                                    a = r.children.get(s);
                                a || (a = new b, r.children.set(s, a)), r = a
                            }
                        } catch (e) {
                            t = {
                                error: e
                            }
                        } finally {
                            try {
                                o && !o.done && (n = i.return) && n.call(i)
                            } finally {
                                if (t) throw t.error
                            }
                        }
                        r.hooks.push({
                            hook: e,
                            insertedId: this._counter++
                        })
                    }, e.prototype.search = function(e, t) {
                        var n, r, i = void 0 === t ? {} : t,
                            o = i.maintainInsertionOrder,
                            s = i.fullOnly,
                            a = this._trie,
                            c = [],
                            l = !0;
                        try {
                            for (var u = h(e.split(v)), p = u.next(); !p.done; p = u.next()) {
                                var d = p.value,
                                    f = a.children.get(d);
                                if (!f) {
                                    l = !1;
                                    break
                                }
                                s || c.push.apply(c, g([], m(f.hooks), !1)), a = f
                            }
                        } catch (e) {
                            n = {
                                error: e
                            }
                        } finally {
                            try {
                                p && !p.done && (r = u.return) && r.call(u)
                            } finally {
                                if (n) throw n.error
                            }
                        }
                        return s && l && c.push.apply(c, g([], m(a.hooks), !1)), 0 === c.length ? [] : 1 === c.length ? [c[0].hook] : (o && c.sort((function(e, t) {
                            return e.insertedId - t.insertedId
                        })), c.map((function(e) {
                            return e.hook
                        })))
                    }, e
                }(),
                _ = function(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                },
                x = ["afterEach", "after", "beforeEach", "before", "describe", "it"].every((function(e) {
                    return "function" == typeof global[e]
                })),
                w = function() {
                    function e() {
                        this._moduleNameTrie = new y, this._initialize()
                    }
                    return e.prototype._initialize = function() {
                        var e = this;
                        new f.Hook(null, {
                            internals: !0
                        }, (function(t, n, i) {
                            var o, s, a, c = (a = n, r.sep !== v ? a.split(r.sep).join(v) : a),
                                l = e._moduleNameTrie.search(c, {
                                    maintainInsertionOrder: !0,
                                    fullOnly: void 0 === i
                                });
                            try {
                                for (var u = _(l), p = u.next(); !p.done; p = u.next()) {
                                    t = (0, p.value.onRequire)(t, n, i)
                                }
                            } catch (e) {
                                o = {
                                    error: e
                                }
                            } finally {
                                try {
                                    p && !p.done && (s = u.return) && s.call(u)
                                } finally {
                                    if (o) throw o.error
                                }
                            }
                            return t
                        }))
                    }, e.prototype.register = function(e, t) {
                        var n = {
                            moduleName: e,
                            onRequire: t
                        };
                        return this._moduleNameTrie.insert(n), n
                    }, e.getInstance = function() {
                        var t;
                        return x ? new e : this._instance = null !== (t = this._instance) && void 0 !== t ? t : new e
                    }, e
                }();
            var E, S = n(5e3),
                T = n(7147),
                O = n(6789),
                k = (E = function(e, t) {
                    return E = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }, E(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    E(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                A = function(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                },
                C = function(e) {
                    function t(t, n, r) {
                        var o = e.call(this, t, n, r) || this;
                        o._hooks = [], o._requireInTheMiddleSingleton = w.getInstance(), o._enabled = !1, o._wrap = function(e, t, n) {
                            if ((0, O.UW)(e[t]) && o._unwrap(e, t), i.types.isProxy(e)) {
                                var r = (0, s.wrap)(Object.assign({}, e), t, n);
                                return Object.defineProperty(e, t, {
                                    value: r
                                }), r
                            }
                            return (0, s.wrap)(e, t, n)
                        }, o._unwrap = function(e, t) {
                            return i.types.isProxy(e) ? Object.defineProperty(e, t, {
                                value: e[t]
                            }) : (0, s.unwrap)(e, t)
                        }, o._massWrap = function(e, t, n) {
                            e ? (Array.isArray(e) || (e = [e]), t && Array.isArray(t) ? e.forEach((function(e) {
                                t.forEach((function(t) {
                                    o._wrap(e, t, n)
                                }))
                            })) : a.K.error("must provide one or more functions to wrap on modules")) : a.K.error("must provide one or more modules to patch")
                        }, o._massUnwrap = function(e, t) {
                            e
