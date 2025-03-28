import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/@formspree/core/dist/index.js
var require_dist = __commonJS({
  "node_modules/@formspree/core/dist/index.js"(exports, module) {
    var g2 = Object.defineProperty;
    var j = Object.getOwnPropertyDescriptor;
    var L2 = Object.getOwnPropertyNames;
    var V = Object.prototype.hasOwnProperty;
    var Y2 = (e, r) => {
      for (var t in r) g2(e, t, { get: r[t], enumerable: true });
    };
    var K2 = (e, r, t, o) => {
      if (r && typeof r == "object" || typeof r == "function") for (let s of L2(r)) !V.call(e, s) && s !== t && g2(e, s, { get: () => r[s], enumerable: !(o = j(r, s)) || o.enumerable });
      return e;
    };
    var $2 = (e) => K2(g2({}, "__esModule", { value: true }), e);
    var h2 = (e, r, t) => new Promise((o, s) => {
      var i = (a) => {
        try {
          l(t.next(a));
        } catch (m) {
          s(m);
        }
      }, c = (a) => {
        try {
          l(t.throw(a));
        } catch (m) {
          s(m);
        }
      }, l = (a) => a.done ? o(a.value) : Promise.resolve(a.value).then(i, c);
      l((t = t.apply(e, r)).next());
    });
    var W2 = {};
    Y2(W2, { SubmissionError: () => p, appendExtraData: () => E, createClient: () => F, getDefaultClient: () => U2, isSubmissionError: () => A2 });
    module.exports = $2(W2);
    var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var J2 = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
    function I2(e) {
      e = String(e);
      for (var r, t, o, s, i = "", c = 0, l = e.length % 3; c < e.length; ) {
        if ((t = e.charCodeAt(c++)) > 255 || (o = e.charCodeAt(c++)) > 255 || (s = e.charCodeAt(c++)) > 255) throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");
        r = t << 16 | o << 8 | s, i += u.charAt(r >> 18 & 63) + u.charAt(r >> 12 & 63) + u.charAt(r >> 6 & 63) + u.charAt(r & 63);
      }
      return l ? i.slice(0, l - 3) + "===".substring(l) : i;
    }
    function O2(e) {
      if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !J2.test(e)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
      e += "==".slice(2 - (e.length & 3));
      for (var r, t = "", o, s, i = 0; i < e.length; ) r = u.indexOf(e.charAt(i++)) << 18 | u.indexOf(e.charAt(i++)) << 12 | (o = u.indexOf(e.charAt(i++))) << 6 | (s = u.indexOf(e.charAt(i++))), t += o === 64 ? String.fromCharCode(r >> 16 & 255) : s === 64 ? String.fromCharCode(r >> 16 & 255, r >> 8 & 255) : String.fromCharCode(r >> 16 & 255, r >> 8 & 255, r & 255);
      return t;
    }
    var G = () => navigator.webdriver || !!document.documentElement.getAttribute(O2("d2ViZHJpdmVy")) || !!window.callPhantom || !!window._phantom;
    var y = class {
      constructor() {
        this.loadedAt = Date.now(), this.webdriver = G();
      }
      data() {
        return { loadedAt: this.loadedAt, webdriver: this.webdriver };
      }
    };
    var S2 = class {
      constructor(r) {
        this.kind = "success";
        this.next = r.next;
      }
    };
    function w2(e) {
      return "next" in e && typeof e.next == "string";
    }
    var b2 = class {
      constructor(r, t) {
        this.paymentIntentClientSecret = r;
        this.resubmitKey = t;
        this.kind = "stripePluginPending";
      }
    };
    function _2(e) {
      if ("stripe" in e && "resubmitKey" in e && typeof e.resubmitKey == "string") {
        let { stripe: r } = e;
        return typeof r == "object" && r != null && "paymentIntentClientSecret" in r && typeof r.paymentIntentClientSecret == "string";
      }
      return false;
    }
    function A2(e) {
      return e.kind === "error";
    }
    var p = class {
      constructor(...r) {
        this.kind = "error";
        this.formErrors = [];
        this.fieldErrors = /* @__PURE__ */ new Map();
        var t;
        for (let o of r) {
          if (!o.field) {
            this.formErrors.push({ code: o.code && z(o.code) ? o.code : "UNSPECIFIED", message: o.message });
            continue;
          }
          let s = (t = this.fieldErrors.get(o.field)) != null ? t : [];
          s.push({ code: o.code && Q2(o.code) ? o.code : "UNSPECIFIED", message: o.message }), this.fieldErrors.set(o.field, s);
        }
      }
      getFormErrors() {
        return [...this.formErrors];
      }
      getFieldErrors(r) {
        var t;
        return (t = this.fieldErrors.get(r)) != null ? t : [];
      }
      getAllFieldErrors() {
        return Array.from(this.fieldErrors);
      }
    };
    function z(e) {
      return e in B;
    }
    var B = { BLOCKED: "BLOCKED", EMPTY: "EMPTY", FILES_TOO_BIG: "FILES_TOO_BIG", FORM_NOT_FOUND: "FORM_NOT_FOUND", INACTIVE: "INACTIVE", NO_FILE_UPLOADS: "NO_FILE_UPLOADS", PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND", TOO_MANY_FILES: "TOO_MANY_FILES" };
    function Q2(e) {
      return e in Z;
    }
    var Z = { REQUIRED_FIELD_EMPTY: "REQUIRED_FIELD_EMPTY", REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING", STRIPE_CLIENT_ERROR: "STRIPE_CLIENT_ERROR", STRIPE_SCA_ERROR: "STRIPE_SCA_ERROR", TYPE_EMAIL: "TYPE_EMAIL", TYPE_NUMERIC: "TYPE_NUMERIC", TYPE_TEXT: "TYPE_TEXT" };
    function P2(e) {
      return "errors" in e && Array.isArray(e.errors) && e.errors.every((r) => typeof r.message == "string") || "error" in e && typeof e.error == "string";
    }
    var D2 = "3.0.4";
    var v2 = (e) => I2(JSON.stringify(e));
    var N2 = (e) => {
      let r = `@formspree/core@${D2}`;
      return e ? `${e} ${r}` : r;
    };
    function E(e, r, t) {
      e instanceof FormData ? e.append(r, t) : e[r] = t;
    }
    function M(e) {
      return e !== null && typeof e == "object";
    }
    var R2 = class {
      constructor(r = {}) {
        this.project = r.project, this.stripe = r.stripe, typeof window != "undefined" && (this.session = new y());
      }
      submitForm(s, i) {
        return h2(this, arguments, function* (r, t, o = {}) {
          let c = o.endpoint || "https://formspree.io", l = this.project ? `${c}/p/${this.project}/f/${r}` : `${c}/f/${r}`, a = { Accept: "application/json", "Formspree-Client": N2(o.clientName) };
          this.session && (a["Formspree-Session-Data"] = v2(this.session.data())), t instanceof FormData || (a["Content-Type"] = "application/json");
          function m(f2) {
            return h2(this, null, function* () {
              try {
                let n = yield (yield fetch(l, { method: "POST", mode: "cors", body: f2 instanceof FormData ? f2 : JSON.stringify(f2), headers: a })).json();
                if (M(n)) {
                  if (P2(n)) return Array.isArray(n.errors) ? new p(...n.errors) : new p({ message: n.error });
                  if (_2(n)) return new b2(n.stripe.paymentIntentClientSecret, n.resubmitKey);
                  if (w2(n)) return new S2({ next: n.next });
                }
                return new p({ message: "Unexpected response format" });
              } catch (d2) {
                let n = d2 instanceof Error ? d2.message : `Unknown error while posting to Formspree: ${JSON.stringify(d2)}`;
                return new p({ message: n });
              }
            });
          }
          if (this.stripe && o.createPaymentMethod) {
            let f2 = yield o.createPaymentMethod();
            if (f2.error) return new p({ code: "STRIPE_CLIENT_ERROR", field: "paymentMethod", message: "Error creating payment method" });
            E(t, "paymentMethod", f2.paymentMethod.id);
            let d2 = yield m(t);
            if (d2.kind === "error") return d2;
            if (d2.kind === "stripePluginPending") {
              let n = yield this.stripe.handleCardAction(d2.paymentIntentClientSecret);
              if (n.error) return new p({ code: "STRIPE_CLIENT_ERROR", field: "paymentMethod", message: "Stripe SCA error" });
              t instanceof FormData ? t.delete("paymentMethod") : delete t.paymentMethod, E(t, "paymentIntent", n.paymentIntent.id), E(t, "resubmitKey", d2.resubmitKey);
              let x = yield m(t);
              return k2(x), x;
            }
            return d2;
          }
          let T2 = yield m(t);
          return k2(T2), T2;
        });
      }
    };
    function k2(e) {
      let { kind: r } = e;
      if (r !== "success" && r !== "error") throw new Error(`Unexpected submission result (kind: ${r})`);
    }
    var F = (e) => new R2(e);
    var U2 = () => (C2 || (C2 = F()), C2);
    var C2;
  }
});

// node_modules/@stripe/stripe-js/dist/pure.js
var require_pure = __commonJS({
  "node_modules/@stripe/stripe-js/dist/pure.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _typeof2(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof2 = function(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof2(obj);
    }
    var V3_URL = "https://js.stripe.com/v3";
    var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
    var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
    var findScript = function findScript2() {
      var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (!V3_URL_REGEX.test(script.src)) {
          continue;
        }
        return script;
      }
      return null;
    };
    var injectScript = function injectScript2(params) {
      var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
      var script = document.createElement("script");
      script.src = "".concat(V3_URL).concat(queryString);
      var headOrBody = document.head || document.body;
      if (!headOrBody) {
        throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
      }
      headOrBody.appendChild(script);
      return script;
    };
    var registerWrapper = function registerWrapper2(stripe, startTime) {
      if (!stripe || !stripe._registerWrapper) {
        return;
      }
      stripe._registerWrapper({
        name: "stripe-js",
        version: "1.54.2",
        startTime
      });
    };
    var stripePromise = null;
    var loadScript = function loadScript2(params) {
      if (stripePromise !== null) {
        return stripePromise;
      }
      stripePromise = new Promise(function(resolve, reject) {
        if (typeof window === "undefined" || typeof document === "undefined") {
          resolve(null);
          return;
        }
        if (window.Stripe && params) {
          console.warn(EXISTING_SCRIPT_MESSAGE);
        }
        if (window.Stripe) {
          resolve(window.Stripe);
          return;
        }
        try {
          var script = findScript();
          if (script && params) {
            console.warn(EXISTING_SCRIPT_MESSAGE);
          } else if (!script) {
            script = injectScript(params);
          }
          script.addEventListener("load", function() {
            if (window.Stripe) {
              resolve(window.Stripe);
            } else {
              reject(new Error("Stripe.js not available"));
            }
          });
          script.addEventListener("error", function() {
            reject(new Error("Failed to load Stripe.js"));
          });
        } catch (error) {
          reject(error);
          return;
        }
      });
      return stripePromise;
    };
    var initStripe = function initStripe2(maybeStripe, args, startTime) {
      if (maybeStripe === null) {
        return null;
      }
      var stripe = maybeStripe.apply(void 0, args);
      registerWrapper(stripe, startTime);
      return stripe;
    };
    var validateLoadParams = function validateLoadParams2(params) {
      var errorMessage = "invalid load parameters; expected object of shape\n\n    {advancedFraudSignals: boolean}\n\nbut received\n\n    ".concat(JSON.stringify(params), "\n");
      if (params === null || _typeof2(params) !== "object") {
        throw new Error(errorMessage);
      }
      if (Object.keys(params).length === 1 && typeof params.advancedFraudSignals === "boolean") {
        return params;
      }
      throw new Error(errorMessage);
    };
    var loadParams;
    var loadStripeCalled = false;
    var loadStripe = function loadStripe2() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      loadStripeCalled = true;
      var startTime = Date.now();
      return loadScript(loadParams).then(function(maybeStripe) {
        return initStripe(maybeStripe, args, startTime);
      });
    };
    loadStripe.setLoadParameters = function(params) {
      if (loadStripeCalled && loadParams) {
        var validatedParams = validateLoadParams(params);
        var parameterKeys = Object.keys(validatedParams);
        var sameParameters = parameterKeys.reduce(function(previousValue, currentValue) {
          var _loadParams;
          return previousValue && params[currentValue] === ((_loadParams = loadParams) === null || _loadParams === void 0 ? void 0 : _loadParams[currentValue]);
        }, true);
        if (sameParameters) {
          return;
        }
      }
      if (loadStripeCalled) {
        throw new Error("You cannot change load parameters after calling loadStripe");
      }
      loadParams = validateLoadParams(params);
    };
    exports.loadStripe = loadStripe;
  }
});

