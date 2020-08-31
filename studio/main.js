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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Studio.libraries['react'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Studio;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactList = __webpack_require__(5);

var _reactList2 = _interopRequireDefault(_reactList);

var _ReportEditor = __webpack_require__(6);

var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _instance = void 0;

var ReportEditor = function (_Component) {
  _inherits(ReportEditor, _Component);

  _createClass(ReportEditor, null, [{
    key: 'Instance',
    get: function get() {
      return _instance;
    }
  }]);

  function ReportEditor() {
    _classCallCheck(this, ReportEditor);

    var _this = _possibleConstructorReturn(this, (ReportEditor.__proto__ || Object.getPrototypeOf(ReportEditor)).call(this));

    _this.state = { reports: [], active: null };
    _instance = _this;
    return _this;
  }

  _createClass(ReportEditor, [{
    key: 'refresh',
    value: function refresh() {
      this.skip = 0;
      this.top = 50;
      this.pending = 0;
      this.ActiveReport = null;
    }
  }, {
    key: 'onTabActive',
    value: function onTabActive() {
      var _this2 = this;

      this.refresh();

      this.setState({
        reports: [],
        active: null,
        count: 0
      }, function () {
        _this2.lazyFetch();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.ActiveReport = null;
    }
  }, {
    key: 'openReport',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(r) {
        var state;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = r.state;


                if (state == null && r.blobName != null) {
                  state = 'success';
                }

                if (state === 'success') {
                  if (r.contentType === 'text/html' || r.contentType === 'text/plain' || r.contentType === 'application/pdf' || r.contentType && r.contentType.indexOf('image') !== -1) {
                    _jsreportStudio2.default.setPreviewFrameSrc(_jsreportStudio2.default.rootUrl + '/reports/' + r._id + '/content');
                  } else {
                    window.open(_jsreportStudio2.default.rootUrl + '/reports/' + r._id + '/attachment', '_self');
                  }

                  this.setState({ active: r._id });
                  this.ActiveReport = r;
                } else if (state === 'error') {
                  _jsreportStudio2.default.setPreviewFrameSrc('data:text/html;charset=utf-8,' + encodeURI(r.error || r.state));
                  this.setState({ active: null });
                  this.ActiveReport = null;
                }

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function openReport(_x) {
        return _ref.apply(this, arguments);
      }

      return openReport;
    }()
  }, {
    key: 'lazyFetch',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.loading) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:

                this.loading = true;
                _context2.next = 5;
                return _jsreportStudio2.default.api.get('/odata/reports?$orderby=creationDate desc&$count=true&$top=' + this.top + '&$skip=' + this.skip);

              case 5:
                response = _context2.sent;

                this.skip += this.top;
                this.loading = false;
                this.setState({ reports: this.state.reports.concat(response.value), count: response['@odata.count'] });
                if (this.state.reports.length <= this.pending && response.value.length) {
                  this.lazyFetch();
                }

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function lazyFetch() {
        return _ref2.apply(this, arguments);
      }

      return lazyFetch;
    }()
  }, {
    key: 'tryRenderItem',
    value: function tryRenderItem(index) {
      var task = this.state.reports[index];
      if (!task) {
        this.pending = Math.max(this.pending, index);
        this.lazyFetch();
        return _react2.default.createElement(
          'tr',
          { key: index },
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('i', { className: 'fa fa-spinner fa-spin fa-fw' })
          )
        );
      }

      return this.renderItem(task, index);
    }
  }, {
    key: 'remove',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = this.ActiveReport._id;

                this.ActiveReport = null;
                _context3.next = 4;
                return _jsreportStudio2.default.api.del('/odata/reports(' + id + ')');

              case 4:
                this.setState({ reports: this.state.reports.filter(function (r) {
                    return r._id !== id;
                  }) });

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function remove() {
        return _ref3.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: 'renderItem',
    value: function renderItem(report, index) {
      var _this3 = this;

      var state = report.state;
      var stateClass = void 0;

      if (state == null && report.blobName != null) {
        state = 'success';
      } else if (state == null) {
        state = 'error';
      }

      if (state === 'error') {
        stateClass = 'error';
      } else if (state === 'success') {
        stateClass = 'success';
      } else {
        stateClass = 'cancelled';
      }

      return _react2.default.createElement(
        'tr',
        {
          key: index,
          className: this.state.active === report._id ? 'active' : '',
          onClick: function onClick() {
            return _this3.openReport(report);
          }
        },
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'span',
            { className: _ReportEditor2.default.state + ' ' + _ReportEditor2.default[stateClass] },
            state
          )
        ),
        _react2.default.createElement(
          'td',
          { className: 'selection' },
          report.name
        ),
        _react2.default.createElement(
          'td',
          null,
          report.creationDate.toLocaleString()
        ),
        _react2.default.createElement(
          'td',
          null,
          report.recipe
        )
      );
    }
  }, {
    key: 'renderItems',
    value: function renderItems(items, ref) {
      return _react2.default.createElement(
        'table',
        { className: 'table', ref: ref },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'state'
            ),
            _react2.default.createElement(
              'th',
              null,
              'name'
            ),
            _react2.default.createElement(
              'th',
              null,
              'created on'
            ),
            _react2.default.createElement(
              'th',
              null,
              'recipe'
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          items
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var count = this.state.count;


      return _react2.default.createElement(
        'div',
        { className: 'block custom-editor' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement('i', { className: 'fa fa-folder-open-o' }),
            ' Reports'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _ReportEditor2.default.listContainer + ' block-item' },
          _react2.default.createElement(_reactList2.default, {
            type: 'uniform', itemsRenderer: this.renderItems, itemRenderer: function itemRenderer(index) {
              return _this4.tryRenderItem(index);
            },
            length: count })
        )
      );
    }
  }]);

  return ReportEditor;
}(_react.Component);

