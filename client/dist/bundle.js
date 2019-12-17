/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(9)();
}


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(12)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(13);
} else {}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {// @flow


var key = '__global_unique_id__';

module.exports = function() {
  return global[key] = (global[key] || 0) + 1;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(5);
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
    if (ReactIs.isMemo(component)) {
        return MEMO_STATICS;
    }
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(10);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.10.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):
60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.fundamental"):60117,w=b?Symbol.for("react.responder"):60118,x=b?Symbol.for("react.scope"):60119;function y(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case t:case r:case d:return u}}}function z(a){return y(a)===m}
exports.typeOf=y;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===v||a.$$typeof===w||a.$$typeof===x)};exports.isAsyncMode=function(a){return z(a)||y(a)===l};exports.isConcurrentMode=z;exports.isContextConsumer=function(a){return y(a)===k};exports.isContextProvider=function(a){return y(a)===h};
exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return y(a)===n};exports.isFragment=function(a){return y(a)===e};exports.isLazy=function(a){return y(a)===t};exports.isMemo=function(a){return y(a)===r};exports.isPortal=function(a){return y(a)===d};exports.isProfiler=function(a){return y(a)===g};exports.isStrictMode=function(a){return y(a)===f};exports.isSuspense=function(a){return y(a)===p};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(0);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);

// EXTERNAL MODULE: external "ReactDOM"
var external_ReactDOM_ = __webpack_require__(6);

// CONCATENATED MODULE: ./src/components/home_page.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var home_page_HomePage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HomePage, _React$Component);

  function HomePage() {
    _classCallCheck(this, HomePage);

    return _possibleConstructorReturn(this, _getPrototypeOf(HomePage).apply(this, arguments));
  }

  _createClass(HomePage, [{
    key: "render",
    value: function render() {
      return external_React_["createElement"]("div", null, "Welcome to the best event booking site!");
    }
  }]);

  return HomePage;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// CONCATENATED MODULE: ./node_modules/resolve-pathname/esm/resolve-pathname.js
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ var resolve_pathname = (resolvePathname);

// CONCATENATED MODULE: ./node_modules/value-equal/esm/value-equal.js
function value_equal_valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true;

  // Otherwise, if either of them == null they are not equal.
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every(function(item, index) {
        return valueEqual(item, b[index]);
      })
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = value_equal_valueOf(a);
    var bValue = value_equal_valueOf(b);

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ var value_equal = (valueEqual);

// CONCATENATED MODULE: ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js
var isProduction = "production" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
}

/* harmony default export */ var tiny_invariant_esm = (invariant);

// CONCATENATED MODULE: ./node_modules/history/esm/history.js






function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolve_pathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && value_equal(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
     false ? undefined : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           false ? undefined : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         false ? undefined : void 0;
        setState();
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
     false ? undefined : void 0;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}



// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inheritsLoose.js
var inheritsLoose = __webpack_require__(3);
var inheritsLoose_default = /*#__PURE__*/__webpack_require__.n(inheritsLoose);

// EXTERNAL MODULE: ./node_modules/gud/index.js
var gud = __webpack_require__(7);
var gud_default = /*#__PURE__*/__webpack_require__.n(gud);

// CONCATENATED MODULE: ./node_modules/mini-create-react-context/dist/esm/index.js






var MAX_SIGNED_31_BIT_INT = 1073741823;

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;

  var contextProp = '__create-react-context-' + gud_default()() + '__';

  var Provider =
  /*#__PURE__*/
  function (_Component) {
    inheritsLoose_default()(Provider, _Component);

    function Provider() {
      var _this;

      _this = _Component.apply(this, arguments) || this;
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }

    var _proto = Provider.prototype;

    _proto.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0;
        } else {
          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

          if (false) {}

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    _proto.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(external_React_["Component"]);

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = prop_types_default.a.object.isRequired, _Provider$childContex);

  var Consumer =
  /*#__PURE__*/
  function (_Component2) {
    inheritsLoose_default()(Consumer, _Component2);

    function Consumer() {
      var _this2;

      _this2 = _Component2.apply(this, arguments) || this;
      _this2.state = {
        value: _this2.getValue()
      };

      _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;

        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };

      return _this2;
    }

    var _proto2 = Consumer.prototype;

    _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }

      var observedBits = this.props.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    _proto2.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    _proto2.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(external_React_["Component"]);

  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = prop_types_default.a.object, _Consumer$contextType);
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

var esm_index = external_React_default.a.createContext || createReactContext;

/* harmony default export */ var esm = (esm_index);

// EXTERNAL MODULE: ./node_modules/path-to-regexp/index.js
var path_to_regexp = __webpack_require__(4);
var path_to_regexp_default = /*#__PURE__*/__webpack_require__.n(path_to_regexp);

// EXTERNAL MODULE: ./node_modules/react-is/index.js
var react_is = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(8);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// CONCATENATED MODULE: ./node_modules/react-router/esm/react-router.js













// TODO: Replace with React.createContext once we can assume React 16+

var react_router_createNamedContext = function createNamedContext(name) {
  var context = esm();
  context.displayName = name;
  return context;
};

var react_router_context =
/*#__PURE__*/
react_router_createNamedContext("Router");

/**
 * The public API for putting history on context.
 */

var react_router_Router =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Router, _React$Component);

  Router.computeRootMatch = function computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  function Router(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      location: props.history.location
    }; // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.

    _this._isMounted = false;
    _this._pendingLocation = null;

    if (!props.staticContext) {
      _this.unlisten = props.history.listen(function (location) {
        if (_this._isMounted) {
          _this.setState({
            location: location
          });
        } else {
          _this._pendingLocation = location;
        }
      });
    }

    return _this;
  }

  var _proto = Router.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  };

  _proto.render = function render() {
    return external_React_default.a.createElement(react_router_context.Provider, {
      children: this.props.children || null,
      value: {
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }
    });
  };

  return Router;
}(external_React_default.a.Component);

if (false) {}

/**
 * The public API for a <Router> that stores location in memory.
 */

var react_router_MemoryRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createMemoryHistory(_this.props);
    return _this;
  }

  var _proto = MemoryRouter.prototype;

  _proto.render = function render() {
    return external_React_default.a.createElement(react_router_Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return MemoryRouter;
}(external_React_default.a.Component);

if (false) {}

var react_router_Lifecycle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Lifecycle, _React$Component);

  function Lifecycle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Lifecycle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  };

  _proto.render = function render() {
    return null;
  };

  return Lifecycle;
}(external_React_default.a.Component);

/**
 * The public API for prompting the user before navigating away from a screen.
 */

function Prompt(_ref) {
  var message = _ref.message,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
  return external_React_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    if (!when || context.staticContext) return null;
    var method = context.history.block;
    return external_React_default.a.createElement(react_router_Lifecycle, {
      onMount: function onMount(self) {
        self.release = method(message);
      },
      onUpdate: function onUpdate(self, prevProps) {
        if (prevProps.message !== message) {
          self.release();
          self.release = method(message);
        }
      },
      onUnmount: function onUnmount(self) {
        self.release();
      },
      message: message
    });
  });
}

if (false) { var messageType; }

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = path_to_regexp_default.a.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}
/**
 * Public API for generating a URL pathname from a path and parameters.
 */


function generatePath(path, params) {
  if (path === void 0) {
    path = "/";
  }

  if (params === void 0) {
    params = {};
  }

  return path === "/" ? path : compilePath(path)(params, {
    pretty: true
  });
}

/**
 * The public API for navigating programmatically with a component.
 */

function Redirect(_ref) {
  var computedMatch = _ref.computedMatch,
      to = _ref.to,
      _ref$push = _ref.push,
      push = _ref$push === void 0 ? false : _ref$push;
  return external_React_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    var history = context.history,
        staticContext = context.staticContext;
    var method = push ? history.push : history.replace;
    var location = createLocation(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : _extends({}, to, {
      pathname: generatePath(to.pathname, computedMatch.params)
    }) : to); // When rendering in a static context,
    // set the new location immediately.

    if (staticContext) {
      method(location);
      return null;
    }

    return external_React_default.a.createElement(react_router_Lifecycle, {
      onMount: function onMount() {
        method(location);
      },
      onUpdate: function onUpdate(self, prevProps) {
        var prevLocation = createLocation(prevProps.to);

        if (!locationsAreEqual(prevLocation, _extends({}, location, {
          key: prevLocation.key
        }))) {
          method(location);
        }
      },
      to: to
    });
  });
}

if (false) {}

var cache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;

function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = path_to_regexp_default()(path, keys, options);
  var result = {
    regexp: regexp,
    keys: keys
  };

  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }

  return result;
}
/**
 * Public API for matching a URL pathname to a path.
 */


function matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }

  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function (matched, path) {
    if (!path && path !== "") return null;
    if (matched) return matched;

    var _compilePath = compilePath$1(path, {
      end: exact,
      strict: strict,
      sensitive: sensitive
    }),
        regexp = _compilePath.regexp,
        keys = _compilePath.keys;

    var match = regexp.exec(pathname);
    if (!match) return null;
    var url = match[0],
        values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path: path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact: isExact,
      // whether or not we matched exactly
      params: keys.reduce(function (memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

function isEmptyChildren(children) {
  return external_React_default.a.Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
  var value = children(props);
   false ? undefined : void 0;
  return value || null;
}
/**
 * The public API for matching a single path and rendering.
 */


var react_router_Route =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Route, _React$Component);

  function Route() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Route.prototype;

  _proto.render = function render() {
    var _this = this;

    return external_React_default.a.createElement(react_router_context.Consumer, null, function (context$1) {
      !context$1 ?  false ? undefined : tiny_invariant_esm(false) : void 0;
      var location = _this.props.location || context$1.location;
      var match = _this.props.computedMatch ? _this.props.computedMatch // <Switch> already computed the match for us
      : _this.props.path ? matchPath(location.pathname, _this.props) : context$1.match;

      var props = _extends({}, context$1, {
        location: location,
        match: match
      });

      var _this$props = _this.props,
          children = _this$props.children,
          component = _this$props.component,
          render = _this$props.render; // Preact uses an empty array as children by
      // default, so use null if that's the case.

      if (Array.isArray(children) && children.length === 0) {
        children = null;
      }

      return external_React_default.a.createElement(react_router_context.Provider, {
        value: props
      }, props.match ? children ? typeof children === "function" ?  false ? undefined : children(props) : children : component ? external_React_default.a.createElement(component, props) : render ? render(props) : null : typeof children === "function" ?  false ? undefined : children(props) : null);
    });
  };

  return Route;
}(external_React_default.a.Component);

if (false) {}

function react_router_addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;
  return _extends({}, location, {
    pathname: react_router_addLeadingSlash(basename) + location.pathname
  });
}

function react_router_stripBasename(basename, location) {
  if (!basename) return location;
  var base = react_router_addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}

function createURL(location) {
  return typeof location === "string" ? location : createPath(location);
}

function staticHandler(methodName) {
  return function () {
      false ? undefined : tiny_invariant_esm(false) ;
  };
}

function noop() {}
/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */


var react_router_StaticRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StaticRouter, _React$Component);

  function StaticRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handlePush = function (location) {
      return _this.navigateTo(location, "PUSH");
    };

    _this.handleReplace = function (location) {
      return _this.navigateTo(location, "REPLACE");
    };

    _this.handleListen = function () {
      return noop;
    };

    _this.handleBlock = function () {
      return noop;
    };

    return _this;
  }

  var _proto = StaticRouter.prototype;

  _proto.navigateTo = function navigateTo(location, action) {
    var _this$props = this.props,
        _this$props$basename = _this$props.basename,
        basename = _this$props$basename === void 0 ? "" : _this$props$basename,
        _this$props$context = _this$props.context,
        context = _this$props$context === void 0 ? {} : _this$props$context;
    context.action = action;
    context.location = addBasename(basename, createLocation(location));
    context.url = createURL(context.location);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$basename = _this$props2.basename,
        basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
        _this$props2$context = _this$props2.context,
        context = _this$props2$context === void 0 ? {} : _this$props2$context,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? "/" : _this$props2$location,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["basename", "context", "location"]);

    var history = {
      createHref: function createHref(path) {
        return react_router_addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: react_router_stripBasename(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return external_React_default.a.createElement(react_router_Router, _extends({}, rest, {
      history: history,
      staticContext: context
    }));
  };

  return StaticRouter;
}(external_React_default.a.Component);

if (false) {}

/**
 * The public API for rendering the first <Route> that matches.
 */

var react_router_Switch =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Switch, _React$Component);

  function Switch() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Switch.prototype;

  _proto.render = function render() {
    var _this = this;

    return external_React_default.a.createElement(react_router_context.Consumer, null, function (context) {
      !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
      var location = _this.props.location || context.location;
      var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
      // here because toArray adds keys to all child elements and we do not want
      // to trigger an unmount/remount for two <Route>s that render the same
      // component at different URLs.

      external_React_default.a.Children.forEach(_this.props.children, function (child) {
        if (match == null && external_React_default.a.isValidElement(child)) {
          element = child;
          var path = child.props.path || child.props.from;
          match = path ? matchPath(location.pathname, _extends({}, child.props, {
            path: path
          })) : context.match;
        }
      });
      return match ? external_React_default.a.cloneElement(element, {
        location: location,
        computedMatch: match
      }) : null;
    });
  };

  return Switch;
}(external_React_default.a.Component);

if (false) {}

/**
 * A public higher-order component to access the imperative API
 */

function withRouter(Component) {
  var displayName = "withRouter(" + (Component.displayName || Component.name) + ")";

  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutPropertiesLoose(props, ["wrappedComponentRef"]);

    return external_React_default.a.createElement(react_router_context.Consumer, null, function (context) {
      !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
      return external_React_default.a.createElement(Component, _extends({}, remainingProps, context, {
        ref: wrappedComponentRef
      }));
    });
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  if (false) {}

  return hoist_non_react_statics_cjs_default()(C, Component);
}

var useContext = external_React_default.a.useContext;
function useHistory() {
  if (false) {}

  return useContext(react_router_context).history;
}
function useLocation() {
  if (false) {}

  return useContext(react_router_context).location;
}
function useParams() {
  if (false) {}

  var match = useContext(react_router_context).match;
  return match ? match.params : {};
}
function useRouteMatch(path) {
  if (false) {}

  return path ? matchPath(useLocation().pathname, path) : useContext(react_router_context).match;
}

if (false) { var secondaryBuildName, initialBuildName, buildNames, react_router_key, global; }


//# sourceMappingURL=react-router.js.map

// CONCATENATED MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js











/**
 * The public API for a <Router> that uses HTML5 history.
 */

var react_router_dom_BrowserRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createBrowserHistory(_this.props);
    return _this;
  }

  var _proto = BrowserRouter.prototype;

  _proto.render = function render() {
    return external_React_default.a.createElement(react_router_Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return BrowserRouter;
}(external_React_default.a.Component);

if (false) {}

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var react_router_dom_HashRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(HashRouter, _React$Component);

  function HashRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createHashHistory(_this.props);
    return _this;
  }

  var _proto = HashRouter.prototype;

  _proto.render = function render() {
    return external_React_default.a.createElement(react_router_Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return HashRouter;
}(external_React_default.a.Component);

if (false) {}

var resolveToLocation = function resolveToLocation(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};
var react_router_dom_normalizeToLocation = function normalizeToLocation(to, currentLocation) {
  return typeof to === "string" ? createLocation(to, null, null, currentLocation) : to;
};

var forwardRefShim = function forwardRefShim(C) {
  return C;
};

var forwardRef = external_React_default.a.forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var LinkAnchor = forwardRef(function (_ref, forwardedRef) {
  var innerRef = _ref.innerRef,
      navigate = _ref.navigate,
      _onClick = _ref.onClick,
      rest = _objectWithoutPropertiesLoose(_ref, ["innerRef", "navigate", "onClick"]);

  var target = rest.target;
  return external_React_default.a.createElement("a", _extends({}, rest, {
    ref: forwardedRef || innerRef,
    onClick: function onClick(event) {
      try {
        if (_onClick) _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && ( // ignore everything but left clicks
      !target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          navigate();
        }
    }
  }));
});

if (false) {}
/**
 * The public API for rendering a history-aware <a>.
 */


var Link = forwardRef(function (_ref2, forwardedRef) {
  var _ref2$component = _ref2.component,
      component = _ref2$component === void 0 ? LinkAnchor : _ref2$component,
      replace = _ref2.replace,
      to = _ref2.to,
      innerRef = _ref2.innerRef,
      rest = _objectWithoutPropertiesLoose(_ref2, ["component", "replace", "to", "innerRef"]);

  return external_React_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    var history = context.history;
    var location = react_router_dom_normalizeToLocation(resolveToLocation(to, context.location), context.location);
    var href = location ? history.createHref(location) : "";

    var props = _extends({}, rest, {
      href: href,
      navigate: function navigate() {
        var location = resolveToLocation(to, context.location);
        var method = replace ? history.replace : history.push;
        method(location);
      }
    }); // React 15 compat


    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      // TODO: deprecate
      props.innerRef = innerRef;
    }

    return external_React_default.a.createElement(component, props);
  });
});

if (false) { var refType, toType; }

var forwardRefShim$1 = function forwardRefShim(C) {
  return C;
};

var forwardRef$1 = external_React_default.a.forwardRef;

if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}

function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }

  return classnames.filter(function (i) {
    return i;
  }).join(" ");
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


var NavLink = forwardRef$1(function (_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"],
      ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
      activeStyle = _ref.activeStyle,
      classNameProp = _ref.className,
      exact = _ref.exact,
      isActiveProp = _ref.isActive,
      locationProp = _ref.location,
      strict = _ref.strict,
      styleProp = _ref.style,
      to = _ref.to,
      innerRef = _ref.innerRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "strict", "style", "to", "innerRef"]);

  return external_React_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    var currentLocation = locationProp || context.location;
    var toLocation = react_router_dom_normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact: exact,
      strict: strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
    var style = isActive ? _extends({}, styleProp, {}, activeStyle) : styleProp;

    var props = _extends({
      "aria-current": isActive && ariaCurrent || null,
      className: className,
      style: style,
      to: toLocation
    }, rest); // React 15 compat


    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      // TODO: deprecate
      props.innerRef = innerRef;
    }

    return external_React_default.a.createElement(Link, props);
  });
});

if (false) { var ariaCurrentType; }


//# sourceMappingURL=react-router-dom.js.map

// CONCATENATED MODULE: ./src/components/event_list_item.js
function event_list_item_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { event_list_item_typeof = function _typeof(obj) { return typeof obj; }; } else { event_list_item_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return event_list_item_typeof(obj); }

function event_list_item_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function event_list_item_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function event_list_item_createClass(Constructor, protoProps, staticProps) { if (protoProps) event_list_item_defineProperties(Constructor.prototype, protoProps); if (staticProps) event_list_item_defineProperties(Constructor, staticProps); return Constructor; }

function event_list_item_possibleConstructorReturn(self, call) { if (call && (event_list_item_typeof(call) === "object" || typeof call === "function")) { return call; } return event_list_item_assertThisInitialized(self); }

function event_list_item_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function event_list_item_getPrototypeOf(o) { event_list_item_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return event_list_item_getPrototypeOf(o); }

function event_list_item_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) event_list_item_setPrototypeOf(subClass, superClass); }

function event_list_item_setPrototypeOf(o, p) { event_list_item_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return event_list_item_setPrototypeOf(o, p); }



var event_list_item_EventListItem =
/*#__PURE__*/
function (_React$Component) {
  event_list_item_inherits(EventListItem, _React$Component);

  function EventListItem() {
    event_list_item_classCallCheck(this, EventListItem);

    return event_list_item_possibleConstructorReturn(this, event_list_item_getPrototypeOf(EventListItem).apply(this, arguments));
  }

  event_list_item_createClass(EventListItem, [{
    key: "render",
    value: function render() {
      var start = new Date(this.props.event.StartDate * 1000);
      var end = new Date(this.props.event.EndDate * 1000);
      return external_React_["createElement"]("tr", null, external_React_["createElement"]("td", null, this.props.event.Name), external_React_["createElement"]("td", null, this.props.event.Location.Name), external_React_["createElement"]("td", null, start.toLocaleDateString()), external_React_["createElement"]("td", null, end.toLocaleDateString()), external_React_["createElement"]("td", null, external_React_["createElement"](Link, {
        to: "/events/".concat(this.props.event.ID, "/book")
      }, "Book now!")));
    }
  }]);

  return EventListItem;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./src/components/event_list.js
function event_list_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { event_list_typeof = function _typeof(obj) { return typeof obj; }; } else { event_list_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return event_list_typeof(obj); }

function event_list_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function event_list_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function event_list_createClass(Constructor, protoProps, staticProps) { if (protoProps) event_list_defineProperties(Constructor.prototype, protoProps); if (staticProps) event_list_defineProperties(Constructor, staticProps); return Constructor; }

function event_list_possibleConstructorReturn(self, call) { if (call && (event_list_typeof(call) === "object" || typeof call === "function")) { return call; } return event_list_assertThisInitialized(self); }

function event_list_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function event_list_getPrototypeOf(o) { event_list_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return event_list_getPrototypeOf(o); }

function event_list_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) event_list_setPrototypeOf(subClass, superClass); }