// node_modules/@stripe/stripe-js/pure.js
var require_pure2 = __commonJS({
  "node_modules/@stripe/stripe-js/pure.js"(exports, module) {
    module.exports = require_pure();
  }
});

// node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var usePrevious = function usePrevious2(value) {
  var ref = import_react.default.useRef(value);
  import_react.default.useEffect(function() {
    ref.current = value;
  }, [value]);
  return ref.current;
};
var isUnknownObject = function isUnknownObject2(raw) {
  return raw !== null && _typeof(raw) === "object";
};
var isPromise = function isPromise2(raw) {
  return isUnknownObject(raw) && typeof raw.then === "function";
};
var isStripe = function isStripe2(raw) {
  return isUnknownObject(raw) && typeof raw.elements === "function" && typeof raw.createToken === "function" && typeof raw.createPaymentMethod === "function" && typeof raw.confirmCardPayment === "function";
};
var PLAIN_OBJECT_STR = "[object Object]";
var isEqual = function isEqual2(left, right) {
  if (!isUnknownObject(left) || !isUnknownObject(right)) {
    return left === right;
  }
  var leftArray = Array.isArray(left);
  var rightArray = Array.isArray(right);
  if (leftArray !== rightArray) return false;
  var leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
  var rightPlainObject = Object.prototype.toString.call(right) === PLAIN_OBJECT_STR;
  if (leftPlainObject !== rightPlainObject) return false;
  if (!leftPlainObject && !leftArray) return left === right;
  var leftKeys = Object.keys(left);
  var rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  var keySet = {};
  for (var i = 0; i < leftKeys.length; i += 1) {
    keySet[leftKeys[i]] = true;
  }
  for (var _i = 0; _i < rightKeys.length; _i += 1) {
    keySet[rightKeys[_i]] = true;
  }
  var allKeys = Object.keys(keySet);
  if (allKeys.length !== leftKeys.length) {
    return false;
  }
  var l = left;
  var r = right;
  var pred = function pred2(key) {
    return isEqual2(l[key], r[key]);
  };
  return allKeys.every(pred);
};
var extractAllowedOptionsUpdates = function extractAllowedOptionsUpdates2(options, prevOptions, immutableKeys) {
  if (!isUnknownObject(options)) {
    return null;
  }
  return Object.keys(options).reduce(function(newOptions, key) {
    var isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);
    if (immutableKeys.includes(key)) {
      if (isUpdated) {
        console.warn("Unsupported prop change: options.".concat(key, " is not a mutable property."));
      }
      return newOptions;
    }
    if (!isUpdated) {
      return newOptions;
    }
    return _objectSpread2(_objectSpread2({}, newOptions || {}), {}, _defineProperty({}, key, options[key]));
  }, null);
};
var INVALID_STRIPE_ERROR = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.";
var validateStripe = function validateStripe2(maybeStripe) {
  if (maybeStripe === null || isStripe(maybeStripe)) {
    return maybeStripe;
  }
  throw new Error(INVALID_STRIPE_ERROR);
};
var parseStripeProp = function parseStripeProp2(raw) {
  if (isPromise(raw)) {
    return {
      tag: "async",
      stripePromise: Promise.resolve(raw).then(validateStripe)
    };
  }
  var stripe = validateStripe(raw);
  if (stripe === null) {
    return {
      tag: "empty"
    };
  }
  return {
    tag: "sync",
    stripe
  };
};
var ElementsContext = import_react.default.createContext(null);
ElementsContext.displayName = "ElementsContext";
var parseElementsContext = function parseElementsContext2(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
  }
  return ctx;
};
var CartElementContext = import_react.default.createContext(null);
CartElementContext.displayName = "CartElementContext";
var parseCartElementContext = function parseCartElementContext2(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
  }
  return ctx;
};
var Elements = function Elements2(_ref) {
  var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
  var parsed = import_react.default.useMemo(function() {
    return parseStripeProp(rawStripeProp);
  }, [rawStripeProp]);
  var _React$useState = import_react.default.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), cart = _React$useState2[0], setCart = _React$useState2[1];
  var _React$useState3 = import_react.default.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), cartState = _React$useState4[0], setCartState = _React$useState4[1];
  var _React$useState5 = import_react.default.useState(function() {
    return {
      stripe: parsed.tag === "sync" ? parsed.stripe : null,
      elements: parsed.tag === "sync" ? parsed.stripe.elements(options) : null
    };
  }), _React$useState6 = _slicedToArray(_React$useState5, 2), ctx = _React$useState6[0], setContext = _React$useState6[1];
  import_react.default.useEffect(function() {
    var isMounted = true;
    var safeSetContext = function safeSetContext2(stripe) {
      setContext(function(ctx2) {
        if (ctx2.stripe) return ctx2;
        return {
          stripe,
          elements: stripe.elements(options)
        };
      });
    };
    if (parsed.tag === "async" && !ctx.stripe) {
      parsed.stripePromise.then(function(stripe) {
        if (stripe && isMounted) {
          safeSetContext(stripe);
        }
      });
    } else if (parsed.tag === "sync" && !ctx.stripe) {
      safeSetContext(parsed.stripe);
    }
    return function() {
      isMounted = false;
    };
  }, [parsed, ctx, options]);
  var prevStripe = usePrevious(rawStripeProp);
  import_react.default.useEffect(function() {
    if (prevStripe !== null && prevStripe !== rawStripeProp) {
      console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
    }
  }, [prevStripe, rawStripeProp]);
  var prevOptions = usePrevious(options);
  import_react.default.useEffect(function() {
    if (!ctx.elements) {
      return;
    }
    var updates = extractAllowedOptionsUpdates(options, prevOptions, ["clientSecret", "fonts"]);
    if (updates) {
      ctx.elements.update(updates);
    }
  }, [options, prevOptions, ctx.elements]);
  import_react.default.useEffect(function() {
    var anyStripe = ctx.stripe;
    if (!anyStripe || !anyStripe._registerWrapper || !anyStripe.registerAppInfo) {
      return;
    }
    anyStripe._registerWrapper({
      name: "react-stripe-js",
      version: "1.16.5"
    });
    anyStripe.registerAppInfo({
      name: "react-stripe-js",
      version: "1.16.5",
      url: "https://stripe.com/docs/stripe-js/react"
    });
  }, [ctx.stripe]);
  return import_react.default.createElement(ElementsContext.Provider, {
    value: ctx
  }, import_react.default.createElement(CartElementContext.Provider, {
    value: {
      cart,
      setCart,
      cartState,
      setCartState
    }
  }, children));
};
Elements.propTypes = {
  stripe: import_prop_types.default.any,
  options: import_prop_types.default.object
};
var useElementsContextWithUseCase = function useElementsContextWithUseCase2(useCaseMessage) {
  var ctx = import_react.default.useContext(ElementsContext);
  return parseElementsContext(ctx, useCaseMessage);
};
var useCartElementContextWithUseCase = function useCartElementContextWithUseCase2(useCaseMessage) {
  var ctx = import_react.default.useContext(CartElementContext);
  return parseCartElementContext(ctx, useCaseMessage);
};
var useElements = function useElements2() {
  var _useElementsContextWi = useElementsContextWithUseCase("calls useElements()"), elements = _useElementsContextWi.elements;
  return elements;
};
var ElementsConsumer = function ElementsConsumer2(_ref2) {
  var children = _ref2.children;
  var ctx = useElementsContextWithUseCase("mounts <ElementsConsumer>");
  return children(ctx);
};
ElementsConsumer.propTypes = {
  children: import_prop_types.default.func.isRequired
};
var useAttachEvent = function useAttachEvent2(element, event, cb) {
  var cbDefined = !!cb;
  var cbRef = import_react.default.useRef(cb);
  import_react.default.useEffect(function() {
    cbRef.current = cb;
  }, [cb]);
  import_react.default.useEffect(function() {
    if (!cbDefined || !element) {
      return function() {
      };
    }
    var decoratedCb = function decoratedCb2() {
      if (cbRef.current) {
        cbRef.current.apply(cbRef, arguments);
      }
    };
    element.on(event, decoratedCb);
    return function() {
      element.off(event, decoratedCb);
    };
  }, [cbDefined, event, element, cbRef]);
};
var capitalized = function capitalized2(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var createElementComponent = function createElementComponent2(type, isServer2) {
  var displayName = "".concat(capitalized(type), "Element");
  var ClientElement = function ClientElement2(_ref) {
    var id = _ref.id, className = _ref.className, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, onBlur = _ref.onBlur, onFocus = _ref.onFocus, onReady = _ref.onReady, onChange = _ref.onChange, onEscape = _ref.onEscape, onClick = _ref.onClick, onLoadError = _ref.onLoadError, onLoaderStart = _ref.onLoaderStart, onNetworksChange = _ref.onNetworksChange, onCheckout = _ref.onCheckout, onLineItemClick = _ref.onLineItemClick, onConfirm = _ref.onConfirm, onCancel = _ref.onCancel, onShippingAddressChange = _ref.onShippingAddressChange, onShippingRateChange = _ref.onShippingRateChange;
    var _useElementsContextWi = useElementsContextWithUseCase("mounts <".concat(displayName, ">")), elements = _useElementsContextWi.elements;
    var _React$useState = import_react.default.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), element = _React$useState2[0], setElement = _React$useState2[1];
    var elementRef = import_react.default.useRef(null);
    var domNode = import_react.default.useRef(null);
    var _useCartElementContex = useCartElementContextWithUseCase("mounts <".concat(displayName, ">")), setCart = _useCartElementContex.setCart, setCartState = _useCartElementContex.setCartState;
    useAttachEvent(element, "blur", onBlur);
    useAttachEvent(element, "focus", onFocus);
    useAttachEvent(element, "escape", onEscape);
    useAttachEvent(element, "click", onClick);
    useAttachEvent(element, "loaderror", onLoadError);
    useAttachEvent(element, "loaderstart", onLoaderStart);
    useAttachEvent(element, "networkschange", onNetworksChange);
    useAttachEvent(element, "lineitemclick", onLineItemClick);
    useAttachEvent(element, "confirm", onConfirm);
    useAttachEvent(element, "cancel", onCancel);
    useAttachEvent(element, "shippingaddresschange", onShippingAddressChange);
    useAttachEvent(element, "shippingratechange", onShippingRateChange);
    var readyCallback;
    if (type === "cart") {
      readyCallback = function readyCallback2(event) {
        setCartState(event);
        onReady && onReady(event);
      };
    } else if (onReady) {
      if (type === "payButton") {
        readyCallback = onReady;
      } else {
        readyCallback = function readyCallback2() {
          onReady(element);
        };
      }
    }
    useAttachEvent(element, "ready", readyCallback);
    var changeCallback = type === "cart" ? function(event) {
      setCartState(event);
      onChange && onChange(event);
    } : onChange;
    useAttachEvent(element, "change", changeCallback);
    var checkoutCallback = type === "cart" ? function(event) {
      setCartState(event);
      onCheckout && onCheckout(event);
    } : onCheckout;
    useAttachEvent(element, "checkout", checkoutCallback);
    import_react.default.useLayoutEffect(function() {
      if (elementRef.current === null && elements && domNode.current !== null) {
        var newElement = elements.create(type, options);
        if (type === "cart" && setCart) {
          setCart(newElement);
        }
        elementRef.current = newElement;
        setElement(newElement);
        newElement.mount(domNode.current);
      }
    }, [elements, options, setCart]);
    var prevOptions = usePrevious(options);
    import_react.default.useEffect(function() {
      if (!elementRef.current) {
        return;
      }
      var updates = extractAllowedOptionsUpdates(options, prevOptions, ["paymentRequest"]);
      if (updates) {
        elementRef.current.update(updates);
      }
    }, [options, prevOptions]);
    import_react.default.useLayoutEffect(function() {
      return function() {
        if (elementRef.current) {
          elementRef.current.destroy();
          elementRef.current = null;
        }
      };
    }, []);
    return import_react.default.createElement("div", {
      id,
      className,
      ref: domNode
    });
  };
  var ServerElement = function ServerElement2(props) {
    useElementsContextWithUseCase("mounts <".concat(displayName, ">"));
    useCartElementContextWithUseCase("mounts <".concat(displayName, ">"));
    var id = props.id, className = props.className;
    return import_react.default.createElement("div", {
      id,
      className
    });
  };
  var Element = isServer2 ? ServerElement : ClientElement;
  Element.propTypes = {
    id: import_prop_types.default.string,
    className: import_prop_types.default.string,
    onChange: import_prop_types.default.func,
    onBlur: import_prop_types.default.func,
    onFocus: import_prop_types.default.func,
    onReady: import_prop_types.default.func,
    onEscape: import_prop_types.default.func,
    onClick: import_prop_types.default.func,
    onLoadError: import_prop_types.default.func,
    onLoaderStart: import_prop_types.default.func,
    onNetworksChange: import_prop_types.default.func,
    onCheckout: import_prop_types.default.func,
    onLineItemClick: import_prop_types.default.func,
    onConfirm: import_prop_types.default.func,
    onCancel: import_prop_types.default.func,
    onShippingAddressChange: import_prop_types.default.func,
    onShippingRateChange: import_prop_types.default.func,
    options: import_prop_types.default.object
  };
  Element.displayName = displayName;
  Element.__elementType = type;
  return Element;
};
var isServer = typeof window === "undefined";
var AuBankAccountElement = createElementComponent("auBankAccount", isServer);
var CardElement = createElementComponent("card", isServer);
var CardNumberElement = createElementComponent("cardNumber", isServer);
var CardExpiryElement = createElementComponent("cardExpiry", isServer);
var CardCvcElement = createElementComponent("cardCvc", isServer);
var FpxBankElement = createElementComponent("fpxBank", isServer);
var IbanElement = createElementComponent("iban", isServer);
var IdealBankElement = createElementComponent("idealBank", isServer);
var P24BankElement = createElementComponent("p24Bank", isServer);
var EpsBankElement = createElementComponent("epsBank", isServer);
var PaymentElement = createElementComponent("payment", isServer);
var PayButtonElement = createElementComponent("payButton", isServer);
var PaymentRequestButtonElement = createElementComponent("paymentRequestButton", isServer);
var LinkAuthenticationElement = createElementComponent("linkAuthentication", isServer);
var AddressElement = createElementComponent("address", isServer);
var ShippingAddressElement = createElementComponent("shippingAddress", isServer);
var CartElement = createElementComponent("cart", isServer);
var PaymentMethodMessagingElement = createElementComponent("paymentMethodMessaging", isServer);
var AffirmMessageElement = createElementComponent("affirmMessage", isServer);
var AfterpayClearpayMessageElement = createElementComponent("afterpayClearpayMessage", isServer);