exports.default = ReportEditor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, isValidElement, REACT_ELEMENT_TYPE; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(8)();
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ReportEditor = __webpack_require__(2);

var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

var _ReportsButton = __webpack_require__(7);

var _ReportsButton2 = _interopRequireDefault(_ReportsButton);

var _DownloadButton = __webpack_require__(12);

var _DownloadButton2 = _interopRequireDefault(_DownloadButton);

var _DeleteButton = __webpack_require__(13);

var _DeleteButton2 = _interopRequireDefault(_DeleteButton);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsreportStudio2.default.addEditorComponent('reports', _ReportEditor2.default);

_jsreportStudio2.default.addApiSpec({
  options: {
    reports: { save: true }
  }
});

_jsreportStudio2.default.addToolbarComponent(_ReportsButton2.default, 'settings');
_jsreportStudio2.default.addToolbarComponent(_DownloadButton2.default);
_jsreportStudio2.default.addToolbarComponent(_DeleteButton2.default);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = Studio.libraries['react-list'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"listContainer":"x-reports-ReportEditor-listContainer","state":"x-reports-ReportEditor-state","error":"x-reports-ReportEditor-error","cancelled":"x-reports-ReportEditor-cancelled","success":"x-reports-ReportEditor-success"};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportsButton = function (_Component) {
  _inherits(ReportsButton, _Component);

  function ReportsButton() {
    _classCallCheck(this, ReportsButton);

    return _possibleConstructorReturn(this, (ReportsButton.__proto__ || Object.getPrototypeOf(ReportsButton)).apply(this, arguments));
  }

  _createClass(ReportsButton, [{
    key: 'openReports',
    value: function openReports() {
      _jsreportStudio2.default.openTab({ key: 'Reports', editorComponentKey: 'reports', title: 'Reports' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { onClick: function onClick() {
            return _this2.openReports();
          } },
        _react2.default.createElement('i', { className: 'fa fa-folder-open-o' }),
        ' Reports'
      );
    }
  }]);

  return ReportsButton;
}(_react.Component);

exports.default = ReportsButton;


ReportsButton.propTypes = {
  tab: _propTypes2.default.object,
  onUpdate: _propTypes2.default.func.isRequired
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(9);
var invariant = __webpack_require__(10);
var ReactPropTypesSecret = __webpack_require__(11);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
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
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ReportEditor = __webpack_require__(2);

var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

var _jsreportStudio = __webpack_require__(1);

var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DownloadButton = function (_Component) {
  _inherits(DownloadButton, _Component);

  function DownloadButton() {
    _classCallCheck(this, DownloadButton);

    return _possibleConstructorReturn(this, (DownloadButton.__proto__ || Object.getPrototypeOf(DownloadButton)).apply(this, arguments));
  }

  _createClass(DownloadButton, [{
    key: 'getReportEditorInstance',
    value: function getReportEditorInstance() {
      return _ReportEditor2.default.default ? _ReportEditor2.default.default.Instance : _ReportEditor2.default.Instance;
    }
  }, {
    key: 'download',
    value: function download() {
      var instance = this.getReportEditorInstance();

      if (instance && instance.ActiveReport) {
        window.open(_jsreportStudio2.default.rootUrl + '/reports/' + instance.ActiveReport._id + '/attachment', '_self');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.tab || this.props.tab.key !== 'Reports' || !this.getReportEditorInstance() || !this.getReportEditorInstance().ActiveReport) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { className: 'toolbar-button', onClick: function onClick() {
            return _this2.download();
          } },
        _react2.default.createElement('i', { className: 'fa fa-download' }),
        'Download'
      );
    }
  }]);

  return DownloadButton;
}(_react.Component);

exports.default = DownloadButton;


DownloadButton.propTypes = {
  tab: _propTypes2.default.object,
  onUpdate: _propTypes2.default.func.isRequired
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ReportEditor = __webpack_require__(2);

var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteButton = function (_Component) {
  _inherits(DeleteButton, _Component);

  function DeleteButton() {
    _classCallCheck(this, DeleteButton);

    return _possibleConstructorReturn(this, (DeleteButton.__proto__ || Object.getPrototypeOf(DeleteButton)).apply(this, arguments));
  }

  _createClass(DeleteButton, [{
    key: 'getReportEditorInstance',
    value: function getReportEditorInstance() {
      return _ReportEditor2.default.default ? _ReportEditor2.default.default.Instance : _ReportEditor2.default.Instance;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.tab || this.props.tab.key !== 'Reports' || !this.getReportEditorInstance() || !this.getReportEditorInstance().ActiveReport) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { className: 'toolbar-button', onClick: function onClick() {
            return _this2.getReportEditorInstance().remove();
          } },
        _react2.default.createElement('i', { className: 'fa fa-trash' }),
        'Delete'
      );
    }
  }]);

  return DeleteButton;
}(_react.Component);

exports.default = DeleteButton;


DeleteButton.propTypes = {
  tab: _propTypes2.default.object,
  onUpdate: _propTypes2.default.func.isRequired
};

/***/ })
/******/ ]);