function event_list_setPrototypeOf(o, p) { event_list_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return event_list_setPrototypeOf(o, p); }



var event_list_EventList =
/*#__PURE__*/
function (_React$Component) {
  event_list_inherits(EventList, _React$Component);

  function EventList() {
    event_list_classCallCheck(this, EventList);

    return event_list_possibleConstructorReturn(this, event_list_getPrototypeOf(EventList).apply(this, arguments));
  }

  event_list_createClass(EventList, [{
    key: "render",
    value: function render() {
      var items = this.props.events.map(function (e) {
        return external_React_["createElement"](event_list_item_EventListItem, {
          event: e
        });
      });
      return external_React_["createElement"]("table", {
        className: "table"
      }, external_React_["createElement"]("thead", null, external_React_["createElement"]("tr", null, external_React_["createElement"]("th", null, "Event"), external_React_["createElement"]("th", null, "Where"), external_React_["createElement"]("th", null, "When (start/end)"), external_React_["createElement"]("th", null, "Actions"))), external_React_["createElement"]("tbody", null, items));
    }
  }]);

  return EventList;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./src/components/event_list_container.js
function event_list_container_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { event_list_container_typeof = function _typeof(obj) { return typeof obj; }; } else { event_list_container_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return event_list_container_typeof(obj); }

function event_list_container_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function event_list_container_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function event_list_container_createClass(Constructor, protoProps, staticProps) { if (protoProps) event_list_container_defineProperties(Constructor.prototype, protoProps); if (staticProps) event_list_container_defineProperties(Constructor, staticProps); return Constructor; }

function event_list_container_possibleConstructorReturn(self, call) { if (call && (event_list_container_typeof(call) === "object" || typeof call === "function")) { return call; } return event_list_container_assertThisInitialized(self); }

function event_list_container_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function event_list_container_getPrototypeOf(o) { event_list_container_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return event_list_container_getPrototypeOf(o); }

function event_list_container_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) event_list_container_setPrototypeOf(subClass, superClass); }

function event_list_container_setPrototypeOf(o, p) { event_list_container_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return event_list_container_setPrototypeOf(o, p); }



var event_list_container_EventListContainer =
/*#__PURE__*/
function (_React$Component) {
  event_list_container_inherits(EventListContainer, _React$Component);

  function EventListContainer(p) {
    var _this;

    event_list_container_classCallCheck(this, EventListContainer);

    _this = event_list_container_possibleConstructorReturn(this, event_list_container_getPrototypeOf(EventListContainer).call(this, p));
    _this.state = {
      loading: true,
      events: []
    };
    fetch(p.eventListURL).then(function (response) {
      return response.json();
    }).then(function (events) {
      _this.setState({
        loading: false,
        events: events
      });
    });
    return _this;
  }

  event_list_container_createClass(EventListContainer, [{
    key: "render",
    value: function render() {
      if (this.state.loading) {
        return external_React_["createElement"]("div", null, "Loading...");
      }

      return external_React_["createElement"](event_list_EventList, {
        events: this.state.events
      });
    }
  }]);

  return EventListContainer;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./src/components/form_row.js
function form_row_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { form_row_typeof = function _typeof(obj) { return typeof obj; }; } else { form_row_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return form_row_typeof(obj); }

function form_row_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function form_row_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function form_row_createClass(Constructor, protoProps, staticProps) { if (protoProps) form_row_defineProperties(Constructor.prototype, protoProps); if (staticProps) form_row_defineProperties(Constructor, staticProps); return Constructor; }

function form_row_possibleConstructorReturn(self, call) { if (call && (form_row_typeof(call) === "object" || typeof call === "function")) { return call; } return form_row_assertThisInitialized(self); }

function form_row_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function form_row_getPrototypeOf(o) { form_row_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return form_row_getPrototypeOf(o); }

function form_row_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) form_row_setPrototypeOf(subClass, superClass); }

function form_row_setPrototypeOf(o, p) { form_row_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return form_row_setPrototypeOf(o, p); }


var form_row_FormRow =
/*#__PURE__*/
function (_React$Component) {
  form_row_inherits(FormRow, _React$Component);

  function FormRow() {
    form_row_classCallCheck(this, FormRow);

    return form_row_possibleConstructorReturn(this, form_row_getPrototypeOf(FormRow).apply(this, arguments));
  }

  form_row_createClass(FormRow, [{
    key: "render",
    value: function render() {
      return external_React_["createElement"]("div", {
        className: "form-group"
      }, external_React_["createElement"]("label", {
        className: "col-sm-2 control-label"
      }, this.props.label), external_React_["createElement"]("div", {
        className: "col-sm-10"
      }, this.props.children));
    }
  }]);

  return FormRow;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./src/components/event_booking_form.js
function event_booking_form_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { event_booking_form_typeof = function _typeof(obj) { return typeof obj; }; } else { event_booking_form_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return event_booking_form_typeof(obj); }

function event_booking_form_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function event_booking_form_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function event_booking_form_createClass(Constructor, protoProps, staticProps) { if (protoProps) event_booking_form_defineProperties(Constructor.prototype, protoProps); if (staticProps) event_booking_form_defineProperties(Constructor, staticProps); return Constructor; }

function event_booking_form_possibleConstructorReturn(self, call) { if (call && (event_booking_form_typeof(call) === "object" || typeof call === "function")) { return call; } return event_booking_form_assertThisInitialized(self); }

function event_booking_form_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function event_booking_form_getPrototypeOf(o) { event_booking_form_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return event_booking_form_getPrototypeOf(o); }

function event_booking_form_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) event_booking_form_setPrototypeOf(subClass, superClass); }

function event_booking_form_setPrototypeOf(o, p) { event_booking_form_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return event_booking_form_setPrototypeOf(o, p); }



var event_booking_form_EventBookingForm =
/*#__PURE__*/
function (_React$Component) {
  event_booking_form_inherits(EventBookingForm, _React$Component);

  function EventBookingForm(p) {
    var _this;

    event_booking_form_classCallCheck(this, EventBookingForm);

    _this = event_booking_form_possibleConstructorReturn(this, event_booking_form_getPrototypeOf(EventBookingForm).call(this, p));
    _this.state = {
      seats: 1
    };
    return _this;
  }

  event_booking_form_createClass(EventBookingForm, [{
    key: "handleNewAmount",
    value: function handleNewAmount(event) {
      var state = {
        seats: parseInt(event.target.value)
      };
      this.setState(state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return external_React_["createElement"]("div", null, external_React_["createElement"]("h2", null, "Book tickets for ", this.props.event.Name), external_React_["createElement"]("form", {
        className: "form-horizontal"
      }, external_React_["createElement"](form_row_FormRow, {
        label: "Event"
      }, external_React_["createElement"]("p", {
        className: "form-control-static"
      }, this.props.event.Name)), external_React_["createElement"](form_row_FormRow, {
        label: "Number of tickets"
      }, external_React_["createElement"]("select", {
        className: "form-control",
        value: this.state.seats,
        onChange: function onChange(event) {
          return _this2.handleNewAmount(event);
        }
      }, external_React_["createElement"]("option", {
        value: "1"
      }, "1"), external_React_["createElement"]("option", {
        value: "2"
      }, "2"), external_React_["createElement"]("option", {
        value: "3"
      }, "3"), external_React_["createElement"]("option", {
        value: "4"
      }, "4"))), external_React_["createElement"](form_row_FormRow, null, external_React_["createElement"]("button", {
        className: "btn btn-primary",
        onClick: function onClick() {
          return _this2.props.onSubmit(_this2.state.seats);
        }
      }, "Submit order"))));
    }
  }]);

  return EventBookingForm;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./src/components/event_booking_form_container.js
function event_booking_form_container_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { event_booking_form_container_typeof = function _typeof(obj) { return typeof obj; }; } else { event_booking_form_container_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return event_booking_form_container_typeof(obj); }

function event_booking_form_container_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function event_booking_form_container_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function event_booking_form_container_createClass(Constructor, protoProps, staticProps) { if (protoProps) event_booking_form_container_defineProperties(Constructor.prototype, protoProps); if (staticProps) event_booking_form_container_defineProperties(Constructor, staticProps); return Constructor; }

function event_booking_form_container_possibleConstructorReturn(self, call) { if (call && (event_booking_form_container_typeof(call) === "object" || typeof call === "function")) { return call; } return event_booking_form_container_assertThisInitialized(self); }

function event_booking_form_container_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function event_booking_form_container_getPrototypeOf(o) { event_booking_form_container_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return event_booking_form_container_getPrototypeOf(o); }

function event_booking_form_container_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) event_booking_form_container_setPrototypeOf(subClass, superClass); }

function event_booking_form_container_setPrototypeOf(o, p) { event_booking_form_container_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return event_booking_form_container_setPrototypeOf(o, p); }



var event_booking_form_container_EventBookingFormContainer =
/*#__PURE__*/
function (_React$Component) {
  event_booking_form_container_inherits(EventBookingFormContainer, _React$Component);

  function EventBookingFormContainer(props) {
    var _this;

    event_booking_form_container_classCallCheck(this, EventBookingFormContainer);

    _this = event_booking_form_container_possibleConstructorReturn(this, event_booking_form_container_getPrototypeOf(EventBookingFormContainer).call(this, props));
    _this.state = {
      state: "loading"
    };
    console.log(props.eventServiceURL + "/events/id/" + _this.props.match.params.id);
    fetch(props.eventServiceURL + "/events/id/" + _this.props.match.params.id).then(function (response) {
      return response.json();
    }).then(function (event) {
      console.log(event);

      _this.setState({
        state: "ready",
        event: event
      });
    });
    return _this;
  }

  event_booking_form_container_createClass(EventBookingFormContainer, [{
    key: "handleSubmit",
    value: function handleSubmit(seats) {
      var _this2 = this;

      var url = this.props.bookingServiceURL + "/events/" + p.match.params.id + "/bookings";
      var payload = {
        seats: seats
      };
      this.setState({
        event: this.state.event,
        state: "saving"
      });
      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
      }).then(function (response) {
        _this2.setState({
          event: _this2.state.event,
          state: response.ok ? "done" : "error"
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.state === "loading") {
        return external_React_["createElement"]("div", null, "Loading...");
      }

      if (this.state.state === "saving") {
        return external_React_["createElement"]("div", null, "Saving...");
      }

      if (this.state.state === "done") {
        return external_React_["createElement"]("div", {
          className: "alert alert-success"
        }, "Booking completed! Thank you!");
      }

      if (this.state.state === "error" || !this.state.event) {
        return external_React_["createElement"]("div", {
          className: "alert alert-danger"
        }, "Unknown error!");
      }

      return external_React_["createElement"](event_booking_form_EventBookingForm, {
        event: this.state.event,
        onSubmit: function onSubmit(seats) {
          return _this3.handleSubmit(seats);
        }
      });
    }
  }]);

  return EventBookingFormContainer;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./src/components/navigation.js
function navigation_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { navigation_typeof = function _typeof(obj) { return typeof obj; }; } else { navigation_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return navigation_typeof(obj); }

function navigation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function navigation_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function navigation_createClass(Constructor, protoProps, staticProps) { if (protoProps) navigation_defineProperties(Constructor.prototype, protoProps); if (staticProps) navigation_defineProperties(Constructor, staticProps); return Constructor; }

function navigation_possibleConstructorReturn(self, call) { if (call && (navigation_typeof(call) === "object" || typeof call === "function")) { return call; } return navigation_assertThisInitialized(self); }

function navigation_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function navigation_getPrototypeOf(o) { navigation_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return navigation_getPrototypeOf(o); }

function navigation_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) navigation_setPrototypeOf(subClass, superClass); }

function navigation_setPrototypeOf(o, p) { navigation_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return navigation_setPrototypeOf(o, p); }



var navigation_Navigation =
/*#__PURE__*/
function (_React$Component) {
  navigation_inherits(Navigation, _React$Component);

  function Navigation(props) {
    navigation_classCallCheck(this, Navigation);

    return navigation_possibleConstructorReturn(this, navigation_getPrototypeOf(Navigation).call(this, props));
  }

  navigation_createClass(Navigation, [{
    key: "render",
    value: function render() {
      return external_React_["createElement"]("nav", {
        className: "navbar navbar-default"
      }, external_React_["createElement"]("div", {
        className: "container"
      }, external_React_["createElement"]("div", {
        className: "navbar-header"
      }, external_React_["createElement"](Link, {
        to: "/",
        className: "navbar-brand"
      }, this.props.brandName)), external_React_["createElement"]("ul", {
        className: "nav navbar-nav"
      }, external_React_["createElement"]("li", null, external_React_["createElement"](Link, {
        to: "/events"
      }, "Events")))));
    }
  }]);

  return Navigation;
}(external_React_["Component"]);
// CONCATENATED MODULE: ./src/index.js
function src_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { src_typeof = function _typeof(obj) { return typeof obj; }; } else { src_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return src_typeof(obj); }

function src_extends() { src_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return src_extends.apply(this, arguments); }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function src_possibleConstructorReturn(self, call) { if (call && (src_typeof(call) === "object" || typeof call === "function")) { return call; } return src_assertThisInitialized(self); }

function src_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function src_getPrototypeOf(o) { src_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return src_getPrototypeOf(o); }

function src_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) src_setPrototypeOf(subClass, superClass); }

function src_setPrototypeOf(o, p) { src_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return src_setPrototypeOf(o, p); }









var src_App =
/*#__PURE__*/
function (_React$Component) {
  src_inherits(App, _React$Component);

  function App() {
    src_classCallCheck(this, App);

    return src_possibleConstructorReturn(this, src_getPrototypeOf(App).apply(this, arguments));
  }

  src_createClass(App, [{
    key: "render",
    value: function render() {
      var homePage = function homePage() {
        return external_React_["createElement"](home_page_HomePage, null);
      };

      var eventList = function eventList() {
        return external_React_["createElement"](event_list_container_EventListContainer, {
          eventListURL: "http://localhost:8181/events"
        });
      };

      var eventBooking = function eventBooking(props) {
        return external_React_["createElement"](event_booking_form_container_EventBookingFormContainer, src_extends({}, props, {
          eventServiceURL: "http://localhost:8181",
          bookingServiceURL: "http://localhost:4141"
        }));
      };

      return external_React_["createElement"](react_router_dom_BrowserRouter, null, external_React_["createElement"](navigation_Navigation, {
        brandName: "MyEvents"
      }), external_React_["createElement"]("div", {
        className: "container"
      }, external_React_["createElement"]("h1", null, "My Events"), external_React_["createElement"](react_router_Route, {
        exact: true,
        path: "/",
        render: function render(props) {
          return homePage(props);
        }
      }), external_React_["createElement"](react_router_Route, {
        exact: true,
        path: "/events",
        render: function render(props) {
          return eventList(props);
        }
      }), external_React_["createElement"](react_router_Route, {
        path: "/events/:id/book",
        render: function render(props) {
          return eventBooking(props);
        }
      })));
    }
  }]);

  return App;
}(external_React_["Component"]);

