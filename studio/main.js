/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ReportEditor = __webpack_require__(1);
	
	var _ReportEditor2 = _interopRequireDefault(_ReportEditor);
	
	var _ReportsButton = __webpack_require__(9);
	
	var _ReportsButton2 = _interopRequireDefault(_ReportsButton);
	
	var _DownloadButton = __webpack_require__(10);
	
	var _DownloadButton2 = _interopRequireDefault(_DownloadButton);
	
	var _DeleteButton = __webpack_require__(11);
	
	var _DeleteButton2 = _interopRequireDefault(_DeleteButton);
	
	var _jsreportStudio = __webpack_require__(8);
	
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _reactList = __webpack_require__(2);
	
	var _reactList2 = _interopRequireDefault(_reactList);
	
	var _ReportEditor = __webpack_require__(3);
	
	var _ReportEditor2 = _interopRequireDefault(_ReportEditor);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(8);
	
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
	    _this.skip = 0;
	    _this.top = 50;
	    _this.pending = 0;
	    _this.ActiveReport = null;
	    _instance = _this;
	    return _this;
	  }
	
	  _createClass(ReportEditor, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.lazyFetch();
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
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (r.contentType === 'text/html' || r.contentType === 'text/plain' || r.contentType === 'application/pdf' || r.contentType && r.contentType.indexOf('image') !== -1) {
	                  _jsreportStudio2.default.setPreviewFrameSrc('/reports/' + r._id + '/content');
	                } else {
	                  window.open(_jsreportStudio2.default.rootUrl + '/reports/' + r._id + '/attachment', '_self');
	                }
	
	                this.setState({ active: r._id });
	                this.ActiveReport = r;
	
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
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'tr',
	        {
	          key: index, className: this.state.active === report._id ? 'active' : '',
	          onClick: function onClick() {
	            return _this2.openReport(report);
	          } },
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
	      var _this3 = this;
	
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
	              return _this3.tryRenderItem(index);
	            },
	            length: count })
	        )
	      );
	    }
	  }]);
	
	  return ReportEditor;
	}(_react.Component);
	
	exports.default = ReportEditor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react-list'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ReportEditor.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ReportEditor.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".listContainer___1tp9A {\n  margin-top: 1rem;\n  overflow: auto;\n  position: relative;\n  padding: 1rem;\n  min-height: 0;\n  height: auto;\n}\n\n.listContainer___1tp9A > div {\n  width: 95%;\n  position: absolute !important;\n}\n", "", {"version":3,"sources":["/./studio/studio/ReportEditor.scss"],"names":[],"mappings":"AAAA;EACE,iBAAgB;EAChB,eAAc;EACd,mBAAkB;EAClB,cAAa;EACb,cAAa;EACb,aAAY;CACb;;AAED;EAEE,WAAU;EAEV,8BAA6B;CAC9B","file":"ReportEditor.scss","sourcesContent":[".listContainer {\r\n  margin-top: 1rem;\r\n  overflow: auto;\r\n  position: relative;\r\n  padding: 1rem;\r\n  min-height: 0;\r\n  height: auto;\r\n}\r\n\r\n.listContainer > div {\r\n  // it somehow shows the horizontal scrollbar even when no needeit, this workaround to hide it\r\n  width: 95%;\r\n  // the tabs height based on flex box is otherwise wrongly calculated\r\n  position: absolute !important;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports
	exports.locals = {
		"listContainer": "listContainer___1tp9A"
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(8);
	
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
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ReportEditor = __webpack_require__(1);
	
	var _ReportEditor2 = _interopRequireDefault(_ReportEditor);
	
	var _jsreportStudio = __webpack_require__(8);
	
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
	    key: 'download',
	    value: function download() {
	      if (_ReportEditor2.default.Instance && _ReportEditor2.default.Instance.ActiveReport) {
	        window.open(_jsreportStudio2.default.rootUrl + '/reports/' + _ReportEditor2.default.ActiveReport._id + '/attachment', '_self');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      if (!this.props.tab || this.props.tab.key !== 'Reports' || !_ReportEditor2.default.Instance || !_ReportEditor2.default.Instance.ActiveReport) {
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
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ReportEditor = __webpack_require__(1);
	
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
	    key: 'render',
	    value: function render() {
	      if (!this.props.tab || this.props.tab.key !== 'Reports' || !_ReportEditor2.default.Instance || !_ReportEditor2.default.Instance.ActiveReport) {
	        return _react2.default.createElement('div', null);
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'toolbar-button', onClick: function onClick() {
	            return _ReportEditor2.default.Instance.remove();
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
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};

/***/ }
/******/ ]);