// node_modules/@formspree/react/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);
var import_core = __toESM(require_dist(), 1);
var import_pure = __toESM(require_pure2(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_react5 = __toESM(require_react(), 1);
var import_react6 = __toESM(require_react(), 1);
var import_core2 = __toESM(require_dist(), 1);
function _(e) {
  let { prefix: t, field: r, errors: o, ...s } = e;
  if (o == null) return null;
  let n = r ? o.getFieldErrors(r) : o.getFormErrors();
  return n.length === 0 ? null : import_react2.default.createElement("div", { ...s }, t ? `${t} ` : null, n.map((a) => a.message).join(", "));
}
var v = (0, import_react5.createContext)({ elements: null });
function P(e) {
  let { children: t } = e, r = useElements();
  return import_react4.default.createElement(v.Provider, { value: { elements: r } }, t);
}
function C() {
  return (0, import_react5.useContext)(v);
}
var D = import_react3.default.createContext(null);
function U(e) {
  let { children: t, project: r, stripePK: o } = e, [s, n] = (0, import_react3.useState)((0, import_core.createClient)({ project: r })), a = (0, import_react3.useMemo)(() => o ? (0, import_pure.loadStripe)(o) : null, [o]);
  return (0, import_react3.useEffect)(() => {
    let i = true;
    return i && n((l) => l.project !== r ? (0, import_core.createClient)({ ...l, project: r }) : l), () => {
      i = false;
    };
  }, [r]), (0, import_react3.useEffect)(() => {
    let i = true;
    return a == null ? void 0 : a.then((l) => {
      i && l && n((m) => (0, import_core.createClient)({ ...m, stripe: l }));
    }), () => {
      i = false;
    };
  }, [a]), import_react3.default.createElement(D.Provider, { value: { client: s } }, a ? import_react3.default.createElement(Elements, { stripe: a }, import_react3.default.createElement(P, null, t)) : t);
}
function g() {
  return (0, import_react3.useContext)(D) ?? { client: (0, import_core.getDefaultClient)() };
}
var T = "2.5.5";
var L = `@formspree/react@${T}`;
function b(e, t = {}) {
  let r = g(), { elements: o } = C(), { client: s = r.client, extraData: n, onError: a, onSuccess: i, origin: l } = t, { stripe: m } = s;
  return async function(p) {
    let u = Y(p) ? q(p) : p;
    if (typeof n == "object") for (let [j, x] of Object.entries(n)) {
      let c;
      typeof x == "function" ? c = await x() : c = x, c !== void 0 && (0, import_core2.appendExtraData)(u, j, c);
    }
    let E = o == null ? void 0 : o.getElement(CardElement), V = m && E ? () => m.createPaymentMethod({ type: "card", card: E, billing_details: J(u) }) : void 0, y = await s.submitForm(e, u, { endpoint: l, clientName: L, createPaymentMethod: V });
    (0, import_core2.isSubmissionError)(y) ? a == null ? void 0 : a(y) : i == null ? void 0 : i(y);
  };
}
function Y(e) {
  return "preventDefault" in e && typeof e.preventDefault == "function";
}
function q(e) {
  e.preventDefault();
  let t = e.currentTarget;
  if (t.tagName != "FORM") throw new Error("submit was triggered for a non-form element");
  return new FormData(t);
}
function J(e) {
  let t = { address: Q(e) };
  for (let r of ["name", "email", "phone"]) {
    let o = e instanceof FormData ? e.get(r) : e[r];
    o && typeof o == "string" && (t[r] = o);
  }
  return t;
}
function Q(e) {
  let t = {};
  for (let [r, o] of [["address_line1", "line1"], ["address_line2", "line2"], ["address_city", "city"], ["address_country", "country"], ["address_state", "state"], ["address_postal_code", "postal_code"]]) {
    let s = e instanceof FormData ? e.get(r) : e[r];
    s && typeof s == "string" && (t[o] = s);
  }
  return t;
}
function X(e, t = {}) {
  let [r, o] = (0, import_react6.useState)(null), [s, n] = (0, import_react6.useState)(null), [a, i] = (0, import_react6.useState)(false), [l, m] = (0, import_react6.useState)(false);
  if (!e) throw new Error('You must provide a form key or hashid (e.g. useForm("myForm") or useForm("123xyz")');
  let F = b(e, { client: t.client, extraData: t.data, onError(p) {
    o(p), i(false), m(false);
  }, onSuccess(p) {
    o(null), n(p), i(false), m(true);
  }, origin: t.endpoint });
  return [{ errors: r, result: s, submitting: a, succeeded: l }, async function(u) {
    i(true), await F(u);
  }, function() {
    o(null), n(null), i(false), m(false);
  }];
}
export {
  CardElement,
  U as FormspreeProvider,
  _ as ValidationError,
  X as useForm,
  g as useFormspree,
  b as useSubmit
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
//# sourceMappingURL=@formspree_react.js.map