external_ReactDOM_["render"](external_React_["createElement"](src_App, null), document.getElementById("myevents-app"));

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYXRoLXRvLXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3VkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9kaXN0L2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzLmNqcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtdG8tcmVnZXhwL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaG9tZV9wYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXBhdGhuYW1lL2VzbS9yZXNvbHZlLXBhdGhuYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWx1ZS1lcXVhbC9lc20vdmFsdWUtZXF1YWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbnktaW52YXJpYW50L2Rpc3QvdGlueS1pbnZhcmlhbnQuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2VzbS9oaXN0b3J5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taW5pLWNyZWF0ZS1yZWFjdC1jb250ZXh0L2Rpc3QvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvZXNtL3JlYWN0LXJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lc20vcmVhY3Qtcm91dGVyLWRvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ldmVudF9saXN0X2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ldmVudF9saXN0X2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9mb3JtX3Jvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ldmVudF9ib29raW5nX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfYm9va2luZ19mb3JtX2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJIb21lUGFnZSIsIlJlYWN0IiwiRXZlbnRMaXN0SXRlbSIsInN0YXJ0IiwiRGF0ZSIsInByb3BzIiwiZXZlbnQiLCJTdGFydERhdGUiLCJlbmQiLCJFbmREYXRlIiwiTmFtZSIsIkxvY2F0aW9uIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiSUQiLCJFdmVudExpc3QiLCJpdGVtcyIsImV2ZW50cyIsIm1hcCIsImUiLCJFdmVudExpc3RDb250YWluZXIiLCJwIiwic3RhdGUiLCJsb2FkaW5nIiwiZmV0Y2giLCJldmVudExpc3RVUkwiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwic2V0U3RhdGUiLCJGb3JtUm93IiwibGFiZWwiLCJjaGlsZHJlbiIsIkV2ZW50Qm9va2luZ0Zvcm0iLCJzZWF0cyIsInBhcnNlSW50IiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVOZXdBbW91bnQiLCJvblN1Ym1pdCIsIkV2ZW50Qm9va2luZ0Zvcm1Db250YWluZXIiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRTZXJ2aWNlVVJMIiwibWF0Y2giLCJwYXJhbXMiLCJpZCIsInVybCIsImJvb2tpbmdTZXJ2aWNlVVJMIiwicGF5bG9hZCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJoYW5kbGVTdWJtaXQiLCJOYXZpZ2F0aW9uIiwiYnJhbmROYW1lIiwiQXBwIiwiaG9tZVBhZ2UiLCJldmVudExpc3QiLCJldmVudEJvb2tpbmciLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFF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TSxpQ0FBQyx1Q0FBRDtBQUFvQixzQkFBWSxFQUFDO0FBQWpDLFVBQU47QUFBQSxPQUFsQjs7QUFDQSxVQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDdkQsS0FBRDtBQUFBLGVBQVcsaUNBQUMsc0RBQUQsa0JBQStCQSxLQUEvQjtBQUM5Qix5QkFBZSxFQUFDLHVCQURjO0FBRTlCLDJCQUFpQixFQUFDO0FBRlksV0FBWDtBQUFBLE9BQXJCOztBQUlBLGFBQU8saUNBQUMsOEJBQUQsUUFDTCxpQ0FBQyxxQkFBRDtBQUFZLGlCQUFTLEVBQUM7QUFBdEIsUUFESyxFQUVMO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0UseURBREYsRUFHRSxpQ0FBQyxrQkFBRDtBQUFPLGFBQUssTUFBWjtBQUFhLFlBQUksRUFBQyxHQUFsQjtBQUFzQixjQUFNLEVBQUUsZ0JBQUFBLEtBQUs7QUFBQSxpQkFBSXFELFFBQVEsQ0FBQ3JELEtBQUQsQ0FBWjtBQUFBO0FBQW5DLFFBSEYsRUFJRSxpQ0FBQyxrQkFBRDtBQUFPLGFBQUssTUFBWjtBQUFhLFlBQUksRUFBQyxTQUFsQjtBQUE0QixjQUFNLEVBQUUsZ0JBQUFBLEtBQUs7QUFBQSxpQkFBSXNELFNBQVMsQ0FBQ3RELEtBQUQsQ0FBYjtBQUFBO0FBQXpDLFFBSkYsRUFLRSxpQ0FBQyxrQkFBRDtBQUFPLFlBQUksRUFBQyxrQkFBWjtBQUErQixjQUFNLEVBQUUsZ0JBQUFBLEtBQUs7QUFBQSxpQkFBSXVELFlBQVksQ0FBQ3ZELEtBQUQsQ0FBaEI7QUFBQTtBQUE1QyxRQUxGLENBRkssQ0FBUDtBQVVEOzs7O0VBbEJlSiw0Qjs7QUFxQmxCNEQsNEJBQUEsQ0FDSSxpQ0FBQyxPQUFELE9BREosRUFFSUMsUUFBUSxDQUFDQyxjQUFULENBQXdCLGNBQXhCLENBRkosRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTQpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzTG9vc2U7IiwidmFyIGlzYXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuLyoqXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcGF0aFRvUmVnZXhwXG5tb2R1bGUuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXG5tb2R1bGUuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZVxubW9kdWxlLmV4cG9ydHMudG9rZW5zVG9GdW5jdGlvbiA9IHRva2Vuc1RvRnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvUmVnRXhwID0gdG9rZW5zVG9SZWdFeHBcblxuLyoqXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxuICpcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xuICAvLyBNYXRjaCBlc2NhcGVkIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYXBwZWFyIGluIGZ1dHVyZSBtYXRjaGVzLlxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxuICAnKFxcXFxcXFxcLiknLFxuICAvLyBNYXRjaCBFeHByZXNzLXN0eWxlIHBhcmFtZXRlcnMgYW5kIHVuLW5hbWVkIHBhcmFtZXRlcnMgd2l0aCBhIHByZWZpeFxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxuICAvL1xuICAvLyBcIi86dGVzdChcXFxcZCspP1wiID0+IFtcIi9cIiwgXCJ0ZXN0XCIsIFwiXFxkK1wiLCB1bmRlZmluZWQsIFwiP1wiLCB1bmRlZmluZWRdXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiAgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgLy8gXCIvKlwiICAgICAgICAgICAgPT4gW1wiL1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiKlwiXVxuICAnKFtcXFxcLy5dKT8oPzooPzpcXFxcOihcXFxcdyspKD86XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSk/fFxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpKFsrKj9dKT98KFxcXFwqKSknXG5dLmpvaW4oJ3wnKSwgJ2cnKVxuXG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIGZvciB0aGUgcmF3IHRva2Vucy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBzdHJcbiAqIEBwYXJhbSAge09iamVjdD19IG9wdGlvbnNcbiAqIEByZXR1cm4geyFBcnJheX1cbiAqL1xuZnVuY3Rpb24gcGFyc2UgKHN0ciwgb3B0aW9ucykge1xuICB2YXIgdG9rZW5zID0gW11cbiAgdmFyIGtleSA9IDBcbiAgdmFyIGluZGV4ID0gMFxuICB2YXIgcGF0aCA9ICcnXG4gIHZhciBkZWZhdWx0RGVsaW1pdGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmRlbGltaXRlciB8fCAnLydcbiAgdmFyIHJlc1xuXG4gIHdoaWxlICgocmVzID0gUEFUSF9SRUdFWFAuZXhlYyhzdHIpKSAhPSBudWxsKSB7XG4gICAgdmFyIG0gPSByZXNbMF1cbiAgICB2YXIgZXNjYXBlZCA9IHJlc1sxXVxuICAgIHZhciBvZmZzZXQgPSByZXMuaW5kZXhcbiAgICBwYXRoICs9IHN0ci5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgIGluZGV4ID0gb2Zmc2V0ICsgbS5sZW5ndGhcblxuICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxuICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICBwYXRoICs9IGVzY2FwZWRbMV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIG5leHQgPSBzdHJbaW5kZXhdXG4gICAgdmFyIHByZWZpeCA9IHJlc1syXVxuICAgIHZhciBuYW1lID0gcmVzWzNdXG4gICAgdmFyIGNhcHR1cmUgPSByZXNbNF1cbiAgICB2YXIgZ3JvdXAgPSByZXNbNV1cbiAgICB2YXIgbW9kaWZpZXIgPSByZXNbNl1cbiAgICB2YXIgYXN0ZXJpc2sgPSByZXNbN11cblxuICAgIC8vIFB1c2ggdGhlIGN1cnJlbnQgcGF0aCBvbnRvIHRoZSB0b2tlbnMuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gICAgICBwYXRoID0gJydcbiAgICB9XG5cbiAgICB2YXIgcGFydGlhbCA9IHByZWZpeCAhPSBudWxsICYmIG5leHQgIT0gbnVsbCAmJiBuZXh0ICE9PSBwcmVmaXhcbiAgICB2YXIgcmVwZWF0ID0gbW9kaWZpZXIgPT09ICcrJyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIG9wdGlvbmFsID0gbW9kaWZpZXIgPT09ICc/JyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIGRlbGltaXRlciA9IHJlc1syXSB8fCBkZWZhdWx0RGVsaW1pdGVyXG4gICAgdmFyIHBhdHRlcm4gPSBjYXB0dXJlIHx8IGdyb3VwXG5cbiAgICB0b2tlbnMucHVzaCh7XG4gICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgcHJlZml4OiBwcmVmaXggfHwgJycsXG4gICAgICBkZWxpbWl0ZXI6IGRlbGltaXRlcixcbiAgICAgIG9wdGlvbmFsOiBvcHRpb25hbCxcbiAgICAgIHJlcGVhdDogcmVwZWF0LFxuICAgICAgcGFydGlhbDogcGFydGlhbCxcbiAgICAgIGFzdGVyaXNrOiAhIWFzdGVyaXNrLFxuICAgICAgcGF0dGVybjogcGF0dGVybiA/IGVzY2FwZUdyb3VwKHBhdHRlcm4pIDogKGFzdGVyaXNrID8gJy4qJyA6ICdbXicgKyBlc2NhcGVTdHJpbmcoZGVsaW1pdGVyKSArICddKz8nKVxuICAgIH0pXG4gIH1cblxuICAvLyBNYXRjaCBhbnkgY2hhcmFjdGVycyBzdGlsbCByZW1haW5pbmcuXG4gIGlmIChpbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICBwYXRoICs9IHN0ci5zdWJzdHIoaW5kZXgpXG4gIH1cblxuICAvLyBJZiB0aGUgcGF0aCBleGlzdHMsIHB1c2ggaXQgb250byB0aGUgZW5kLlxuICBpZiAocGF0aCkge1xuICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshZnVuY3Rpb24oT2JqZWN0PSwgT2JqZWN0PSl9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUgKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpKVxufVxuXG4vKipcbiAqIFByZXR0aWVyIGVuY29kaW5nIG9mIFVSSSBwYXRoIHNlZ21lbnRzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1tcXC8/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRW5jb2RlIHRoZSBhc3RlcmlzayBwYXJhbWV0ZXIuIFNpbWlsYXIgdG8gYHByZXR0eWAsIGJ1dCBhbGxvd3Mgc2xhc2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZUFzdGVyaXNrIChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIGEgbWV0aG9kIGZvciB0cmFuc2Zvcm1pbmcgdG9rZW5zIGludG8gdGhlIHBhdGggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24gKHRva2Vucykge1xuICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgdmFyIG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aClcblxuICAvLyBDb21waWxlIGFsbCB0aGUgcGF0dGVybnMgYmVmb3JlIGNvbXBpbGF0aW9uLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0eXBlb2YgdG9rZW5zW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgbWF0Y2hlc1tpXSA9IG5ldyBSZWdFeHAoJ14oPzonICsgdG9rZW5zW2ldLnBhdHRlcm4gKyAnKSQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBvcHRzKSB7XG4gICAgdmFyIHBhdGggPSAnJ1xuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9XG4gICAgdmFyIGVuY29kZSA9IG9wdGlvbnMucHJldHR5ID8gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IDogZW5jb2RlVVJJQ29tcG9uZW50XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggKz0gdG9rZW5cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUgPSBkYXRhW3Rva2VuLm5hbWVdXG4gICAgICB2YXIgc2VnbWVudFxuXG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAvLyBQcmVwZW5kIHBhcnRpYWwgc2VnbWVudCBwcmVmaXhlcy5cbiAgICAgICAgICBpZiAodG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXhcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gYmUgZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzYXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICghdG9rZW4ucmVwZWF0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgcmVwZWF0LCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnYCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCBiZSBlbXB0eScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHNlZ21lbnQgPSBlbmNvZGUodmFsdWVbal0pXG5cbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudCkgKyAnYCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBzZWdtZW50ID0gdG9rZW4uYXN0ZXJpc2sgPyBlbmNvZGVBc3Rlcmlzayh2YWx1ZSkgOiBlbmNvZGUodmFsdWUpXG5cbiAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIFwiJyArIHNlZ21lbnQgKyAnXCInKVxuICAgICAgfVxuXG4gICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnRcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG59XG5cbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18XFwvXFxcXF0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5c1xuICByZXR1cm4gcmVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmbGFncyAob3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucy5zZW5zaXRpdmUgPyAnJyA6ICdpJ1xufVxuXG4vKipcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshUmVnRXhwfSBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cCAocGF0aCwga2V5cykge1xuICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxuICB2YXIgZ3JvdXBzID0gcGF0aC5zb3VyY2UubWF0Y2goL1xcKCg/IVxcPykvZylcblxuICBpZiAoZ3JvdXBzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGksXG4gICAgICAgIHByZWZpeDogbnVsbCxcbiAgICAgICAgZGVsaW1pdGVyOiBudWxsLFxuICAgICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICAgIHJlcGVhdDogZmFsc2UsXG4gICAgICAgIHBhcnRpYWw6IGZhbHNlLFxuICAgICAgICBhc3RlcmlzazogZmFsc2UsXG4gICAgICAgIHBhdHRlcm46IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocGF0aCwga2V5cylcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBwYXJ0cyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgcGFydHMucHVzaChwYXRoVG9SZWdleHAocGF0aFtpXSwga2V5cywgb3B0aW9ucykuc291cmNlKVxuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoJyg/OicgKyBwYXJ0cy5qb2luKCd8JykgKyAnKScsIGZsYWdzKG9wdGlvbnMpKVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHJlZ2V4cCwga2V5cylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9SZWdFeHAocGFyc2UocGF0aCwgb3B0aW9ucyksIGtleXMsIG9wdGlvbnMpXG59XG5cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICAgICAgICAgIHRva2Vuc1xuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnRXhwICh0b2tlbnMsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucylcbiAgICBrZXlzID0gW11cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0XG4gIHZhciBlbmQgPSBvcHRpb25zLmVuZCAhPT0gZmFsc2VcbiAgdmFyIHJvdXRlID0gJydcblxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJvdXRlICs9IGVzY2FwZVN0cmluZyh0b2tlbilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHByZWZpeCA9IGVzY2FwZVN0cmluZyh0b2tlbi5wcmVmaXgpXG4gICAgICB2YXIgY2FwdHVyZSA9ICcoPzonICsgdG9rZW4ucGF0dGVybiArICcpJ1xuXG4gICAgICBrZXlzLnB1c2godG9rZW4pXG5cbiAgICAgIGlmICh0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgY2FwdHVyZSArPSAnKD86JyArIHByZWZpeCArIGNhcHR1cmUgKyAnKSonXG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICBpZiAoIXRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICBjYXB0dXJlID0gJyg/OicgKyBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJykpPydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpPydcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSdcbiAgICAgIH1cblxuICAgICAgcm91dGUgKz0gY2FwdHVyZVxuICAgIH1cbiAgfVxuXG4gIHZhciBkZWxpbWl0ZXIgPSBlc2NhcGVTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXIgfHwgJy8nKVxuICB2YXIgZW5kc1dpdGhEZWxpbWl0ZXIgPSByb3V0ZS5zbGljZSgtZGVsaW1pdGVyLmxlbmd0aCkgPT09IGRlbGltaXRlclxuXG4gIC8vIEluIG5vbi1zdHJpY3QgbW9kZSB3ZSBhbGxvdyBhIHNsYXNoIGF0IHRoZSBlbmQgb2YgbWF0Y2guIElmIHRoZSBwYXRoIHRvXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gIC8vIGluIG5vbi1lbmRpbmcgbW9kZSwgd2hlcmUgXCIvdGVzdC9cIiBzaG91bGRuJ3QgbWF0Y2ggXCIvdGVzdC8vcm91dGVcIi5cbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByb3V0ZSA9IChlbmRzV2l0aERlbGltaXRlciA/IHJvdXRlLnNsaWNlKDAsIC1kZWxpbWl0ZXIubGVuZ3RoKSA6IHJvdXRlKSArICcoPzonICsgZGVsaW1pdGVyICsgJyg/PSQpKT8nXG4gIH1cblxuICBpZiAoZW5kKSB7XG4gICAgcm91dGUgKz0gJyQnXG4gIH0gZWxzZSB7XG4gICAgLy8gSW4gbm9uLWVuZGluZyBtb2RlLCB3ZSBuZWVkIHRoZSBjYXB0dXJpbmcgZ3JvdXBzIHRvIG1hdGNoIGFzIG11Y2ggYXNcbiAgICAvLyBwb3NzaWJsZSBieSB1c2luZyBhIHBvc2l0aXZlIGxvb2thaGVhZCB0byB0aGUgZW5kIG9yIG5leHQgcGF0aCBzZWdtZW50LlxuICAgIHJvdXRlICs9IHN0cmljdCAmJiBlbmRzV2l0aERlbGltaXRlciA/ICcnIDogJyg/PScgKyBkZWxpbWl0ZXIgKyAnfCQpJ1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMobmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpLCBrZXlzKVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKlxuICogQHBhcmFtICB7KHN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19ICAgICAgIGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpXG4gICAga2V5cyA9IFtdXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cykpXG4gIH1cblxuICBpZiAoaXNhcnJheShwYXRoKSkge1xuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKC8qKiBAdHlwZSB7IUFycmF5fSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gc3RyaW5nVG9SZWdleHAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTsiLCIvLyBAZmxvd1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5ID0gJ19fZ2xvYmFsX3VuaXF1ZV9pZF9fJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFtrZXldID0gKGdsb2JhbFtrZXldIHx8IDApICsgMTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTUsIFlhaG9vISBJbmMuXG4gKiBDb3B5cmlnaHRzIGxpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIExpY2Vuc2UuIFNlZSB0aGUgYWNjb21wYW55aW5nIExJQ0VOU0UgZmlsZSBmb3IgdGVybXMuXG4gKi9cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBSRUFDVF9TVEFUSUNTID0ge1xuICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcjogdHJ1ZSxcbiAgICBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IHRydWUsXG4gICAgbWl4aW5zOiB0cnVlLFxuICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICB0eXBlOiB0cnVlXG59O1xuXG52YXIgS05PV05fU1RBVElDUyA9IHtcbiAgICBuYW1lOiB0cnVlLFxuICAgIGxlbmd0aDogdHJ1ZSxcbiAgICBwcm90b3R5cGU6IHRydWUsXG4gICAgY2FsbGVyOiB0cnVlLFxuICAgIGNhbGxlZTogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgYXJpdHk6IHRydWVcbn07XG5cbnZhciBGT1JXQVJEX1JFRl9TVEFUSUNTID0ge1xuICAgICckJHR5cGVvZic6IHRydWUsXG4gICAgcmVuZGVyOiB0cnVlLFxuICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWVcbn07XG5cbnZhciBNRU1PX1NUQVRJQ1MgPSB7XG4gICAgJyQkdHlwZW9mJzogdHJ1ZSxcbiAgICBjb21wYXJlOiB0cnVlLFxuICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIFRZUEVfU1RBVElDUyA9IHt9O1xuVFlQRV9TVEFUSUNTW1JlYWN0SXMuRm9yd2FyZFJlZl0gPSBGT1JXQVJEX1JFRl9TVEFUSUNTO1xuXG5mdW5jdGlvbiBnZXRTdGF0aWNzKGNvbXBvbmVudCkge1xuICAgIGlmIChSZWFjdElzLmlzTWVtbyhjb21wb25lbnQpKSB7XG4gICAgICAgIHJldHVybiBNRU1PX1NUQVRJQ1M7XG4gICAgfVxuICAgIHJldHVybiBUWVBFX1NUQVRJQ1NbY29tcG9uZW50WyckJHR5cGVvZiddXSB8fCBSRUFDVF9TVEFUSUNTO1xufVxuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgYmxhY2tsaXN0KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG5cbiAgICAgICAgaWYgKG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgdmFyIGluaGVyaXRlZENvbXBvbmVudCA9IGdldFByb3RvdHlwZU9mKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoaW5oZXJpdGVkQ29tcG9uZW50ICYmIGluaGVyaXRlZENvbXBvbmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBpbmhlcml0ZWRDb21wb25lbnQsIGJsYWNrbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldFN0YXRpY3MgPSBnZXRTdGF0aWNzKHRhcmdldENvbXBvbmVudCk7XG4gICAgICAgIHZhciBzb3VyY2VTdGF0aWNzID0gZ2V0U3RhdGljcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICBpZiAoIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAhKGJsYWNrbGlzdCAmJiBibGFja2xpc3Rba2V5XSkgJiYgIShzb3VyY2VTdGF0aWNzICYmIHNvdXJjZVN0YXRpY3Nba2V5XSkgJiYgISh0YXJnZXRTdGF0aWNzICYmIHRhcmdldFN0YXRpY3Nba2V5XSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2VDb21wb25lbnQsIGtleSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXZvaWQgZmFpbHVyZXMgZnJvbSByZWFkLW9ubHkgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXRDb21wb25lbnQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBob2lzdE5vblJlYWN0U3RhdGljcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge31cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25XaXRoUmVzZXQoKSB7fVxuZW1wdHlGdW5jdGlvbldpdGhSZXNldC5yZXNldFdhcm5pbmdDYWNoZSA9IGVtcHR5RnVuY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIHNoaW0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICBpZiAoc2VjcmV0ID09PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgLy8gSXQgaXMgc3RpbGwgc2FmZSB3aGVuIGNhbGxlZCBmcm9tIFJlYWN0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB0aHJvdyBlcnI7XG4gIH07XG4gIHNoaW0uaXNSZXF1aXJlZCA9IHNoaW07XG4gIGZ1bmN0aW9uIGdldFNoaW0oKSB7XG4gICAgcmV0dXJuIHNoaW07XG4gIH07XG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogc2hpbSxcbiAgICBib29sOiBzaGltLFxuICAgIGZ1bmM6IHNoaW0sXG4gICAgbnVtYmVyOiBzaGltLFxuICAgIG9iamVjdDogc2hpbSxcbiAgICBzdHJpbmc6IHNoaW0sXG4gICAgc3ltYm9sOiBzaGltLFxuXG4gICAgYW55OiBzaGltLFxuICAgIGFycmF5T2Y6IGdldFNoaW0sXG4gICAgZWxlbWVudDogc2hpbSxcbiAgICBlbGVtZW50VHlwZTogc2hpbSxcbiAgICBpbnN0YW5jZU9mOiBnZXRTaGltLFxuICAgIG5vZGU6IHNoaW0sXG4gICAgb2JqZWN0T2Y6IGdldFNoaW0sXG4gICAgb25lT2Y6IGdldFNoaW0sXG4gICAgb25lT2ZUeXBlOiBnZXRTaGltLFxuICAgIHNoYXBlOiBnZXRTaGltLFxuICAgIGV4YWN0OiBnZXRTaGltLFxuXG4gICAgY2hlY2tQcm9wVHlwZXM6IGVtcHR5RnVuY3Rpb25XaXRoUmVzZXQsXG4gICAgcmVzZXRXYXJuaW5nQ2FjaGU6IGVtcHR5RnVuY3Rpb25cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjEwLjFcbiAqIHJlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO1xudmFyIGI9XCJmdW5jdGlvblwiPT09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLmZvcixjPWI/U3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIik6NjAxMDMsZD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5wb3J0YWxcIik6NjAxMDYsZT1iP1N5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKTo2MDEwNyxmPWI/U3ltYm9sLmZvcihcInJlYWN0LnN0cmljdF9tb2RlXCIpOjYwMTA4LGc9Yj9TeW1ib2wuZm9yKFwicmVhY3QucHJvZmlsZXJcIik6NjAxMTQsaD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5wcm92aWRlclwiKTo2MDEwOSxrPWI/U3ltYm9sLmZvcihcInJlYWN0LmNvbnRleHRcIik6NjAxMTAsbD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5hc3luY19tb2RlXCIpOjYwMTExLG09Yj9TeW1ib2wuZm9yKFwicmVhY3QuY29uY3VycmVudF9tb2RlXCIpOjYwMTExLG49Yj9TeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIik6NjAxMTIscD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zdXNwZW5zZVwiKTo2MDExMyxxPWI/U3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlX2xpc3RcIik6XG42MDEyMCxyPWI/U3ltYm9sLmZvcihcInJlYWN0Lm1lbW9cIik6NjAxMTUsdD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5sYXp5XCIpOjYwMTE2LHY9Yj9TeW1ib2wuZm9yKFwicmVhY3QuZnVuZGFtZW50YWxcIik6NjAxMTcsdz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5yZXNwb25kZXJcIik6NjAxMTgseD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zY29wZVwiKTo2MDExOTtmdW5jdGlvbiB5KGEpe2lmKFwib2JqZWN0XCI9PT10eXBlb2YgYSYmbnVsbCE9PWEpe3ZhciB1PWEuJCR0eXBlb2Y7c3dpdGNoKHUpe2Nhc2UgYzpzd2l0Y2goYT1hLnR5cGUsYSl7Y2FzZSBsOmNhc2UgbTpjYXNlIGU6Y2FzZSBnOmNhc2UgZjpjYXNlIHA6cmV0dXJuIGE7ZGVmYXVsdDpzd2l0Y2goYT1hJiZhLiQkdHlwZW9mLGEpe2Nhc2UgazpjYXNlIG46Y2FzZSBoOnJldHVybiBhO2RlZmF1bHQ6cmV0dXJuIHV9fWNhc2UgdDpjYXNlIHI6Y2FzZSBkOnJldHVybiB1fX19ZnVuY3Rpb24geihhKXtyZXR1cm4geShhKT09PW19XG5leHBvcnRzLnR5cGVPZj15O2V4cG9ydHMuQXN5bmNNb2RlPWw7ZXhwb3J0cy5Db25jdXJyZW50TW9kZT1tO2V4cG9ydHMuQ29udGV4dENvbnN1bWVyPWs7ZXhwb3J0cy5Db250ZXh0UHJvdmlkZXI9aDtleHBvcnRzLkVsZW1lbnQ9YztleHBvcnRzLkZvcndhcmRSZWY9bjtleHBvcnRzLkZyYWdtZW50PWU7ZXhwb3J0cy5MYXp5PXQ7ZXhwb3J0cy5NZW1vPXI7ZXhwb3J0cy5Qb3J0YWw9ZDtleHBvcnRzLlByb2ZpbGVyPWc7ZXhwb3J0cy5TdHJpY3RNb2RlPWY7ZXhwb3J0cy5TdXNwZW5zZT1wO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGU9ZnVuY3Rpb24oYSl7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PT10eXBlb2YgYXx8YT09PWV8fGE9PT1tfHxhPT09Z3x8YT09PWZ8fGE9PT1wfHxhPT09cXx8XCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmKGEuJCR0eXBlb2Y9PT10fHxhLiQkdHlwZW9mPT09cnx8YS4kJHR5cGVvZj09PWh8fGEuJCR0eXBlb2Y9PT1rfHxhLiQkdHlwZW9mPT09bnx8YS4kJHR5cGVvZj09PXZ8fGEuJCR0eXBlb2Y9PT13fHxhLiQkdHlwZW9mPT09eCl9O2V4cG9ydHMuaXNBc3luY01vZGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHooYSl8fHkoYSk9PT1sfTtleHBvcnRzLmlzQ29uY3VycmVudE1vZGU9ejtleHBvcnRzLmlzQ29udGV4dENvbnN1bWVyPWZ1bmN0aW9uKGEpe3JldHVybiB5KGEpPT09a307ZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlcj1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PWh9O1xuZXhwb3J0cy5pc0VsZW1lbnQ9ZnVuY3Rpb24oYSl7cmV0dXJuXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmYS4kJHR5cGVvZj09PWN9O2V4cG9ydHMuaXNGb3J3YXJkUmVmPWZ1bmN0aW9uKGEpe3JldHVybiB5KGEpPT09bn07ZXhwb3J0cy5pc0ZyYWdtZW50PWZ1bmN0aW9uKGEpe3JldHVybiB5KGEpPT09ZX07ZXhwb3J0cy5pc0xhenk9ZnVuY3Rpb24oYSl7cmV0dXJuIHkoYSk9PT10fTtleHBvcnRzLmlzTWVtbz1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PXJ9O2V4cG9ydHMuaXNQb3J0YWw9ZnVuY3Rpb24oYSl7cmV0dXJuIHkoYSk9PT1kfTtleHBvcnRzLmlzUHJvZmlsZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHkoYSk9PT1nfTtleHBvcnRzLmlzU3RyaWN0TW9kZT1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PWZ9O2V4cG9ydHMuaXNTdXNwZW5zZT1mdW5jdGlvbihhKXtyZXR1cm4geShhKT09PXB9O1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7IFxuXG5cbmV4cG9ydCBjbGFzcyBIb21lUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gdGhlIGJlc3QgZXZlbnQgYm9va2luZyBzaXRlIVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bywgZnJvbSkge1xuICBpZiAoZnJvbSA9PT0gdW5kZWZpbmVkKSBmcm9tID0gJyc7XG5cbiAgdmFyIHRvUGFydHMgPSAodG8gJiYgdG8uc3BsaXQoJy8nKSkgfHwgW107XG4gIHZhciBmcm9tUGFydHMgPSAoZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykpIHx8IFtdO1xuXG4gIHZhciBpc1RvQWJzID0gdG8gJiYgaXNBYnNvbHV0ZSh0byk7XG4gIHZhciBpc0Zyb21BYnMgPSBmcm9tICYmIGlzQWJzb2x1dGUoZnJvbSk7XG4gIHZhciBtdXN0RW5kQWJzID0gaXNUb0FicyB8fCBpc0Zyb21BYnM7XG5cbiAgaWYgKHRvICYmIGlzQWJzb2x1dGUodG8pKSB7XG4gICAgLy8gdG8gaXMgYWJzb2x1dGVcbiAgICBmcm9tUGFydHMgPSB0b1BhcnRzO1xuICB9IGVsc2UgaWYgKHRvUGFydHMubGVuZ3RoKSB7XG4gICAgLy8gdG8gaXMgcmVsYXRpdmUsIGRyb3AgdGhlIGZpbGVuYW1lXG4gICAgZnJvbVBhcnRzLnBvcCgpO1xuICAgIGZyb21QYXJ0cyA9IGZyb21QYXJ0cy5jb25jYXQodG9QYXJ0cyk7XG4gIH1cblxuICBpZiAoIWZyb21QYXJ0cy5sZW5ndGgpIHJldHVybiAnLyc7XG5cbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2g7XG4gIGlmIChmcm9tUGFydHMubGVuZ3RoKSB7XG4gICAgdmFyIGxhc3QgPSBmcm9tUGFydHNbZnJvbVBhcnRzLmxlbmd0aCAtIDFdO1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJyB8fCBsYXN0ID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICBoYXNUcmFpbGluZ1NsYXNoID0gZmFsc2U7XG4gIH1cblxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gZnJvbVBhcnRzLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcGFydCA9IGZyb21QYXJ0c1tpXTtcblxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW11c3RFbmRBYnMpIGZvciAoOyB1cC0tOyB1cCkgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG5cbiAgaWYgKFxuICAgIG11c3RFbmRBYnMgJiZcbiAgICBmcm9tUGFydHNbMF0gIT09ICcnICYmXG4gICAgKCFmcm9tUGFydHNbMF0gfHwgIWlzQWJzb2x1dGUoZnJvbVBhcnRzWzBdKSlcbiAgKVxuICAgIGZyb21QYXJ0cy51bnNoaWZ0KCcnKTtcblxuICB2YXIgcmVzdWx0ID0gZnJvbVBhcnRzLmpvaW4oJy8nKTtcblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiByZXN1bHQuc3Vic3RyKC0xKSAhPT0gJy8nKSByZXN1bHQgKz0gJy8nO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVQYXRobmFtZTtcbiIsImZ1bmN0aW9uIHZhbHVlT2Yob2JqKSB7XG4gIHJldHVybiBvYmoudmFsdWVPZiA/IG9iai52YWx1ZU9mKCkgOiBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YuY2FsbChvYmopO1xufVxuXG5mdW5jdGlvbiB2YWx1ZUVxdWFsKGEsIGIpIHtcbiAgLy8gVGVzdCBmb3Igc3RyaWN0IGVxdWFsaXR5IGZpcnN0LlxuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgLy8gT3RoZXJ3aXNlLCBpZiBlaXRoZXIgb2YgdGhlbSA9PSBudWxsIHRoZXkgYXJlIG5vdCBlcXVhbC5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHJldHVybiAoXG4gICAgICBBcnJheS5pc0FycmF5KGIpICYmXG4gICAgICBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiZcbiAgICAgIGEuZXZlcnkoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlRXF1YWwoaXRlbSwgYltpbmRleF0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYVZhbHVlID0gdmFsdWVPZihhKTtcbiAgICB2YXIgYlZhbHVlID0gdmFsdWVPZihiKTtcblxuICAgIGlmIChhVmFsdWUgIT09IGEgfHwgYlZhbHVlICE9PSBiKSByZXR1cm4gdmFsdWVFcXVhbChhVmFsdWUsIGJWYWx1ZSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgYSwgYikpLmV2ZXJ5KGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHZhbHVlRXF1YWwoYVtrZXldLCBiW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWx1ZUVxdWFsO1xuIiwidmFyIGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG52YXIgcHJlZml4ID0gJ0ludmFyaWFudCBmYWlsZWQnO1xuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXggKyBcIjogXCIgKyAobWVzc2FnZSB8fCAnJykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludmFyaWFudDtcbiIsImltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCByZXNvbHZlUGF0aG5hbWUgZnJvbSAncmVzb2x2ZS1wYXRobmFtZSc7XG5pbXBvcnQgdmFsdWVFcXVhbCBmcm9tICd2YWx1ZS1lcXVhbCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aCA6ICcvJyArIHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBwYXRoLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwcmVmaXgudG9Mb3dlckNhc2UoKSkgPT09IDAgJiYgJy8/IycuaW5kZXhPZihwYXRoLmNoYXJBdChwcmVmaXgubGVuZ3RoKSkgIT09IC0xO1xufVxuZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkgPyBwYXRoLnN1YnN0cihwcmVmaXgubGVuZ3RoKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHBhdGhuYW1lID0gcGF0aCB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcblxuICBpZiAoaGFzaEluZGV4ICE9PSAtMSkge1xuICAgIGhhc2ggPSBwYXRobmFtZS5zdWJzdHIoaGFzaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBoYXNoSW5kZXgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignPycpO1xuXG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHIoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoID09PSAnPycgPyAnJyA6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoID09PSAnIycgPyAnJyA6IGhhc2hcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgdmFyIHBhdGggPSBwYXRobmFtZSB8fCAnLyc7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoICE9PSAnPycpIHBhdGggKz0gc2VhcmNoLmNoYXJBdCgwKSA9PT0gJz8nID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4gIGlmIChoYXNoICYmIGhhc2ggIT09ICcjJykgcGF0aCArPSBoYXNoLmNoYXJBdCgwKSA9PT0gJyMnID8gaGFzaCA6IFwiI1wiICsgaGFzaDtcbiAgcmV0dXJuIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXksIGN1cnJlbnRMb2NhdGlvbikge1xuICB2YXIgbG9jYXRpb247XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9IHBhcnNlUGF0aChwYXRoKTtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIC8vIE9uZS1hcmcgZm9ybTogcHVzaChsb2NhdGlvbilcbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBwYXRoKTtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24ucGF0aG5hbWUgPSAnJztcblxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2guY2hhckF0KDApICE9PSAnPycpIGxvY2F0aW9uLnNlYXJjaCA9ICc/JyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBsb2NhdGlvbi5oYXNoID0gJyMnICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLnN0YXRlID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICB0cnkge1xuICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgVVJJRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBVUklFcnJvcignUGF0aG5hbWUgXCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCIgY291bGQgbm90IGJlIGRlY29kZWQuICcgKyAnVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGFuIGludmFsaWQgcGVyY2VudC1lbmNvZGluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBpZiAoa2V5KSBsb2NhdGlvbi5rZXkgPSBrZXk7XG5cbiAgaWYgKGN1cnJlbnRMb2NhdGlvbikge1xuICAgIC8vIFJlc29sdmUgaW5jb21wbGV0ZS9yZWxhdGl2ZSBwYXRobmFtZSByZWxhdGl2ZSB0byBjdXJyZW50IGxvY2F0aW9uLlxuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gcmVzb2x2ZVBhdGhuYW1lKGxvY2F0aW9uLnBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHByaW9yIGxvY2F0aW9uIGFuZCBwYXRobmFtZSBpcyBlbXB0eSwgc2V0IGl0IHRvIC9cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9ICcvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbG9jYXRpb247XG59XG5mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaCAmJiBhLmtleSA9PT0gYi5rZXkgJiYgdmFsdWVFcXVhbChhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKSB7XG4gIHZhciBwcm9tcHQgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldFByb21wdChuZXh0UHJvbXB0KSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcm9tcHQgPT0gbnVsbCwgJ0EgaGlzdG9yeSBzdXBwb3J0cyBvbmx5IG9uZSBwcm9tcHQgYXQgYSB0aW1lJykgOiB2b2lkIDA7XG4gICAgcHJvbXB0ID0gbmV4dFByb21wdDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHByb21wdCA9PT0gbmV4dFByb21wdCkgcHJvbXB0ID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBjYWxsYmFjaykge1xuICAgIC8vIFRPRE86IElmIGFub3RoZXIgdHJhbnNpdGlvbiBzdGFydHMgd2hpbGUgd2UncmUgc3RpbGwgY29uZmlybWluZ1xuICAgIC8vIHRoZSBwcmV2aW91cyBvbmUsIHdlIG1heSBlbmQgdXAgaW4gYSB3ZWlyZCBzdGF0ZS4gRmlndXJlIG91dCB0aGVcbiAgICAvLyBiZXN0IHdheSB0byBoYW5kbGUgdGhpcy5cbiAgICBpZiAocHJvbXB0ICE9IG51bGwpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0eXBlb2YgcHJvbXB0ID09PSAnZnVuY3Rpb24nID8gcHJvbXB0KGxvY2F0aW9uLCBhY3Rpb24pIDogcHJvbXB0O1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRVc2VyQ29uZmlybWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihyZXN1bHQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnQSBoaXN0b3J5IG5lZWRzIGEgZ2V0VXNlckNvbmZpcm1hdGlvbiBmdW5jdGlvbiBpbiBvcmRlciB0byB1c2UgYSBwcm9tcHQgbWVzc2FnZScpIDogdm9pZCAwO1xuICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZmFsc2UgZnJvbSBhIHRyYW5zaXRpb24gaG9vayB0byBjYW5jZWwgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYXBwZW5kTGlzdGVuZXIoZm4pIHtcbiAgICB2YXIgaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoaXNBY3RpdmUpIGZuLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldFByb21wdDogc2V0UHJvbXB0LFxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG86IGNvbmZpcm1UcmFuc2l0aW9uVG8sXG4gICAgYXBwZW5kTGlzdGVuZXI6IGFwcGVuZExpc3RlbmVyLFxuICAgIG5vdGlmeUxpc3RlbmVyczogbm90aWZ5TGlzdGVuZXJzXG4gIH07XG59XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gZ2V0Q29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYnJvd3NlciBmaXJlcyBwb3BzdGF0ZSBvbiBoYXNoIGNoYW5nZS5cbiAqIElFMTAgYW5kIElFMTEgZG8gbm90LlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHVzaW5nIGdvKG4pIHdpdGggaGFzaCBoaXN0b3J5IGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBnaXZlbiBwb3BzdGF0ZSBldmVudCBpcyBhbiBleHRyYW5lb3VzIFdlYktpdCBldmVudC5cbiAqIEFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IENocm9tZSBvbiBpT1MgZmlyZXMgcmVhbCBwb3BzdGF0ZSBldmVudHNcbiAqIGNvbnRhaW5pbmcgdW5kZWZpbmVkIHN0YXRlIHdoZW4gcHJlc3NpbmcgdGhlIGJhY2sgYnV0dG9uLlxuICovXG5cbmZ1bmN0aW9uIGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LnN0YXRlID09PSB1bmRlZmluZWQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDcmlPUycpID09PSAtMTtcbn1cblxudmFyIFBvcFN0YXRlRXZlbnQgPSAncG9wc3RhdGUnO1xudmFyIEhhc2hDaGFuZ2VFdmVudCA9ICdoYXNoY2hhbmdlJztcblxuZnVuY3Rpb24gZ2V0SGlzdG9yeVN0YXRlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElFIDExIHNvbWV0aW1lcyB0aHJvd3Mgd2hlbiBhY2Nlc3Npbmcgd2luZG93Lmhpc3Rvcnkuc3RhdGVcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvaGlzdG9yeS9wdWxsLzI4OVxuICAgIHJldHVybiB7fTtcbiAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCB1c2VzIHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBpbmNsdWRpbmdcbiAqIHB1c2hTdGF0ZSwgcmVwbGFjZVN0YXRlLCBhbmQgdGhlIHBvcHN0YXRlIGV2ZW50LlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlQnJvd3Nlckhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0Jyb3dzZXIgaGlzdG9yeSBuZWVkcyBhIERPTScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhblVzZUhpc3RvcnkgPSBzdXBwb3J0c0hpc3RvcnkoKTtcbiAgdmFyIG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyID0gIXN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKTtcbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgX3Byb3BzJGZvcmNlUmVmcmVzaCA9IF9wcm9wcy5mb3JjZVJlZnJlc2gsXG4gICAgICBmb3JjZVJlZnJlc2ggPSBfcHJvcHMkZm9yY2VSZWZyZXNoID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRmb3JjZVJlZnJlc2gsXG4gICAgICBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPT09IHZvaWQgMCA/IGdldENvbmZpcm1hdGlvbiA6IF9wcm9wcyRnZXRVc2VyQ29uZmlybSxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBfcHJvcHMua2V5TGVuZ3RoLFxuICAgICAga2V5TGVuZ3RoID0gX3Byb3BzJGtleUxlbmd0aCA9PT0gdm9pZCAwID8gNiA6IF9wcm9wcyRrZXlMZW5ndGg7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oaGlzdG9yeVN0YXRlKSB7XG4gICAgdmFyIF9yZWYgPSBoaXN0b3J5U3RhdGUgfHwge30sXG4gICAgICAgIGtleSA9IF9yZWYua2V5LFxuICAgICAgICBzdGF0ZSA9IF9yZWYuc3RhdGU7XG5cbiAgICB2YXIgX3dpbmRvdyRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgICAgcGF0aG5hbWUgPSBfd2luZG93JGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICBzZWFyY2ggPSBfd2luZG93JGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgaGFzaCA9IF93aW5kb3ckbG9jYXRpb24uaGFzaDtcbiAgICB2YXIgcGF0aCA9IHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCFiYXNlbmFtZSB8fCBoYXNCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpIDogdm9pZCAwO1xuICAgIGlmIChiYXNlbmFtZSkgcGF0aCA9IHN0cmlwQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpO1xuICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwga2V5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGdsb2JhbEhpc3RvcnkubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3BTdGF0ZShldmVudCkge1xuICAgIC8vIElnbm9yZSBleHRyYW5lb3VzIHBvcHN0YXRlIGV2ZW50cyBpbiBXZWJLaXQuXG4gICAgaWYgKGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpKSByZXR1cm47XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGV2ZW50LnN0YXRlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIGhhbmRsZVBvcChnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSkpO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uOyAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIGtleXMgd2UndmUgc2VlbiBpbiBzZXNzaW9uU3RvcmFnZS5cbiAgICAvLyBJbnN0ZWFkLCB3ZSBqdXN0IGRlZmF1bHQgdG8gMCBmb3Iga2V5cyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxLZXlzLmluZGV4T2YodG9Mb2NhdGlvbi5rZXkpO1xuICAgIGlmICh0b0luZGV4ID09PSAtMSkgdG9JbmRleCA9IDA7XG4gICAgdmFyIGZyb21JbmRleCA9IGFsbEtleXMuaW5kZXhPZihmcm9tTG9jYXRpb24ua2V5KTtcbiAgICBpZiAoZnJvbUluZGV4ID09PSAtMSkgZnJvbUluZGV4ID0gMDtcbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSk7XG4gIHZhciBhbGxLZXlzID0gW2luaXRpYWxMb2NhdGlvbi5rZXldOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHJldHVybiBiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcHVzaCB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucHVzaFN0YXRlKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICB2YXIgbmV4dEtleXMgPSBhbGxLZXlzLnNsaWNlKDAsIHByZXZJbmRleCArIDEpO1xuICAgICAgICAgIG5leHRLZXlzLnB1c2gobG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBhbGxLZXlzID0gbmV4dEtleXM7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnQnJvd3NlciBoaXN0b3J5IGNhbm5vdCBwdXNoIHN0YXRlIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgSFRNTDUgaGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byByZXBsYWNlIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5yZXBsYWNlU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbEtleXMuaW5kZXhPZihoaXN0b3J5LmxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIGFsbEtleXNbcHJldkluZGV4XSA9IGxvY2F0aW9uLmtleTtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHJlcGxhY2Ugc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5JykgOiB2b2lkIDA7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGhyZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxICYmIGRlbHRhID09PSAxKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50LCBoYW5kbGVQb3BTdGF0ZSk7XG4gICAgICBpZiAobmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfSBlbHNlIGlmIChsaXN0ZW5lckNvdW50ID09PSAwKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50LCBoYW5kbGVQb3BTdGF0ZSk7XG4gICAgICBpZiAobmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIpIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgdmFyIHVubGlzdGVuID0gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB1bmxpc3RlbigpO1xuICAgIH07XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGdsb2JhbEhpc3RvcnkubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbixcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG52YXIgSGFzaENoYW5nZUV2ZW50JDEgPSAnaGFzaGNoYW5nZSc7XG52YXIgSGFzaFBhdGhDb2RlcnMgPSB7XG4gIGhhc2hiYW5nOiB7XG4gICAgZW5jb2RlUGF0aDogZnVuY3Rpb24gZW5jb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGggOiAnIS8nICsgc3RyaXBMZWFkaW5nU2xhc2gocGF0aCk7XG4gICAgfSxcbiAgICBkZWNvZGVQYXRoOiBmdW5jdGlvbiBkZWNvZGVQYXRoKHBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJyEnID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xuICAgIH1cbiAgfSxcbiAgbm9zbGFzaDoge1xuICAgIGVuY29kZVBhdGg6IHN0cmlwTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaFxuICB9LFxuICBzbGFzaDoge1xuICAgIGVuY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfVxufTtcblxuZnVuY3Rpb24gc3RyaXBIYXNoKHVybCkge1xuICB2YXIgaGFzaEluZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGhhc2hJbmRleCA9PT0gLTEgPyB1cmwgOiB1cmwuc2xpY2UoMCwgaGFzaEluZGV4KTtcbn1cblxuZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgdmFyIGhhc2hJbmRleCA9IGhyZWYuaW5kZXhPZignIycpO1xuICByZXR1cm4gaGFzaEluZGV4ID09PSAtMSA/ICcnIDogaHJlZi5zdWJzdHJpbmcoaGFzaEluZGV4ICsgMSk7XG59XG5cbmZ1bmN0aW9uIHB1c2hIYXNoUGF0aChwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUhhc2hQYXRoKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3RyaXBIYXNoKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSArICcjJyArIHBhdGgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIYXNoSGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnSGFzaCBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuR29XaXRob3V0UmVsb2FkID0gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKTtcbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgX3Byb3BzJGdldFVzZXJDb25maXJtID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB2b2lkIDAgPyBnZXRDb25maXJtYXRpb24gOiBfcHJvcHMkZ2V0VXNlckNvbmZpcm0sXG4gICAgICBfcHJvcHMkaGFzaFR5cGUgPSBfcHJvcHMuaGFzaFR5cGUsXG4gICAgICBoYXNoVHlwZSA9IF9wcm9wcyRoYXNoVHlwZSA9PT0gdm9pZCAwID8gJ3NsYXNoJyA6IF9wcm9wcyRoYXNoVHlwZTtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcbiAgdmFyIF9IYXNoUGF0aENvZGVycyRoYXNoVCA9IEhhc2hQYXRoQ29kZXJzW2hhc2hUeXBlXSxcbiAgICAgIGVuY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZW5jb2RlUGF0aCxcbiAgICAgIGRlY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZGVjb2RlUGF0aDtcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbigpIHtcbiAgICB2YXIgcGF0aCA9IGRlY29kZVBhdGgoZ2V0SGFzaFBhdGgoKSk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghYmFzZW5hbWUgfHwgaGFzQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpLCAnWW91IGFyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGJhc2VuYW1lIG9uIGEgcGFnZSB3aG9zZSBVUkwgcGF0aCBkb2VzIG5vdCBiZWdpbiAnICsgJ3dpdGggdGhlIGJhc2VuYW1lLiBFeHBlY3RlZCBwYXRoIFwiJyArIHBhdGggKyAnXCIgdG8gYmVnaW4gd2l0aCBcIicgKyBiYXNlbmFtZSArICdcIi4nKSA6IHZvaWQgMDtcbiAgICBpZiAoYmFzZW5hbWUpIHBhdGggPSBzdHJpcEJhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKTtcbiAgICByZXR1cm4gY3JlYXRlTG9jYXRpb24ocGF0aCk7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGdsb2JhbEhpc3RvcnkubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gIHZhciBpZ25vcmVQYXRoID0gbnVsbDtcblxuICBmdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbCQkMShhLCBiKSB7XG4gICAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmIGEuaGFzaCA9PT0gYi5oYXNoO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcblxuICAgIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkge1xuICAgICAgLy8gRW5zdXJlIHdlIGFsd2F5cyBoYXZlIGEgcHJvcGVybHktZW5jb2RlZCBoYXNoLlxuICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uO1xuICAgICAgaWYgKCFmb3JjZU5leHRQb3AgJiYgbG9jYXRpb25zQXJlRXF1YWwkJDEocHJldkxvY2F0aW9uLCBsb2NhdGlvbikpIHJldHVybjsgLy8gQSBoYXNoY2hhbmdlIGRvZXNuJ3QgYWx3YXlzID09IGxvY2F0aW9uIGNoYW5nZS5cblxuICAgICAgaWYgKGlnbm9yZVBhdGggPT09IGNyZWF0ZVBhdGgobG9jYXRpb24pKSByZXR1cm47IC8vIElnbm9yZSB0aGlzIGNoYW5nZTsgd2UgYWxyZWFkeSBzZXRTdGF0ZSBpbiBwdXNoL3JlcGxhY2UuXG5cbiAgICAgIGlnbm9yZVBhdGggPSBudWxsO1xuICAgICAgaGFuZGxlUG9wKGxvY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3AobG9jYXRpb24pIHtcbiAgICBpZiAoZm9yY2VOZXh0UG9wKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0UG9wKGZyb21Mb2NhdGlvbikge1xuICAgIHZhciB0b0xvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjsgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBwYXRocyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBwYXRocyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKHRvTG9jYXRpb24pKTtcbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuICAgIHZhciBmcm9tSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGZyb21Mb2NhdGlvbikpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9IC8vIEVuc3VyZSB0aGUgaGFzaCBpcyBlbmNvZGVkIHByb3Blcmx5IGJlZm9yZSBkb2luZyBhbnl0aGluZyBlbHNlLlxuXG5cbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICB2YXIgYWxsUGF0aHMgPSBbY3JlYXRlUGF0aChpbml0aWFsTG9jYXRpb24pXTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICB2YXIgYmFzZVRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKTtcbiAgICB2YXIgaHJlZiA9ICcnO1xuXG4gICAgaWYgKGJhc2VUYWcgJiYgYmFzZVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkge1xuICAgICAgaHJlZiA9IHN0cmlwSGFzaCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhyZWYgKyAnIycgKyBlbmNvZGVQYXRoKGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbikpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChiYXNlbmFtZSArIHBhdGgpO1xuICAgICAgdmFyIGhhc2hDaGFuZ2VkID0gZ2V0SGFzaFBhdGgoKSAhPT0gZW5jb2RlZFBhdGg7XG5cbiAgICAgIGlmIChoYXNoQ2hhbmdlZCkge1xuICAgICAgICAvLyBXZSBjYW5ub3QgdGVsbCBpZiBhIGhhc2hjaGFuZ2Ugd2FzIGNhdXNlZCBieSBhIFBVU0gsIHNvIHdlJ2RcbiAgICAgICAgLy8gcmF0aGVyIHNldFN0YXRlIGhlcmUgYW5kIGlnbm9yZSB0aGUgaGFzaGNoYW5nZS4gVGhlIGNhdmVhdCBoZXJlXG4gICAgICAgIC8vIGlzIHRoYXQgb3RoZXIgaGFzaCBoaXN0b3JpZXMgaW4gdGhlIHBhZ2Ugd2lsbCBjb25zaWRlciBpdCBhIFBPUC5cbiAgICAgICAgaWdub3JlUGF0aCA9IHBhdGg7XG4gICAgICAgIHB1c2hIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGhpc3RvcnkubG9jYXRpb24pKTtcbiAgICAgICAgdmFyIG5leHRQYXRocyA9IGFsbFBhdGhzLnNsaWNlKDAsIHByZXZJbmRleCArIDEpO1xuICAgICAgICBuZXh0UGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgYWxsUGF0aHMgPSBuZXh0UGF0aHM7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBQVVNIIHRoZSBzYW1lIHBhdGg7IGEgbmV3IGVudHJ5IHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IHN0YWNrJykgOiB2b2lkIDA7XG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUkVQTEFDRSwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsUGF0aHNbcHJldkluZGV4XSA9IHBhdGg7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoY2FuR29XaXRob3V0UmVsb2FkLCAnSGFzaCBoaXN0b3J5IGdvKG4pIGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQgaW4gdGhpcyBicm93c2VyJykgOiB2b2lkIDA7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG4sIGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sIGxvd2VyQm91bmQpLCB1cHBlckJvdW5kKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgc3RvcmVzIGxvY2F0aW9ucyBpbiBtZW1vcnkuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIF9wcm9wcyRpbml0aWFsRW50cmllcyA9IF9wcm9wcy5pbml0aWFsRW50cmllcyxcbiAgICAgIGluaXRpYWxFbnRyaWVzID0gX3Byb3BzJGluaXRpYWxFbnRyaWVzID09PSB2b2lkIDAgPyBbJy8nXSA6IF9wcm9wcyRpbml0aWFsRW50cmllcyxcbiAgICAgIF9wcm9wcyRpbml0aWFsSW5kZXggPSBfcHJvcHMuaW5pdGlhbEluZGV4LFxuICAgICAgaW5pdGlhbEluZGV4ID0gX3Byb3BzJGluaXRpYWxJbmRleCA9PT0gdm9pZCAwID8gMCA6IF9wcm9wcyRpbml0aWFsSW5kZXgsXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gX3Byb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHZvaWQgMCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgaW5kZXggPSBjbGFtcChpbml0aWFsSW5kZXgsIDAsIGluaXRpYWxFbnRyaWVzLmxlbmd0aCAtIDEpO1xuICB2YXIgZW50cmllcyA9IGluaXRpYWxFbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJyA/IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGNyZWF0ZUtleSgpKSA6IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGVudHJ5LmtleSB8fCBjcmVhdGVLZXkoKSk7XG4gIH0pOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgdmFyIGNyZWF0ZUhyZWYgPSBjcmVhdGVQYXRoO1xuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcHJldkluZGV4ID0gaGlzdG9yeS5pbmRleDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBwcmV2SW5kZXggKyAxO1xuICAgICAgdmFyIG5leHRFbnRyaWVzID0gaGlzdG9yeS5lbnRyaWVzLnNsaWNlKDApO1xuXG4gICAgICBpZiAobmV4dEVudHJpZXMubGVuZ3RoID4gbmV4dEluZGV4KSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnNwbGljZShuZXh0SW5kZXgsIG5leHRFbnRyaWVzLmxlbmd0aCAtIG5leHRJbmRleCwgbG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgICAgZW50cmllczogbmV4dEVudHJpZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIGhpc3RvcnkuZW50cmllc1toaXN0b3J5LmluZGV4XSA9IGxvY2F0aW9uO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gY2xhbXAoaGlzdG9yeS5pbmRleCArIG4sIDAsIGhpc3RvcnkuZW50cmllcy5sZW5ndGggLSAxKTtcbiAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgdmFyIGxvY2F0aW9uID0gaGlzdG9yeS5lbnRyaWVzW25leHRJbmRleF07XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNaW1pYyB0aGUgYmVoYXZpb3Igb2YgRE9NIGhpc3RvcmllcyBieVxuICAgICAgICAvLyBjYXVzaW5nIGEgcmVuZGVyIGFmdGVyIGEgY2FuY2VsbGVkIFBPUC5cbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5HbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGhpc3RvcnkuaW5kZXggKyBuO1xuICAgIHJldHVybiBuZXh0SW5kZXggPj0gMCAmJiBuZXh0SW5kZXggPCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBlbnRyaWVzLmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBlbnRyaWVzW2luZGV4XSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgZW50cmllczogZW50cmllcyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY2FuR286IGNhbkdvLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnksIGNyZWF0ZUhhc2hIaXN0b3J5LCBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIHBhcnNlUGF0aCwgY3JlYXRlUGF0aCB9O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBndWQgZnJvbSAnZ3VkJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5cbnZhciBNQVhfU0lHTkVEXzMxX0JJVF9JTlQgPSAxMDczNzQxODIzO1xuXG5mdW5jdGlvbiBvYmplY3RJcyh4LCB5KSB7XG4gIGlmICh4ID09PSB5KSB7XG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRXZlbnRFbWl0dGVyKHZhbHVlKSB7XG4gIHZhciBoYW5kbGVycyA9IFtdO1xuICByZXR1cm4ge1xuICAgIG9uOiBmdW5jdGlvbiBvbihoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIH0sXG4gICAgb2ZmOiBmdW5jdGlvbiBvZmYoaGFuZGxlcikge1xuICAgICAgaGFuZGxlcnMgPSBoYW5kbGVycy5maWx0ZXIoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIGggIT09IGhhbmRsZXI7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQobmV3VmFsdWUsIGNoYW5nZWRCaXRzKSB7XG4gICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gaGFuZGxlcih2YWx1ZSwgY2hhbmdlZEJpdHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW5bMF0gOiBjaGlsZHJlbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVhY3RDb250ZXh0KGRlZmF1bHRWYWx1ZSwgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIHtcbiAgdmFyIF9Qcm92aWRlciRjaGlsZENvbnRleCwgX0NvbnN1bWVyJGNvbnRleHRUeXBlO1xuXG4gIHZhciBjb250ZXh0UHJvcCA9ICdfX2NyZWF0ZS1yZWFjdC1jb250ZXh0LScgKyBndWQoKSArICdfXyc7XG5cbiAgdmFyIFByb3ZpZGVyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIF9pbmhlcml0c0xvb3NlKFByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFByb3ZpZGVyKCkge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfdGhpcyA9IF9Db21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMuZW1pdHRlciA9IGNyZWF0ZUV2ZW50RW1pdHRlcihfdGhpcy5wcm9wcy52YWx1ZSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90byA9IFByb3ZpZGVyLnByb3RvdHlwZTtcblxuICAgIF9wcm90by5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltjb250ZXh0UHJvcF0gPSB0aGlzLmVtaXR0ZXIsIF9yZWY7XG4gICAgfTtcblxuICAgIF9wcm90by5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlICE9PSBuZXh0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gbmV4dFByb3BzLnZhbHVlO1xuICAgICAgICB2YXIgY2hhbmdlZEJpdHM7XG5cbiAgICAgICAgaWYgKG9iamVjdElzKG9sZFZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICBjaGFuZ2VkQml0cyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbmdlZEJpdHMgPSB0eXBlb2YgY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPT09ICdmdW5jdGlvbicgPyBjYWxjdWxhdGVDaGFuZ2VkQml0cyhvbGRWYWx1ZSwgbmV3VmFsdWUpIDogTUFYX1NJR05FRF8zMV9CSVRfSU5UO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHdhcm5pbmcoKGNoYW5nZWRCaXRzICYgTUFYX1NJR05FRF8zMV9CSVRfSU5UKSA9PT0gY2hhbmdlZEJpdHMsICdjYWxjdWxhdGVDaGFuZ2VkQml0czogRXhwZWN0ZWQgdGhlIHJldHVybiB2YWx1ZSB0byBiZSBhICcgKyAnMzEtYml0IGludGVnZXIuIEluc3RlYWQgcmVjZWl2ZWQ6ICcgKyBjaGFuZ2VkQml0cyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hhbmdlZEJpdHMgfD0gMDtcblxuICAgICAgICAgIGlmIChjaGFuZ2VkQml0cyAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLnNldChuZXh0UHJvcHMudmFsdWUsIGNoYW5nZWRCaXRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvdmlkZXI7XG4gIH0oQ29tcG9uZW50KTtcblxuICBQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcyA9IChfUHJvdmlkZXIkY2hpbGRDb250ZXggPSB7fSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W2NvbnRleHRQcm9wXSA9IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4KTtcblxuICB2YXIgQ29uc3VtZXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQ29tcG9uZW50Mikge1xuICAgIF9pbmhlcml0c0xvb3NlKENvbnN1bWVyLCBfQ29tcG9uZW50Mik7XG5cbiAgICBmdW5jdGlvbiBDb25zdW1lcigpIHtcbiAgICAgIHZhciBfdGhpczI7XG5cbiAgICAgIF90aGlzMiA9IF9Db21wb25lbnQyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIF90aGlzMi5zdGF0ZSA9IHtcbiAgICAgICAgdmFsdWU6IF90aGlzMi5nZXRWYWx1ZSgpXG4gICAgICB9O1xuXG4gICAgICBfdGhpczIub25VcGRhdGUgPSBmdW5jdGlvbiAobmV3VmFsdWUsIGNoYW5nZWRCaXRzKSB7XG4gICAgICAgIHZhciBvYnNlcnZlZEJpdHMgPSBfdGhpczIub2JzZXJ2ZWRCaXRzIHwgMDtcblxuICAgICAgICBpZiAoKG9ic2VydmVkQml0cyAmIGNoYW5nZWRCaXRzKSAhPT0gMCkge1xuICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB2YWx1ZTogX3RoaXMyLmdldFZhbHVlKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIF90aGlzMjtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMiA9IENvbnN1bWVyLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gbmV4dFByb3BzLm9ic2VydmVkQml0cztcbiAgICAgIHRoaXMub2JzZXJ2ZWRCaXRzID0gb2JzZXJ2ZWRCaXRzID09PSB1bmRlZmluZWQgfHwgb2JzZXJ2ZWRCaXRzID09PSBudWxsID8gTUFYX1NJR05FRF8zMV9CSVRfSU5UIDogb2JzZXJ2ZWRCaXRzO1xuICAgIH07XG5cbiAgICBfcHJvdG8yLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXSkge1xuICAgICAgICB0aGlzLmNvbnRleHRbY29udGV4dFByb3BdLm9uKHRoaXMub25VcGRhdGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gdGhpcy5wcm9wcy5vYnNlcnZlZEJpdHM7XG4gICAgICB0aGlzLm9ic2VydmVkQml0cyA9IG9ic2VydmVkQml0cyA9PT0gdW5kZWZpbmVkIHx8IG9ic2VydmVkQml0cyA9PT0gbnVsbCA/IE1BWF9TSUdORURfMzFfQklUX0lOVCA6IG9ic2VydmVkQml0cztcbiAgICB9O1xuXG4gICAgX3Byb3RvMi5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5vZmYodGhpcy5vblVwZGF0ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzIuZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRleHRbY29udGV4dFByb3BdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRbY29udGV4dFByb3BdLmdldCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMi5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gb25seUNoaWxkKHRoaXMucHJvcHMuY2hpbGRyZW4pKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ29uc3VtZXI7XG4gIH0oQ29tcG9uZW50KTtcblxuICBDb25zdW1lci5jb250ZXh0VHlwZXMgPSAoX0NvbnN1bWVyJGNvbnRleHRUeXBlID0ge30sIF9Db25zdW1lciRjb250ZXh0VHlwZVtjb250ZXh0UHJvcF0gPSBQcm9wVHlwZXMub2JqZWN0LCBfQ29uc3VtZXIkY29udGV4dFR5cGUpO1xuICByZXR1cm4ge1xuICAgIFByb3ZpZGVyOiBQcm92aWRlcixcbiAgICBDb25zdW1lcjogQ29uc3VtZXJcbiAgfTtcbn1cblxudmFyIGluZGV4ID0gUmVhY3QuY3JlYXRlQ29udGV4dCB8fCBjcmVhdGVSZWFjdENvbnRleHQ7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIGNyZWF0ZVBhdGggfSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgY3JlYXRlQ29udGV4dCBmcm9tICdtaW5pLWNyZWF0ZS1yZWFjdC1jb250ZXh0JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tICdwYXRoLXRvLXJlZ2V4cCc7XG5pbXBvcnQgeyBpc1ZhbGlkRWxlbWVudFR5cGUgfSBmcm9tICdyZWFjdC1pcyc7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSc7XG5pbXBvcnQgaG9pc3RTdGF0aWNzIGZyb20gJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcblxuLy8gVE9ETzogUmVwbGFjZSB3aXRoIFJlYWN0LmNyZWF0ZUNvbnRleHQgb25jZSB3ZSBjYW4gYXNzdW1lIFJlYWN0IDE2K1xuXG52YXIgY3JlYXRlTmFtZWRDb250ZXh0ID0gZnVuY3Rpb24gY3JlYXRlTmFtZWRDb250ZXh0KG5hbWUpIHtcbiAgdmFyIGNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG4gIGNvbnRleHQuZGlzcGxheU5hbWUgPSBuYW1lO1xuICByZXR1cm4gY29udGV4dDtcbn07XG5cbnZhciBjb250ZXh0ID1cbi8qI19fUFVSRV9fKi9cbmNyZWF0ZU5hbWVkQ29udGV4dChcIlJvdXRlclwiKTtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHV0dGluZyBoaXN0b3J5IG9uIGNvbnRleHQuXG4gKi9cblxudmFyIFJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIFJvdXRlci5jb21wdXRlUm9vdE1hdGNoID0gZnVuY3Rpb24gY29tcHV0ZVJvb3RNYXRjaChwYXRobmFtZSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBcIi9cIixcbiAgICAgIHVybDogXCIvXCIsXG4gICAgICBwYXJhbXM6IHt9LFxuICAgICAgaXNFeGFjdDogcGF0aG5hbWUgPT09IFwiL1wiXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBSb3V0ZXIocHJvcHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxvY2F0aW9uOiBwcm9wcy5oaXN0b3J5LmxvY2F0aW9uXG4gICAgfTsgLy8gVGhpcyBpcyBhIGJpdCBvZiBhIGhhY2suIFdlIGhhdmUgdG8gc3RhcnQgbGlzdGVuaW5nIGZvciBsb2NhdGlvblxuICAgIC8vIGNoYW5nZXMgaGVyZSBpbiB0aGUgY29uc3RydWN0b3IgaW4gY2FzZSB0aGVyZSBhcmUgYW55IDxSZWRpcmVjdD5zXG4gICAgLy8gb24gdGhlIGluaXRpYWwgcmVuZGVyLiBJZiB0aGVyZSBhcmUsIHRoZXkgd2lsbCByZXBsYWNlL3B1c2ggd2hlblxuICAgIC8vIHRoZXkgbW91bnQgYW5kIHNpbmNlIGNETSBmaXJlcyBpbiBjaGlsZHJlbiBiZWZvcmUgcGFyZW50cywgd2UgbWF5XG4gICAgLy8gZ2V0IGEgbmV3IGxvY2F0aW9uIGJlZm9yZSB0aGUgPFJvdXRlcj4gaXMgbW91bnRlZC5cblxuICAgIF90aGlzLl9pc01vdW50ZWQgPSBmYWxzZTtcbiAgICBfdGhpcy5fcGVuZGluZ0xvY2F0aW9uID0gbnVsbDtcblxuICAgIGlmICghcHJvcHMuc3RhdGljQ29udGV4dCkge1xuICAgICAgX3RoaXMudW5saXN0ZW4gPSBwcm9wcy5oaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgaWYgKF90aGlzLl9pc01vdW50ZWQpIHtcbiAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5fcGVuZGluZ0xvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2lzTW91bnRlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fcGVuZGluZ0xvY2F0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbG9jYXRpb246IHRoaXMuX3BlbmRpbmdMb2NhdGlvblxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnVubGlzdGVuKSB0aGlzLnVubGlzdGVuKCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiB8fCBudWxsLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgaGlzdG9yeTogdGhpcy5wcm9wcy5oaXN0b3J5LFxuICAgICAgICBsb2NhdGlvbjogdGhpcy5zdGF0ZS5sb2NhdGlvbixcbiAgICAgICAgbWF0Y2g6IFJvdXRlci5jb21wdXRlUm9vdE1hdGNoKHRoaXMuc3RhdGUubG9jYXRpb24ucGF0aG5hbWUpLFxuICAgICAgICBzdGF0aWNDb250ZXh0OiB0aGlzLnByb3BzLnN0YXRpY0NvbnRleHRcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGhpc3Rvcnk6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBzdGF0aWNDb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcmV2UHJvcHMuaGlzdG9yeSA9PT0gdGhpcy5wcm9wcy5oaXN0b3J5LCBcIllvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgaGlzdG9yeT5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCBzdG9yZXMgbG9jYXRpb24gaW4gbWVtb3J5LlxuICovXG5cbnZhciBNZW1vcnlSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTWVtb3J5Um91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNZW1vcnlSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZU1lbW9yeUhpc3RvcnkoX3RoaXMucHJvcHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNZW1vcnlSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNZW1vcnlSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgTWVtb3J5Um91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBpbml0aWFsRW50cmllczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluaXRpYWxJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXG4gIH07XG5cbiAgTWVtb3J5Um91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPE1lbW9yeVJvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IE1lbW9yeVJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG52YXIgTGlmZWN5Y2xlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKExpZmVjeWNsZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTGlmZWN5Y2xlKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMaWZlY3ljbGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW91bnQpIHRoaXMucHJvcHMub25Nb3VudC5jYWxsKHRoaXMsIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGUpIHRoaXMucHJvcHMub25VcGRhdGUuY2FsbCh0aGlzLCB0aGlzLCBwcmV2UHJvcHMpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uVW5tb3VudCkgdGhpcy5wcm9wcy5vblVubW91bnQuY2FsbCh0aGlzLCB0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBMaWZlY3ljbGU7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHByb21wdGluZyB0aGUgdXNlciBiZWZvcmUgbmF2aWdhdGluZyBhd2F5IGZyb20gYSBzY3JlZW4uXG4gKi9cblxuZnVuY3Rpb24gUHJvbXB0KF9yZWYpIHtcbiAgdmFyIG1lc3NhZ2UgPSBfcmVmLm1lc3NhZ2UsXG4gICAgICBfcmVmJHdoZW4gPSBfcmVmLndoZW4sXG4gICAgICB3aGVuID0gX3JlZiR3aGVuID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZiR3aGVuO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8UHJvbXB0PiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIGlmICghd2hlbiB8fCBjb250ZXh0LnN0YXRpY0NvbnRleHQpIHJldHVybiBudWxsO1xuICAgIHZhciBtZXRob2QgPSBjb250ZXh0Lmhpc3RvcnkuYmxvY2s7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlmZWN5Y2xlLCB7XG4gICAgICBvbk1vdW50OiBmdW5jdGlvbiBvbk1vdW50KHNlbGYpIHtcbiAgICAgICAgc2VsZi5yZWxlYXNlID0gbWV0aG9kKG1lc3NhZ2UpO1xuICAgICAgfSxcbiAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShzZWxmLCBwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5tZXNzYWdlICE9PSBtZXNzYWdlKSB7XG4gICAgICAgICAgc2VsZi5yZWxlYXNlKCk7XG4gICAgICAgICAgc2VsZi5yZWxlYXNlID0gbWV0aG9kKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25Vbm1vdW50OiBmdW5jdGlvbiBvblVubW91bnQoc2VsZikge1xuICAgICAgICBzZWxmLnJlbGVhc2UoKTtcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciBtZXNzYWdlVHlwZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuc3RyaW5nXSk7XG4gIFByb21wdC5wcm9wVHlwZXMgPSB7XG4gICAgd2hlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWVzc2FnZTogbWVzc2FnZVR5cGUuaXNSZXF1aXJlZFxuICB9O1xufVxuXG52YXIgY2FjaGUgPSB7fTtcbnZhciBjYWNoZUxpbWl0ID0gMTAwMDA7XG52YXIgY2FjaGVDb3VudCA9IDA7XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXRoKHBhdGgpIHtcbiAgaWYgKGNhY2hlW3BhdGhdKSByZXR1cm4gY2FjaGVbcGF0aF07XG4gIHZhciBnZW5lcmF0b3IgPSBwYXRoVG9SZWdleHAuY29tcGlsZShwYXRoKTtcblxuICBpZiAoY2FjaGVDb3VudCA8IGNhY2hlTGltaXQpIHtcbiAgICBjYWNoZVtwYXRoXSA9IGdlbmVyYXRvcjtcbiAgICBjYWNoZUNvdW50Kys7XG4gIH1cblxuICByZXR1cm4gZ2VuZXJhdG9yO1xufVxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBnZW5lcmF0aW5nIGEgVVJMIHBhdGhuYW1lIGZyb20gYSBwYXRoIGFuZCBwYXJhbWV0ZXJzLlxuICovXG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVQYXRoKHBhdGgsIHBhcmFtcykge1xuICBpZiAocGF0aCA9PT0gdm9pZCAwKSB7XG4gICAgcGF0aCA9IFwiL1wiO1xuICB9XG5cbiAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7XG4gICAgcGFyYW1zID0ge307XG4gIH1cblxuICByZXR1cm4gcGF0aCA9PT0gXCIvXCIgPyBwYXRoIDogY29tcGlsZVBhdGgocGF0aCkocGFyYW1zLCB7XG4gICAgcHJldHR5OiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBuYXZpZ2F0aW5nIHByb2dyYW1tYXRpY2FsbHkgd2l0aCBhIGNvbXBvbmVudC5cbiAqL1xuXG5mdW5jdGlvbiBSZWRpcmVjdChfcmVmKSB7XG4gIHZhciBjb21wdXRlZE1hdGNoID0gX3JlZi5jb21wdXRlZE1hdGNoLFxuICAgICAgdG8gPSBfcmVmLnRvLFxuICAgICAgX3JlZiRwdXNoID0gX3JlZi5wdXNoLFxuICAgICAgcHVzaCA9IF9yZWYkcHVzaCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJHB1c2g7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgIWNvbnRleHQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxSZWRpcmVjdD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgaGlzdG9yeSA9IGNvbnRleHQuaGlzdG9yeSxcbiAgICAgICAgc3RhdGljQ29udGV4dCA9IGNvbnRleHQuc3RhdGljQ29udGV4dDtcbiAgICB2YXIgbWV0aG9kID0gcHVzaCA/IGhpc3RvcnkucHVzaCA6IGhpc3RvcnkucmVwbGFjZTtcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihjb21wdXRlZE1hdGNoID8gdHlwZW9mIHRvID09PSBcInN0cmluZ1wiID8gZ2VuZXJhdGVQYXRoKHRvLCBjb21wdXRlZE1hdGNoLnBhcmFtcykgOiBfZXh0ZW5kcyh7fSwgdG8sIHtcbiAgICAgIHBhdGhuYW1lOiBnZW5lcmF0ZVBhdGgodG8ucGF0aG5hbWUsIGNvbXB1dGVkTWF0Y2gucGFyYW1zKVxuICAgIH0pIDogdG8pOyAvLyBXaGVuIHJlbmRlcmluZyBpbiBhIHN0YXRpYyBjb250ZXh0LFxuICAgIC8vIHNldCB0aGUgbmV3IGxvY2F0aW9uIGltbWVkaWF0ZWx5LlxuXG4gICAgaWYgKHN0YXRpY0NvbnRleHQpIHtcbiAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaWZlY3ljbGUsIHtcbiAgICAgIG9uTW91bnQ6IGZ1bmN0aW9uIG9uTW91bnQoKSB7XG4gICAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICB9LFxuICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKHNlbGYsIHByZXZQcm9wcykge1xuICAgICAgICB2YXIgcHJldkxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocHJldlByb3BzLnRvKTtcblxuICAgICAgICBpZiAoIWxvY2F0aW9uc0FyZUVxdWFsKHByZXZMb2NhdGlvbiwgX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgICAgICAga2V5OiBwcmV2TG9jYXRpb24ua2V5XG4gICAgICAgIH0pKSkge1xuICAgICAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0bzogdG9cbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUmVkaXJlY3QucHJvcFR5cGVzID0ge1xuICAgIHB1c2g6IFByb3BUeXBlcy5ib29sLFxuICAgIGZyb206IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG86IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBjYWNoZSQxID0ge307XG52YXIgY2FjaGVMaW1pdCQxID0gMTAwMDA7XG52YXIgY2FjaGVDb3VudCQxID0gMDtcblxuZnVuY3Rpb24gY29tcGlsZVBhdGgkMShwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZUtleSA9IFwiXCIgKyBvcHRpb25zLmVuZCArIG9wdGlvbnMuc3RyaWN0ICsgb3B0aW9ucy5zZW5zaXRpdmU7XG4gIHZhciBwYXRoQ2FjaGUgPSBjYWNoZSQxW2NhY2hlS2V5XSB8fCAoY2FjaGUkMVtjYWNoZUtleV0gPSB7fSk7XG4gIGlmIChwYXRoQ2FjaGVbcGF0aF0pIHJldHVybiBwYXRoQ2FjaGVbcGF0aF07XG4gIHZhciBrZXlzID0gW107XG4gIHZhciByZWdleHAgPSBwYXRoVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucyk7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgcmVnZXhwOiByZWdleHAsXG4gICAga2V5czoga2V5c1xuICB9O1xuXG4gIGlmIChjYWNoZUNvdW50JDEgPCBjYWNoZUxpbWl0JDEpIHtcbiAgICBwYXRoQ2FjaGVbcGF0aF0gPSByZXN1bHQ7XG4gICAgY2FjaGVDb3VudCQxKys7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBtYXRjaGluZyBhIFVSTCBwYXRobmFtZSB0byBhIHBhdGguXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaFBhdGgocGF0aG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHBhdGg6IG9wdGlvbnNcbiAgICB9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBhdGggPSBfb3B0aW9ucy5wYXRoLFxuICAgICAgX29wdGlvbnMkZXhhY3QgPSBfb3B0aW9ucy5leGFjdCxcbiAgICAgIGV4YWN0ID0gX29wdGlvbnMkZXhhY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkZXhhY3QsXG4gICAgICBfb3B0aW9ucyRzdHJpY3QgPSBfb3B0aW9ucy5zdHJpY3QsXG4gICAgICBzdHJpY3QgPSBfb3B0aW9ucyRzdHJpY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkc3RyaWN0LFxuICAgICAgX29wdGlvbnMkc2Vuc2l0aXZlID0gX29wdGlvbnMuc2Vuc2l0aXZlLFxuICAgICAgc2Vuc2l0aXZlID0gX29wdGlvbnMkc2Vuc2l0aXZlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJHNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhzID0gW10uY29uY2F0KHBhdGgpO1xuICByZXR1cm4gcGF0aHMucmVkdWNlKGZ1bmN0aW9uIChtYXRjaGVkLCBwYXRoKSB7XG4gICAgaWYgKCFwYXRoICYmIHBhdGggIT09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIGlmIChtYXRjaGVkKSByZXR1cm4gbWF0Y2hlZDtcblxuICAgIHZhciBfY29tcGlsZVBhdGggPSBjb21waWxlUGF0aCQxKHBhdGgsIHtcbiAgICAgIGVuZDogZXhhY3QsXG4gICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgIHNlbnNpdGl2ZTogc2Vuc2l0aXZlXG4gICAgfSksXG4gICAgICAgIHJlZ2V4cCA9IF9jb21waWxlUGF0aC5yZWdleHAsXG4gICAgICAgIGtleXMgPSBfY29tcGlsZVBhdGgua2V5cztcblxuICAgIHZhciBtYXRjaCA9IHJlZ2V4cC5leGVjKHBhdGhuYW1lKTtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgdXJsID0gbWF0Y2hbMF0sXG4gICAgICAgIHZhbHVlcyA9IG1hdGNoLnNsaWNlKDEpO1xuICAgIHZhciBpc0V4YWN0ID0gcGF0aG5hbWUgPT09IHVybDtcbiAgICBpZiAoZXhhY3QgJiYgIWlzRXhhY3QpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgLy8gdGhlIHBhdGggdXNlZCB0byBtYXRjaFxuICAgICAgdXJsOiBwYXRoID09PSBcIi9cIiAmJiB1cmwgPT09IFwiXCIgPyBcIi9cIiA6IHVybCxcbiAgICAgIC8vIHRoZSBtYXRjaGVkIHBvcnRpb24gb2YgdGhlIFVSTFxuICAgICAgaXNFeGFjdDogaXNFeGFjdCxcbiAgICAgIC8vIHdoZXRoZXIgb3Igbm90IHdlIG1hdGNoZWQgZXhhY3RseVxuICAgICAgcGFyYW1zOiBrZXlzLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5LCBpbmRleCkge1xuICAgICAgICBtZW1vW2tleS5uYW1lXSA9IHZhbHVlc1tpbmRleF07XG4gICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgfSwge30pXG4gICAgfTtcbiAgfSwgbnVsbCk7XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHlDaGlsZHJlbihjaGlsZHJlbikge1xuICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID09PSAwO1xufVxuXG5mdW5jdGlvbiBldmFsQ2hpbGRyZW5EZXYoY2hpbGRyZW4sIHByb3BzLCBwYXRoKSB7XG4gIHZhciB2YWx1ZSA9IGNoaWxkcmVuKHByb3BzKTtcbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyh2YWx1ZSAhPT0gdW5kZWZpbmVkLCBcIllvdSByZXR1cm5lZCBgdW5kZWZpbmVkYCBmcm9tIHRoZSBgY2hpbGRyZW5gIGZ1bmN0aW9uIG9mIFwiICsgKFwiPFJvdXRlXCIgKyAocGF0aCA/IFwiIHBhdGg9XFxcIlwiICsgcGF0aCArIFwiXFxcIlwiIDogXCJcIikgKyBcIj4sIGJ1dCB5b3UgXCIpICsgXCJzaG91bGQgaGF2ZSByZXR1cm5lZCBhIFJlYWN0IGVsZW1lbnQgb3IgYG51bGxgXCIpIDogdm9pZCAwO1xuICByZXR1cm4gdmFsdWUgfHwgbnVsbDtcbn1cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgc2luZ2xlIHBhdGggYW5kIHJlbmRlcmluZy5cbiAqL1xuXG5cbnZhciBSb3V0ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUm91dGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQxKSB7XG4gICAgICAhY29udGV4dCQxID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGU+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB2YXIgbG9jYXRpb24gPSBfdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCBjb250ZXh0JDEubG9jYXRpb247XG4gICAgICB2YXIgbWF0Y2ggPSBfdGhpcy5wcm9wcy5jb21wdXRlZE1hdGNoID8gX3RoaXMucHJvcHMuY29tcHV0ZWRNYXRjaCAvLyA8U3dpdGNoPiBhbHJlYWR5IGNvbXB1dGVkIHRoZSBtYXRjaCBmb3IgdXNcbiAgICAgIDogX3RoaXMucHJvcHMucGF0aCA/IG1hdGNoUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgX3RoaXMucHJvcHMpIDogY29udGV4dCQxLm1hdGNoO1xuXG4gICAgICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgY29udGV4dCQxLCB7XG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgbWF0Y2g6IG1hdGNoXG4gICAgICB9KTtcblxuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfdGhpcyRwcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICBjb21wb25lbnQgPSBfdGhpcyRwcm9wcy5jb21wb25lbnQsXG4gICAgICAgICAgcmVuZGVyID0gX3RoaXMkcHJvcHMucmVuZGVyOyAvLyBQcmVhY3QgdXNlcyBhbiBlbXB0eSBhcnJheSBhcyBjaGlsZHJlbiBieVxuICAgICAgLy8gZGVmYXVsdCwgc28gdXNlIG51bGwgaWYgdGhhdCdzIHRoZSBjYXNlLlxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Qcm92aWRlciwge1xuICAgICAgICB2YWx1ZTogcHJvcHNcbiAgICAgIH0sIHByb3BzLm1hdGNoID8gY2hpbGRyZW4gPyB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGV2YWxDaGlsZHJlbkRldihjaGlsZHJlbiwgcHJvcHMsIF90aGlzLnByb3BzLnBhdGgpIDogY2hpbGRyZW4ocHJvcHMpIDogY2hpbGRyZW4gOiBjb21wb25lbnQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpIDogcmVuZGVyID8gcmVuZGVyKHByb3BzKSA6IG51bGwgOiB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGV2YWxDaGlsZHJlbkRldihjaGlsZHJlbiwgcHJvcHMsIF90aGlzLnByb3BzLnBhdGgpIDogY2hpbGRyZW4ocHJvcHMpIDogbnVsbCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJvdXRlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY29tcG9uZW50OiBmdW5jdGlvbiBjb21wb25lbnQocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdICYmICFpc1ZhbGlkRWxlbWVudFR5cGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCBwcm9wICdjb21wb25lbnQnIHN1cHBsaWVkIHRvICdSb3V0ZSc6IHRoZSBwcm9wIGlzIG5vdCBhIHZhbGlkIFJlYWN0IGNvbXBvbmVudFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwYXRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKV0pLFxuICAgIHJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2Vuc2l0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3Q6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5jb21wb25lbnQpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIGNvbXBvbmVudD4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5yZW5kZXIpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgcmVuZGVyPiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNvbXBvbmVudCAmJiB0aGlzLnByb3BzLnJlbmRlciksIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSBjb21wb25lbnQ+IGFuZCA8Um91dGUgcmVuZGVyPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgcHJvdmlkZWQgYSBcImxvY2F0aW9uXCIgcHJvcCBpbml0aWFsbHkgYnV0IG9taXR0ZWQgaXQgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSBcIi9cIiA/IHBhdGggOiBcIi9cIiArIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICBwYXRobmFtZTogYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKSArIGxvY2F0aW9uLnBhdGhuYW1lXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHZhciBiYXNlID0gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKTtcbiAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZSkgIT09IDApIHJldHVybiBsb2NhdGlvbjtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHIoYmFzZS5sZW5ndGgpXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVUkwobG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGxvY2F0aW9uIDogY3JlYXRlUGF0aChsb2NhdGlvbik7XG59XG5cbmZ1bmN0aW9uIHN0YXRpY0hhbmRsZXIobWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IGNhbm5vdCAlcyB3aXRoIDxTdGF0aWNSb3V0ZXI+XCIsIG1ldGhvZE5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuLyoqXG4gKiBUaGUgcHVibGljIHRvcC1sZXZlbCBBUEkgZm9yIGEgXCJzdGF0aWNcIiA8Um91dGVyPiwgc28tY2FsbGVkIGJlY2F1c2UgaXRcbiAqIGNhbid0IGFjdHVhbGx5IGNoYW5nZSB0aGUgY3VycmVudCBsb2NhdGlvbi4gSW5zdGVhZCwgaXQganVzdCByZWNvcmRzXG4gKiBsb2NhdGlvbiBjaGFuZ2VzIGluIGEgY29udGV4dCBvYmplY3QuIFVzZWZ1bCBtYWlubHkgaW4gdGVzdGluZyBhbmRcbiAqIHNlcnZlci1yZW5kZXJpbmcgc2NlbmFyaW9zLlxuICovXG5cblxudmFyIFN0YXRpY1JvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShTdGF0aWNSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN0YXRpY1JvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcblxuICAgIF90aGlzLmhhbmRsZVB1c2ggPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBfdGhpcy5uYXZpZ2F0ZVRvKGxvY2F0aW9uLCBcIlBVU0hcIik7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZVJlcGxhY2UgPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBfdGhpcy5uYXZpZ2F0ZVRvKGxvY2F0aW9uLCBcIlJFUExBQ0VcIik7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3RhdGljUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ubmF2aWdhdGVUbyA9IGZ1bmN0aW9uIG5hdmlnYXRlVG8obG9jYXRpb24sIGFjdGlvbikge1xuICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIF90aGlzJHByb3BzJGJhc2VuYW1lID0gX3RoaXMkcHJvcHMuYmFzZW5hbWUsXG4gICAgICAgIGJhc2VuYW1lID0gX3RoaXMkcHJvcHMkYmFzZW5hbWUgPT09IHZvaWQgMCA/IFwiXCIgOiBfdGhpcyRwcm9wcyRiYXNlbmFtZSxcbiAgICAgICAgX3RoaXMkcHJvcHMkY29udGV4dCA9IF90aGlzJHByb3BzLmNvbnRleHQsXG4gICAgICAgIGNvbnRleHQgPSBfdGhpcyRwcm9wcyRjb250ZXh0ID09PSB2b2lkIDAgPyB7fSA6IF90aGlzJHByb3BzJGNvbnRleHQ7XG4gICAgY29udGV4dC5hY3Rpb24gPSBhY3Rpb247XG4gICAgY29udGV4dC5sb2NhdGlvbiA9IGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpO1xuICAgIGNvbnRleHQudXJsID0gY3JlYXRlVVJMKGNvbnRleHQubG9jYXRpb24pO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzJHByb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgIF90aGlzJHByb3BzMiRiYXNlbmFtZSA9IF90aGlzJHByb3BzMi5iYXNlbmFtZSxcbiAgICAgICAgYmFzZW5hbWUgPSBfdGhpcyRwcm9wczIkYmFzZW5hbWUgPT09IHZvaWQgMCA/IFwiXCIgOiBfdGhpcyRwcm9wczIkYmFzZW5hbWUsXG4gICAgICAgIF90aGlzJHByb3BzMiRjb250ZXh0ID0gX3RoaXMkcHJvcHMyLmNvbnRleHQsXG4gICAgICAgIGNvbnRleHQgPSBfdGhpcyRwcm9wczIkY29udGV4dCA9PT0gdm9pZCAwID8ge30gOiBfdGhpcyRwcm9wczIkY29udGV4dCxcbiAgICAgICAgX3RoaXMkcHJvcHMyJGxvY2F0aW9uID0gX3RoaXMkcHJvcHMyLmxvY2F0aW9uLFxuICAgICAgICBsb2NhdGlvbiA9IF90aGlzJHByb3BzMiRsb2NhdGlvbiA9PT0gdm9pZCAwID8gXCIvXCIgOiBfdGhpcyRwcm9wczIkbG9jYXRpb24sXG4gICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wczIsIFtcImJhc2VuYW1lXCIsIFwiY29udGV4dFwiLCBcImxvY2F0aW9uXCJdKTtcblxuICAgIHZhciBoaXN0b3J5ID0ge1xuICAgICAgY3JlYXRlSHJlZjogZnVuY3Rpb24gY3JlYXRlSHJlZihwYXRoKSB7XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nU2xhc2goYmFzZW5hbWUgKyBjcmVhdGVVUkwocGF0aCkpO1xuICAgICAgfSxcbiAgICAgIGFjdGlvbjogXCJQT1BcIixcbiAgICAgIGxvY2F0aW9uOiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpLFxuICAgICAgcHVzaDogdGhpcy5oYW5kbGVQdXNoLFxuICAgICAgcmVwbGFjZTogdGhpcy5oYW5kbGVSZXBsYWNlLFxuICAgICAgZ286IHN0YXRpY0hhbmRsZXIoXCJnb1wiKSxcbiAgICAgIGdvQmFjazogc3RhdGljSGFuZGxlcihcImdvQmFja1wiKSxcbiAgICAgIGdvRm9yd2FyZDogc3RhdGljSGFuZGxlcihcImdvRm9yd2FyZFwiKSxcbiAgICAgIGxpc3RlbjogdGhpcy5oYW5kbGVMaXN0ZW4sXG4gICAgICBibG9jazogdGhpcy5oYW5kbGVCbG9ja1xuICAgIH07XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgaGlzdG9yeTogaGlzdG9yeSxcbiAgICAgIHN0YXRpY0NvbnRleHQ6IGNvbnRleHRcbiAgICB9KSk7XG4gIH07XG5cbiAgcmV0dXJuIFN0YXRpY1JvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBTdGF0aWNSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKVxuICB9O1xuXG4gIFN0YXRpY1JvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxTdGF0aWNSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBTdGF0aWNSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIHRoZSBmaXJzdCA8Um91dGU+IHRoYXQgbWF0Y2hlcy5cbiAqL1xuXG52YXIgU3dpdGNoID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFN3aXRjaCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU3dpdGNoKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTd2l0Y2gucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAhY29udGV4dCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFN3aXRjaD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IF90aGlzLnByb3BzLmxvY2F0aW9uIHx8IGNvbnRleHQubG9jYXRpb247XG4gICAgICB2YXIgZWxlbWVudCwgbWF0Y2g7IC8vIFdlIHVzZSBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoIGluc3RlYWQgb2YgUmVhY3QuQ2hpbGRyZW4udG9BcnJheSgpLmZpbmQoKVxuICAgICAgLy8gaGVyZSBiZWNhdXNlIHRvQXJyYXkgYWRkcyBrZXlzIHRvIGFsbCBjaGlsZCBlbGVtZW50cyBhbmQgd2UgZG8gbm90IHdhbnRcbiAgICAgIC8vIHRvIHRyaWdnZXIgYW4gdW5tb3VudC9yZW1vdW50IGZvciB0d28gPFJvdXRlPnMgdGhhdCByZW5kZXIgdGhlIHNhbWVcbiAgICAgIC8vIGNvbXBvbmVudCBhdCBkaWZmZXJlbnQgVVJMcy5cblxuICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChfdGhpcy5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsICYmIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIGVsZW1lbnQgPSBjaGlsZDtcbiAgICAgICAgICB2YXIgcGF0aCA9IGNoaWxkLnByb3BzLnBhdGggfHwgY2hpbGQucHJvcHMuZnJvbTtcbiAgICAgICAgICBtYXRjaCA9IHBhdGggPyBtYXRjaFBhdGgobG9jYXRpb24ucGF0aG5hbWUsIF9leHRlbmRzKHt9LCBjaGlsZC5wcm9wcywge1xuICAgICAgICAgICAgcGF0aDogcGF0aFxuICAgICAgICAgIH0pKSA6IGNvbnRleHQubWF0Y2g7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoID8gUmVhY3QuY2xvbmVFbGVtZW50KGVsZW1lbnQsIHtcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBjb21wdXRlZE1hdGNoOiBtYXRjaFxuICAgICAgfSkgOiBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTd2l0Y2g7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgU3dpdGNoLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBTd2l0Y2gucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodGhpcy5wcm9wcy5sb2NhdGlvbiAmJiAhcHJldlByb3BzLmxvY2F0aW9uKSwgJzxTd2l0Y2g+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IHByb3ZpZGVkIGEgXCJsb2NhdGlvblwiIHByb3AgaW5pdGlhbGx5IGJ1dCBvbWl0dGVkIGl0IG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogQSBwdWJsaWMgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0byBhY2Nlc3MgdGhlIGltcGVyYXRpdmUgQVBJXG4gKi9cblxuZnVuY3Rpb24gd2l0aFJvdXRlcihDb21wb25lbnQpIHtcbiAgdmFyIGRpc3BsYXlOYW1lID0gXCJ3aXRoUm91dGVyKFwiICsgKENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSkgKyBcIilcIjtcblxuICB2YXIgQyA9IGZ1bmN0aW9uIEMocHJvcHMpIHtcbiAgICB2YXIgd3JhcHBlZENvbXBvbmVudFJlZiA9IHByb3BzLndyYXBwZWRDb21wb25lbnRSZWYsXG4gICAgICAgIHJlbWFpbmluZ1Byb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UocHJvcHMsIFtcIndyYXBwZWRDb21wb25lbnRSZWZcIl0pO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8XCIgKyBkaXNwbGF5TmFtZSArIFwiIC8+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHt9LCByZW1haW5pbmdQcm9wcywgY29udGV4dCwge1xuICAgICAgICByZWY6IHdyYXBwZWRDb21wb25lbnRSZWZcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBDLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gIEMuV3JhcHBlZENvbXBvbmVudCA9IENvbXBvbmVudDtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgQy5wcm9wVHlwZXMgPSB7XG4gICAgICB3cmFwcGVkQ29tcG9uZW50UmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm9iamVjdF0pXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBob2lzdFN0YXRpY3MoQywgQ29tcG9uZW50KTtcbn1cblxudmFyIHVzZUNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0O1xuZnVuY3Rpb24gdXNlSGlzdG9yeSgpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICEodHlwZW9mIHVzZUNvbnRleHQgPT09IFwiZnVuY3Rpb25cIikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IG11c3QgdXNlIFJlYWN0ID49IDE2LjggaW4gb3JkZXIgdG8gdXNlIHVzZUhpc3RvcnkoKVwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cblxuICByZXR1cm4gdXNlQ29udGV4dChjb250ZXh0KS5oaXN0b3J5O1xufVxuZnVuY3Rpb24gdXNlTG9jYXRpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAhKHR5cGVvZiB1c2VDb250ZXh0ID09PSBcImZ1bmN0aW9uXCIpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBtdXN0IHVzZSBSZWFjdCA+PSAxNi44IGluIG9yZGVyIHRvIHVzZSB1c2VMb2NhdGlvbigpXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG4gIHJldHVybiB1c2VDb250ZXh0KGNvbnRleHQpLmxvY2F0aW9uO1xufVxuZnVuY3Rpb24gdXNlUGFyYW1zKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgISh0eXBlb2YgdXNlQ29udGV4dCA9PT0gXCJmdW5jdGlvblwiKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3UgbXVzdCB1c2UgUmVhY3QgPj0gMTYuOCBpbiBvcmRlciB0byB1c2UgdXNlUGFyYW1zKClcIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG5cbiAgdmFyIG1hdGNoID0gdXNlQ29udGV4dChjb250ZXh0KS5tYXRjaDtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2gucGFyYW1zIDoge307XG59XG5mdW5jdGlvbiB1c2VSb3V0ZU1hdGNoKHBhdGgpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICEodHlwZW9mIHVzZUNvbnRleHQgPT09IFwiZnVuY3Rpb25cIikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IG11c3QgdXNlIFJlYWN0ID49IDE2LjggaW4gb3JkZXIgdG8gdXNlIHVzZU1hdGNoKClcIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG5cbiAgcmV0dXJuIHBhdGggPyBtYXRjaFBhdGgodXNlTG9jYXRpb24oKS5wYXRobmFtZSwgcGF0aCkgOiB1c2VDb250ZXh0KGNvbnRleHQpLm1hdGNoO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIGdsb2JhbCA9IHdpbmRvdztcbiAgICB2YXIga2V5ID0gXCJfX3JlYWN0X3JvdXRlcl9idWlsZF9fXCI7XG4gICAgdmFyIGJ1aWxkTmFtZXMgPSB7XG4gICAgICBjanM6IFwiQ29tbW9uSlNcIixcbiAgICAgIGVzbTogXCJFUyBtb2R1bGVzXCIsXG4gICAgICB1bWQ6IFwiVU1EXCJcbiAgICB9O1xuXG4gICAgaWYgKGdsb2JhbFtrZXldICYmIGdsb2JhbFtrZXldICE9PSBcImVzbVwiKSB7XG4gICAgICB2YXIgaW5pdGlhbEJ1aWxkTmFtZSA9IGJ1aWxkTmFtZXNbZ2xvYmFsW2tleV1dO1xuICAgICAgdmFyIHNlY29uZGFyeUJ1aWxkTmFtZSA9IGJ1aWxkTmFtZXNbXCJlc21cIl07IC8vIFRPRE86IEFkZCBsaW5rIHRvIGFydGljbGUgdGhhdCBleHBsYWlucyBpbiBkZXRhaWwgaG93IHRvIGF2b2lkXG4gICAgICAvLyBsb2FkaW5nIDIgZGlmZmVyZW50IGJ1aWxkcy5cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGFyZSBsb2FkaW5nIHRoZSBcIiArIHNlY29uZGFyeUJ1aWxkTmFtZSArIFwiIGJ1aWxkIG9mIFJlYWN0IFJvdXRlciBcIiArIChcIm9uIGEgcGFnZSB0aGF0IGlzIGFscmVhZHkgcnVubmluZyB0aGUgXCIgKyBpbml0aWFsQnVpbGROYW1lICsgXCIgXCIpICsgXCJidWlsZCwgc28gdGhpbmdzIHdvbid0IHdvcmsgcmlnaHQuXCIpO1xuICAgIH1cblxuICAgIGdsb2JhbFtrZXldID0gXCJlc21cIjtcbiAgfVxufVxuXG5leHBvcnQgeyBNZW1vcnlSb3V0ZXIsIFByb21wdCwgUmVkaXJlY3QsIFJvdXRlLCBSb3V0ZXIsIFN0YXRpY1JvdXRlciwgU3dpdGNoLCBjb250ZXh0IGFzIF9fUm91dGVyQ29udGV4dCwgZ2VuZXJhdGVQYXRoLCBtYXRjaFBhdGgsIHVzZUhpc3RvcnksIHVzZUxvY2F0aW9uLCB1c2VQYXJhbXMsIHVzZVJvdXRlTWF0Y2gsIHdpdGhSb3V0ZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LXJvdXRlci5qcy5tYXBcbiIsImltcG9ydCB7IFJvdXRlciwgX19Sb3V0ZXJDb250ZXh0LCBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuZXhwb3J0ICogZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSwgY3JlYXRlSGFzaEhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uIH0gZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyBIVE1MNSBoaXN0b3J5LlxuICovXG5cbnZhciBCcm93c2VyUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKEJyb3dzZXJSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEJyb3dzZXJSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KF90aGlzLnByb3BzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQnJvd3NlclJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEJyb3dzZXJSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgQnJvd3NlclJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGZvcmNlUmVmcmVzaDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAga2V5TGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyXG4gIH07XG5cbiAgQnJvd3NlclJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxCcm93c2VyUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyB3aW5kb3cubG9jYXRpb24uaGFzaC5cbiAqL1xuXG52YXIgSGFzaFJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShIYXNoUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBIYXNoUm91dGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuICAgIF90aGlzLmhpc3RvcnkgPSBjcmVhdGVIYXNoSGlzdG9yeShfdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEhhc2hSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBIYXNoUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEhhc2hSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYXNoVHlwZTogUHJvcFR5cGVzLm9uZU9mKFtcImhhc2hiYW5nXCIsIFwibm9zbGFzaFwiLCBcInNsYXNoXCJdKVxuICB9O1xuXG4gIEhhc2hSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8SGFzaFJvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IEhhc2hSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxudmFyIHJlc29sdmVUb0xvY2F0aW9uID0gZnVuY3Rpb24gcmVzb2x2ZVRvTG9jYXRpb24odG8sIGN1cnJlbnRMb2NhdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHRvID09PSBcImZ1bmN0aW9uXCIgPyB0byhjdXJyZW50TG9jYXRpb24pIDogdG87XG59O1xudmFyIG5vcm1hbGl6ZVRvTG9jYXRpb24gPSBmdW5jdGlvbiBub3JtYWxpemVUb0xvY2F0aW9uKHRvLCBjdXJyZW50TG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IGNyZWF0ZUxvY2F0aW9uKHRvLCBudWxsLCBudWxsLCBjdXJyZW50TG9jYXRpb24pIDogdG87XG59O1xuXG52YXIgZm9yd2FyZFJlZlNoaW0gPSBmdW5jdGlvbiBmb3J3YXJkUmVmU2hpbShDKSB7XG4gIHJldHVybiBDO1xufTtcblxudmFyIGZvcndhcmRSZWYgPSBSZWFjdC5mb3J3YXJkUmVmO1xuXG5pZiAodHlwZW9mIGZvcndhcmRSZWYgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgZm9yd2FyZFJlZiA9IGZvcndhcmRSZWZTaGltO1xufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICEhKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpO1xufVxuXG52YXIgTGlua0FuY2hvciA9IGZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIGZvcndhcmRlZFJlZikge1xuICB2YXIgaW5uZXJSZWYgPSBfcmVmLmlubmVyUmVmLFxuICAgICAgbmF2aWdhdGUgPSBfcmVmLm5hdmlnYXRlLFxuICAgICAgX29uQ2xpY2sgPSBfcmVmLm9uQ2xpY2ssXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiaW5uZXJSZWZcIiwgXCJuYXZpZ2F0ZVwiLCBcIm9uQ2xpY2tcIl0pO1xuXG4gIHZhciB0YXJnZXQgPSByZXN0LnRhcmdldDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIF9leHRlbmRzKHt9LCByZXN0LCB7XG4gICAgcmVmOiBmb3J3YXJkZWRSZWYgfHwgaW5uZXJSZWYsXG4gICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKF9vbkNsaWNrKSBfb25DbGljayhldmVudCk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aHJvdyBleDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIC8vIG9uQ2xpY2sgcHJldmVudGVkIGRlZmF1bHRcbiAgICAgIGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiAoIC8vIGlnbm9yZSBldmVyeXRoaW5nIGJ1dCBsZWZ0IGNsaWNrc1xuICAgICAgIXRhcmdldCB8fCB0YXJnZXQgPT09IFwiX3NlbGZcIikgJiYgLy8gbGV0IGJyb3dzZXIgaGFuZGxlIFwidGFyZ2V0PV9ibGFua1wiIGV0Yy5cbiAgICAgICFpc01vZGlmaWVkRXZlbnQoZXZlbnQpIC8vIGlnbm9yZSBjbGlja3Mgd2l0aCBtb2RpZmllciBrZXlzXG4gICAgICApIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIG5hdmlnYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH0pKTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIExpbmtBbmNob3IuZGlzcGxheU5hbWUgPSBcIkxpbmtBbmNob3JcIjtcbn1cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHJlbmRlcmluZyBhIGhpc3RvcnktYXdhcmUgPGE+LlxuICovXG5cblxudmFyIExpbmsgPSBmb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmMiwgZm9yd2FyZGVkUmVmKSB7XG4gIHZhciBfcmVmMiRjb21wb25lbnQgPSBfcmVmMi5jb21wb25lbnQsXG4gICAgICBjb21wb25lbnQgPSBfcmVmMiRjb21wb25lbnQgPT09IHZvaWQgMCA/IExpbmtBbmNob3IgOiBfcmVmMiRjb21wb25lbnQsXG4gICAgICByZXBsYWNlID0gX3JlZjIucmVwbGFjZSxcbiAgICAgIHRvID0gX3JlZjIudG8sXG4gICAgICBpbm5lclJlZiA9IF9yZWYyLmlubmVyUmVmLFxuICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYyLCBbXCJjb21wb25lbnRcIiwgXCJyZXBsYWNlXCIsIFwidG9cIiwgXCJpbm5lclJlZlwiXSk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX19Sb3V0ZXJDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8TGluaz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgaGlzdG9yeSA9IGNvbnRleHQuaGlzdG9yeTtcbiAgICB2YXIgbG9jYXRpb24gPSBub3JtYWxpemVUb0xvY2F0aW9uKHJlc29sdmVUb0xvY2F0aW9uKHRvLCBjb250ZXh0LmxvY2F0aW9uKSwgY29udGV4dC5sb2NhdGlvbik7XG4gICAgdmFyIGhyZWYgPSBsb2NhdGlvbiA/IGhpc3RvcnkuY3JlYXRlSHJlZihsb2NhdGlvbikgOiBcIlwiO1xuXG4gICAgdmFyIHByb3BzID0gX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgIGhyZWY6IGhyZWYsXG4gICAgICBuYXZpZ2F0ZTogZnVuY3Rpb24gbmF2aWdhdGUoKSB7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHJlc29sdmVUb0xvY2F0aW9uKHRvLCBjb250ZXh0LmxvY2F0aW9uKTtcbiAgICAgICAgdmFyIG1ldGhvZCA9IHJlcGxhY2UgPyBoaXN0b3J5LnJlcGxhY2UgOiBoaXN0b3J5LnB1c2g7XG4gICAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICB9XG4gICAgfSk7IC8vIFJlYWN0IDE1IGNvbXBhdFxuXG5cbiAgICBpZiAoZm9yd2FyZFJlZlNoaW0gIT09IGZvcndhcmRSZWYpIHtcbiAgICAgIHByb3BzLnJlZiA9IGZvcndhcmRlZFJlZiB8fCBpbm5lclJlZjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETzogZGVwcmVjYXRlXG4gICAgICBwcm9wcy5pbm5lclJlZiA9IGlubmVyUmVmO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpO1xuICB9KTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciB0b1R5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0LCBQcm9wVHlwZXMuZnVuY10pO1xuICB2YXIgcmVmVHlwZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGN1cnJlbnQ6IFByb3BUeXBlcy5hbnlcbiAgfSldKTtcbiAgTGluay5kaXNwbGF5TmFtZSA9IFwiTGlua1wiO1xuICBMaW5rLnByb3BUeXBlcyA9IHtcbiAgICBpbm5lclJlZjogcmVmVHlwZSxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZXBsYWNlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG86IHRvVHlwZS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBmb3J3YXJkUmVmU2hpbSQxID0gZnVuY3Rpb24gZm9yd2FyZFJlZlNoaW0oQykge1xuICByZXR1cm4gQztcbn07XG5cbnZhciBmb3J3YXJkUmVmJDEgPSBSZWFjdC5mb3J3YXJkUmVmO1xuXG5pZiAodHlwZW9mIGZvcndhcmRSZWYkMSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICBmb3J3YXJkUmVmJDEgPSBmb3J3YXJkUmVmU2hpbSQxO1xufVxuXG5mdW5jdGlvbiBqb2luQ2xhc3NuYW1lcygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNsYXNzbmFtZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY2xhc3NuYW1lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBjbGFzc25hbWVzLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpO1xuICB9KS5qb2luKFwiIFwiKTtcbn1cbi8qKlxuICogQSA8TGluaz4gd3JhcHBlciB0aGF0IGtub3dzIGlmIGl0J3MgXCJhY3RpdmVcIiBvciBub3QuXG4gKi9cblxuXG52YXIgTmF2TGluayA9IGZvcndhcmRSZWYkMShmdW5jdGlvbiAoX3JlZiwgZm9yd2FyZGVkUmVmKSB7XG4gIHZhciBfcmVmJGFyaWFDdXJyZW50ID0gX3JlZltcImFyaWEtY3VycmVudFwiXSxcbiAgICAgIGFyaWFDdXJyZW50ID0gX3JlZiRhcmlhQ3VycmVudCA9PT0gdm9pZCAwID8gXCJwYWdlXCIgOiBfcmVmJGFyaWFDdXJyZW50LFxuICAgICAgX3JlZiRhY3RpdmVDbGFzc05hbWUgPSBfcmVmLmFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgIGFjdGl2ZUNsYXNzTmFtZSA9IF9yZWYkYWN0aXZlQ2xhc3NOYW1lID09PSB2b2lkIDAgPyBcImFjdGl2ZVwiIDogX3JlZiRhY3RpdmVDbGFzc05hbWUsXG4gICAgICBhY3RpdmVTdHlsZSA9IF9yZWYuYWN0aXZlU3R5bGUsXG4gICAgICBjbGFzc05hbWVQcm9wID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBleGFjdCA9IF9yZWYuZXhhY3QsXG4gICAgICBpc0FjdGl2ZVByb3AgPSBfcmVmLmlzQWN0aXZlLFxuICAgICAgbG9jYXRpb25Qcm9wID0gX3JlZi5sb2NhdGlvbixcbiAgICAgIHN0cmljdCA9IF9yZWYuc3RyaWN0LFxuICAgICAgc3R5bGVQcm9wID0gX3JlZi5zdHlsZSxcbiAgICAgIHRvID0gX3JlZi50byxcbiAgICAgIGlubmVyUmVmID0gX3JlZi5pbm5lclJlZixcbiAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJhcmlhLWN1cnJlbnRcIiwgXCJhY3RpdmVDbGFzc05hbWVcIiwgXCJhY3RpdmVTdHlsZVwiLCBcImNsYXNzTmFtZVwiLCBcImV4YWN0XCIsIFwiaXNBY3RpdmVcIiwgXCJsb2NhdGlvblwiLCBcInN0cmljdFwiLCBcInN0eWxlXCIsIFwidG9cIiwgXCJpbm5lclJlZlwiXSk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX19Sb3V0ZXJDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8TmF2TGluaz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgY3VycmVudExvY2F0aW9uID0gbG9jYXRpb25Qcm9wIHx8IGNvbnRleHQubG9jYXRpb247XG4gICAgdmFyIHRvTG9jYXRpb24gPSBub3JtYWxpemVUb0xvY2F0aW9uKHJlc29sdmVUb0xvY2F0aW9uKHRvLCBjdXJyZW50TG9jYXRpb24pLCBjdXJyZW50TG9jYXRpb24pO1xuICAgIHZhciBwYXRoID0gdG9Mb2NhdGlvbi5wYXRobmFtZTsgLy8gUmVnZXggdGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL3BpbGxhcmpzL3BhdGgtdG8tcmVnZXhwL2Jsb2IvbWFzdGVyL2luZGV4LmpzI0wyMDJcblxuICAgIHZhciBlc2NhcGVkUGF0aCA9IHBhdGggJiYgcGF0aC5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG4gICAgdmFyIG1hdGNoID0gZXNjYXBlZFBhdGggPyBtYXRjaFBhdGgoY3VycmVudExvY2F0aW9uLnBhdGhuYW1lLCB7XG4gICAgICBwYXRoOiBlc2NhcGVkUGF0aCxcbiAgICAgIGV4YWN0OiBleGFjdCxcbiAgICAgIHN0cmljdDogc3RyaWN0XG4gICAgfSkgOiBudWxsO1xuICAgIHZhciBpc0FjdGl2ZSA9ICEhKGlzQWN0aXZlUHJvcCA/IGlzQWN0aXZlUHJvcChtYXRjaCwgY3VycmVudExvY2F0aW9uKSA6IG1hdGNoKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gaXNBY3RpdmUgPyBqb2luQ2xhc3NuYW1lcyhjbGFzc05hbWVQcm9wLCBhY3RpdmVDbGFzc05hbWUpIDogY2xhc3NOYW1lUHJvcDtcbiAgICB2YXIgc3R5bGUgPSBpc0FjdGl2ZSA/IF9leHRlbmRzKHt9LCBzdHlsZVByb3AsIHt9LCBhY3RpdmVTdHlsZSkgOiBzdHlsZVByb3A7XG5cbiAgICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7XG4gICAgICBcImFyaWEtY3VycmVudFwiOiBpc0FjdGl2ZSAmJiBhcmlhQ3VycmVudCB8fCBudWxsLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICBzdHlsZTogc3R5bGUsXG4gICAgICB0bzogdG9Mb2NhdGlvblxuICAgIH0sIHJlc3QpOyAvLyBSZWFjdCAxNSBjb21wYXRcblxuXG4gICAgaWYgKGZvcndhcmRSZWZTaGltJDEgIT09IGZvcndhcmRSZWYkMSkge1xuICAgICAgcHJvcHMucmVmID0gZm9yd2FyZGVkUmVmIHx8IGlubmVyUmVmO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBkZXByZWNhdGVcbiAgICAgIHByb3BzLmlubmVyUmVmID0gaW5uZXJSZWY7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywgcHJvcHMpO1xuICB9KTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIE5hdkxpbmsuZGlzcGxheU5hbWUgPSBcIk5hdkxpbmtcIjtcbiAgdmFyIGFyaWFDdXJyZW50VHlwZSA9IFByb3BUeXBlcy5vbmVPZihbXCJwYWdlXCIsIFwic3RlcFwiLCBcImxvY2F0aW9uXCIsIFwiZGF0ZVwiLCBcInRpbWVcIiwgXCJ0cnVlXCJdKTtcbiAgTmF2TGluay5wcm9wVHlwZXMgPSBfZXh0ZW5kcyh7fSwgTGluay5wcm9wVHlwZXMsIHtcbiAgICBcImFyaWEtY3VycmVudFwiOiBhcmlhQ3VycmVudFR5cGUsXG4gICAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBleGFjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNBY3RpdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHN0cmljdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEJyb3dzZXJSb3V0ZXIsIEhhc2hSb3V0ZXIsIExpbmssIE5hdkxpbmsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LXJvdXRlci1kb20uanMubWFwXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjsgXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG4gXG4gXG5leHBvcnQgY2xhc3MgRXZlbnRMaXN0SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7IFxuICByZW5kZXIoKSB7IFxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodGhpcy5wcm9wcy5ldmVudC5TdGFydERhdGUgKiAxMDAwKTsgXG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUodGhpcy5wcm9wcy5ldmVudC5FbmREYXRlICogMTAwMCk7IFxuIFxuICAgIHJldHVybiA8dHI+IFxuICAgICAgPHRkPnt0aGlzLnByb3BzLmV2ZW50Lk5hbWV9PC90ZD4gXG4gICAgICA8dGQ+e3RoaXMucHJvcHMuZXZlbnQuTG9jYXRpb24uTmFtZX08L3RkPiBcbiAgICAgIDx0ZD57c3RhcnQudG9Mb2NhbGVEYXRlU3RyaW5nKCl9PC90ZD4gXG4gICAgICA8dGQ+e2VuZC50b0xvY2FsZURhdGVTdHJpbmcoKX08L3RkPiBcbiAgICAgIDx0ZD5cbiAgICAgICAgPExpbmsgdG89e2AvZXZlbnRzLyR7dGhpcy5wcm9wcy5ldmVudC5JRH0vYm9va2B9PlxuICAgICAgICAgIEJvb2sgbm93IVxuICAgICAgICA8L0xpbms+ICBcbiAgICAgIDwvdGQ+IFxuICAgIDwvdHI+IFxuICB9IFxufSBcblxuIiwiaW1wb3J0IHtFdmVudExpc3RJdGVtfSBmcm9tIFwiLi9ldmVudF9saXN0X2l0ZW1cIjsgXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjsgXG4gXG4gXG5leHBvcnQgY2xhc3MgRXZlbnRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHsgXG4gIHJlbmRlcigpIHsgXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLmV2ZW50cy5tYXAoZSA9PiBcbiAgICAgIDxFdmVudExpc3RJdGVtIGV2ZW50PXtlfSAvPiBcbiAgICApOyBcbiBcbiAgICByZXR1cm4gKDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPiBcbiAgICAgIDx0aGVhZD4gXG4gICAgICAgIDx0cj4gXG4gICAgICAgICAgPHRoPkV2ZW50PC90aD4gXG4gICAgICAgICAgPHRoPldoZXJlPC90aD4gXG4gICAgICAgICAgPHRoPldoZW4gKHN0YXJ0L2VuZCk8L3RoPiBcbiAgICAgICAgICA8dGg+QWN0aW9uczwvdGg+IFxuICAgICAgICA8L3RyPiBcbiAgICAgIDwvdGhlYWQ+IFxuICAgICAgPHRib2R5PiBcbiAgICAgICAge2l0ZW1zfSBcbiAgICAgIDwvdGJvZHk+IFxuICAgIDwvdGFibGU+KTsgXG4gIH0gICBcbn0gIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7IFxuaW1wb3J0IHtFdmVudExpc3R9IGZyb20gXCIuL2V2ZW50X2xpc3RcIjtcblxuXG5leHBvcnQgY2xhc3MgRXZlbnRMaXN0Q29udGFpbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHsgXG4gICAgY29uc3RydWN0b3IocCkgeyBcbiAgICAgICAgc3VwZXIocCk7IFxuICAgIFxuICAgICAgICB0aGlzLnN0YXRlID0geyBcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsIFxuICAgICAgICAgICAgZXZlbnRzOiBbXSBcbiAgICAgICAgfTsgXG4gICAgXG4gICAgICAgIGZldGNoKHAuZXZlbnRMaXN0VVJMKSBcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSBcbiAgICAgICAgLnRoZW4oZXZlbnRzID0+IHsgXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSwgXG4gICAgICAgICAgICBldmVudHM6IGV2ZW50cyBcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfSk7IFxuICAgIH1cblxuICAgIHJlbmRlcigpIHsgXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcpIHsgXG4gICAgICAgICAgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjsgXG4gICAgICAgIH0gXG4gICAgICAgXG4gICAgICAgIHJldHVybiA8RXZlbnRMaXN0IGV2ZW50cz17dGhpcy5zdGF0ZS5ldmVudHN9IC8+OyBcbiAgICB9IFxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiOyBcbiBcbmV4cG9ydCBjbGFzcyBGb3JtUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50eyBcbiAgcmVuZGVyKCkgeyBcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+IFxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcIj4gXG4gICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfSBcbiAgICAgIDwvbGFiZWw+IFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTBcIj4gXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufSBcbiAgICAgIDwvZGl2PiBcbiAgICA8L2Rpdj4gXG4gIH0gXG59ICIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtGb3JtUm93fSBmcm9tIFwiLi9mb3JtX3Jvd1wiOyBcbiBcbmV4cG9ydCBjbGFzcyBFdmVudEJvb2tpbmdGb3JtXG4gIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHsgXG4gIGNvbnN0cnVjdG9yKHApIHsgXG4gICAgc3VwZXIocCk7IFxuIFxuICAgIHRoaXMuc3RhdGUgPSB7c2VhdHM6IDF9OyBcbiAgfSBcblxuICBoYW5kbGVOZXdBbW91bnQoZXZlbnQpIHsgXG4gICAgY29uc3Qgc3RhdGUgPSB7IFxuICAgICAgc2VhdHM6IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSkgXG4gICAgfSBcbiBcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTsgXG4gIH1cblxuICByZW5kZXIoKSB7IFxuICAgIHJldHVybiA8ZGl2PiBcbiAgICAgIDxoMj5Cb29rIHRpY2tldHMgZm9yIHt0aGlzLnByb3BzLmV2ZW50Lk5hbWV9PC9oMj4gXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWhvcml6b250YWxcIj4gXG4gICAgICAgIDxGb3JtUm93IGxhYmVsPVwiRXZlbnRcIj4gXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sLXN0YXRpY1wiPiBcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmV2ZW50Lk5hbWV9IFxuICAgICAgICAgIDwvcD4gXG4gICAgICAgIDwvRm9ybVJvdz4gXG4gICAgICAgIDxGb3JtUm93IGxhYmVsPVwiTnVtYmVyIG9mIHRpY2tldHNcIj4gXG4gICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zZWF0c30gb25DaGFuZ2U9e2V2ZW50ID0+IHRoaXMuaGFuZGxlTmV3QW1vdW50KGV2ZW50KX0+IFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIj4xPC9vcHRpb24+IFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIj4yPC9vcHRpb24+IFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj4zPC9vcHRpb24+IFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjRcIj40PC9vcHRpb24+IFxuICAgICAgICAgIDwvc2VsZWN0PiBcbiAgICAgICAgPC9Gb3JtUm93PiBcbiAgICAgICAgPEZvcm1Sb3c+IFxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5vblN1Ym1pdCh0aGlzLnN0YXRlLnNlYXRzKX0+IFxuICAgICAgICAgICAgU3VibWl0IG9yZGVyIFxuICAgICAgICAgIDwvYnV0dG9uPiBcbiAgICAgICAgPC9Gb3JtUm93PiBcbiAgICAgIDwvZm9ybT4gXG4gICAgPC9kaXY+IFxuICB9IFxufSAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjsgXG5pbXBvcnQge0V2ZW50Qm9va2luZ0Zvcm19IGZyb20gXCIuL2V2ZW50X2Jvb2tpbmdfZm9ybVwiOyBcblxuZXhwb3J0IGNsYXNzIEV2ZW50Qm9va2luZ0Zvcm1Db250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQgeyBcbiAgY29uc3RydWN0b3IocHJvcHMpIHsgXG4gICAgc3VwZXIocHJvcHMpOyBcbiBcbiAgICB0aGlzLnN0YXRlID0ge3N0YXRlOiBcImxvYWRpbmdcIn07IFxuIFxuICAgIGNvbnNvbGUubG9nKHByb3BzLmV2ZW50U2VydmljZVVSTCArIFwiL2V2ZW50cy9pZC9cIiArIHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkKTtcblxuICAgIGZldGNoKHByb3BzLmV2ZW50U2VydmljZVVSTCArIFwiL2V2ZW50cy9pZC9cIiArIHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmlkKSBcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkgXG4gICAgICAudGhlbihldmVudCA9PiB7IFxuICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBcbiAgICAgICAgICBzdGF0ZTogXCJyZWFkeVwiLCBcbiAgICAgICAgICBldmVudDogZXZlbnQgXG4gICAgICAgIH0pIFxuICAgICAgfSk7IFxuICB9IFxuXG4gIGhhbmRsZVN1Ym1pdChzZWF0cykgeyBcbiAgICBjb25zdCB1cmwgPSB0aGlzLnByb3BzLmJvb2tpbmdTZXJ2aWNlVVJMICsgXCIvZXZlbnRzL1wiICsgcC5tYXRjaC5wYXJhbXMuaWQgKyBcIi9ib29raW5nc1wiOyBcbiAgICBjb25zdCBwYXlsb2FkID0ge3NlYXRzOiBzZWF0c307IFxuICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7IFxuICAgICAgZXZlbnQ6IHRoaXMuc3RhdGUuZXZlbnQsIFxuICAgICAgc3RhdGU6IFwic2F2aW5nXCIgXG4gICAgfSk7IFxuICAgXG4gICAgZmV0Y2godXJsLCB7bWV0aG9kOiBcIlBPU1RcIiwgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCl9KSBcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHsgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBcbiAgICAgICAgICBldmVudDogdGhpcy5zdGF0ZS5ldmVudCwgXG4gICAgICAgICAgc3RhdGU6IHJlc3BvbnNlLm9rID8gXCJkb25lXCIgOiBcImVycm9yXCIgXG4gICAgICAgIH0pOyBcbiAgICAgIH0pIFxuICB9XG5cbiAgcmVuZGVyKCkgeyBcbiAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHsgXG4gICAgICByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+OyBcbiAgICB9IFxuICAgXG4gICAgaWYgKHRoaXMuc3RhdGUuc3RhdGUgPT09IFwic2F2aW5nXCIpIHsgXG4gICAgICByZXR1cm4gPGRpdj5TYXZpbmcuLi48L2Rpdj47IFxuICAgIH0gXG4gICBcbiAgICBpZiAodGhpcy5zdGF0ZS5zdGF0ZSA9PT0gXCJkb25lXCIpIHsgXG4gICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1zdWNjZXNzXCI+IFxuICAgICAgICBCb29raW5nIGNvbXBsZXRlZCEgVGhhbmsgeW91ISBcbiAgICAgIDwvZGl2PiBcbiAgICB9IFxuICAgXG4gICAgaWYgKHRoaXMuc3RhdGUuc3RhdGUgPT09IFwiZXJyb3JcIiB8fCAhdGhpcy5zdGF0ZS5ldmVudCkgeyBcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPiBcbiAgICAgICAgVW5rbm93biBlcnJvciEgXG4gICAgICA8L2Rpdj4gXG4gICAgfSBcbiAgIFxuICAgIHJldHVybiA8RXZlbnRCb29raW5nRm9ybSBldmVudD17dGhpcy5zdGF0ZS5ldmVudH0gb25TdWJtaXQ9e3NlYXRzID0+IHRoaXMuaGFuZGxlU3VibWl0KHNlYXRzKX0gLz4gXG4gIH0gXG59ICIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7IFxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7IFxuICAgICAgICBzdXBlcihwcm9wcyk7IFxuICAgIH1cblxuICAgIHJlbmRlcigpIHsgXG4gICAgICAgIHJldHVybiA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZGVmYXVsdFwiPiBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWhlYWRlclwiPiBcbiAgICAgICAgICAgICAgPExpbmsgdG89XCIvXCIgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCI+IFxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJyYW5kTmFtZX0gXG4gICAgICAgICAgICAgIDwvTGluaz4gXG4gICAgICAgICAgICA8L2Rpdj4gXG4gICAgICAgXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXZcIj4gXG4gICAgICAgICAgICAgIDxsaT48TGluayB0bz1cIi9ldmVudHNcIj5FdmVudHM8L0xpbms+PC9saT4gXG4gICAgICAgICAgICA8L3VsPiBcbiAgICAgICAgICA8L2Rpdj4gXG4gICAgICAgIDwvbmF2PlxuICAgICAgfSBcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjsgXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7IFxuaW1wb3J0IHtIb21lUGFnZX0gZnJvbSAnLi9jb21wb25lbnRzL2hvbWVfcGFnZSc7XG5pbXBvcnQge0V2ZW50TGlzdENvbnRhaW5lcn0gZnJvbSBcIi4vY29tcG9uZW50cy9ldmVudF9saXN0X2NvbnRhaW5lclwiO1xuaW1wb3J0IHtFdmVudEJvb2tpbmdGb3JtQ29udGFpbmVyfSBmcm9tICcuL2NvbXBvbmVudHMvZXZlbnRfYm9va2luZ19mb3JtX2NvbnRhaW5lcic7XG5pbXBvcnQge05hdmlnYXRpb259IGZyb20gXCIuL2NvbXBvbmVudHMvbmF2aWdhdGlvblwiOyBcbmltcG9ydCB7QnJvd3NlclJvdXRlciwgUm91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7IFxuXG4gXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQgeyBcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhvbWVQYWdlID0gKCkgPT4gPEhvbWVQYWdlLz47XG4gICAgY29uc3QgZXZlbnRMaXN0ID0gKCkgPT4gPEV2ZW50TGlzdENvbnRhaW5lciBldmVudExpc3RVUkw9XCJodHRwOi8vbG9jYWxob3N0OjgxODEvZXZlbnRzXCIvPjtcbiAgICBjb25zdCBldmVudEJvb2tpbmcgPSAocHJvcHMpID0+IDxFdmVudEJvb2tpbmdGb3JtQ29udGFpbmVyIHsuLi5wcm9wc31cbiAgICAgIGV2ZW50U2VydmljZVVSTD1cImh0dHA6Ly9sb2NhbGhvc3Q6ODE4MVwiIFxuICAgICAgYm9va2luZ1NlcnZpY2VVUkw9XCJodHRwOi8vbG9jYWxob3N0OjQxNDFcIiAvPjsgXG5cbiAgICByZXR1cm4gPEJyb3dzZXJSb3V0ZXI+IFxuICAgICAgPE5hdmlnYXRpb24gYnJhbmROYW1lPVwiTXlFdmVudHNcIi8+IFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj4gXG4gICAgICAgIDxoMT5NeSBFdmVudHM8L2gxPiBcbiBcbiAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9XCIvXCIgcmVuZGVyPXtwcm9wcyA9PiBob21lUGFnZShwcm9wcyl9Lz5cbiAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9XCIvZXZlbnRzXCIgcmVuZGVyPXtwcm9wcyA9PiBldmVudExpc3QocHJvcHMpfS8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiL2V2ZW50cy86aWQvYm9va1wiIHJlbmRlcj17cHJvcHMgPT4gZXZlbnRCb29raW5nKHByb3BzKX0gLz5cbiAgICAgIDwvZGl2PiBcbiAgICA8L0Jyb3dzZXJSb3V0ZXI+IFxuICB9IFxufSBcblxuUmVhY3RET00ucmVuZGVyKCBcbiAgICA8QXBwLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteWV2ZW50cy1hcHBcIikgXG4pOyJdLCJzb3VyY2VSb290IjoiIn0=