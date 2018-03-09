module.exports =
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "react"
var external__react_ = __webpack_require__(0);
var external__react__default = /*#__PURE__*/__webpack_require__.n(external__react_);

// EXTERNAL MODULE: external "next/link"
var link_ = __webpack_require__(3);
var link__default = /*#__PURE__*/__webpack_require__.n(link_);

// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__(4);
var style__default = /*#__PURE__*/__webpack_require__.n(style_);

// EXTERNAL MODULE: external "axios"
var external__axios_ = __webpack_require__(5);
var external__axios__default = /*#__PURE__*/__webpack_require__.n(external__axios_);

// EXTERNAL MODULE: external "react-grid-system"
var external__react_grid_system_ = __webpack_require__(6);
var external__react_grid_system__default = /*#__PURE__*/__webpack_require__.n(external__react_grid_system_);

// CONCATENATED MODULE: ./components/Conversion.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Conversion_Conversion = function (_Component) {
  _inherits(Conversion, _Component);

  function Conversion(props) {
    _classCallCheck(this, Conversion);

    var _this = _possibleConstructorReturn(this, (Conversion.__proto__ || Object.getPrototypeOf(Conversion)).call(this, props));

    _this.state = { value: '' };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Conversion, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'converter',
    value: function converter() {
      console.log('youtue conversion starting...');
      external__axios__default.a.post('/conversion/convert', {
        url: this.state.value
      }).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return external__react__default.a.createElement(
        'div',
        {
          className: 'jsx-4116678892'
        },
        external__react__default.a.createElement(
          external__react_grid_system_["Container"],
          null,
          external__react__default.a.createElement(
            'div',
            {
              className: 'jsx-4116678892' + ' ' + 'conversion-container'
            },
            external__react__default.a.createElement(
              'h1',
              {
                className: 'jsx-4116678892' + ' ' + 'main-text'
              },
              'What is the url?'
            ),
            external__react__default.a.createElement('input', { placeholder: 'url', type: 'text', value: this.state.value, onChange: this.handleChange, className: 'jsx-4116678892'
            }),
            external__react__default.a.createElement('span', {
              className: 'jsx-4116678892' + ' ' + 'input-highlight'
            }),
            external__react__default.a.createElement(
              'button',
              { onClick: this.converter.bind(this), className: 'jsx-4116678892' + ' ' + 'btn sixth'
              },
              'start'
            )
          )
        ),
        external__react__default.a.createElement(style__default.a, {
          styleId: '4116678892',
          css: ['.conversion-container.jsx-4116678892{padding:50px;margin-top:100px;background:rgba(255,255,255,0.35);border-radius:3px;box-shadow:0 1px 5px rgba(0,0,0,0.25);font-family:Helvetica Neue,Helvetica,Arial,sans-serif;top:10px;left:0;right:0;z-index:2;}', '.main-text.jsx-4116678892{font-size:100px;font-family:\'Montserrat\';color:white;}', '.input-highlight.jsx-4116678892{font-size:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;line-height:70px;border-top:3px solid white;position:absolute;left:0;bottom:0;max-width:100%;height:0;color:transparent;font-family:Roboto Slab,sans-serif;overflow:hidden;}', '.btn.jsx-4116678892{box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border:2px solid $red;border-radius:0.6em;color:$red;cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;font-size:1rem;font-weight:400;line-height:1;margin:20px;padding:1.2em 2.8em;text-decoration:none;text-align:center;text-transform:uppercase;font-family:\'Montserrat\',sans-serif;font-weight:700;}', 'input.jsx-4116678892{height:60px;width:100%;min-width:100%;padding:0;border-radius:0;line-height:70px;background-color:transparent;color:white;font-size:30px;border:none;outline:none;border-bottom:3px solid #333333;font-family:Roboto Slab,sans-serif;}', 'input.jsx-4116678892:focus+.input-highlight.jsx-4116678892{border-top:3px solid #fbc91b;}']
        })
      );
    }
  }]);

  return Conversion;
}(external__react_["Component"]);

/* harmony default export */ var components_Conversion = (Conversion_Conversion);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(7);
var head__default = /*#__PURE__*/__webpack_require__.n(head_);

// CONCATENATED MODULE: ./pages/index.js





/* harmony default export */ var pages = __webpack_exports__["default"] = (function () {
  return external__react__default.a.createElement(
    'div',
    null,
    external__react__default.a.createElement(
      head__default.a,
      null,
      external__react__default.a.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width', key: 'viewport' }),
      external__react__default.a.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Montserrat', rel: 'stylesheet' }),
      external__react__default.a.createElement(
        'style',
        null,
        '\n        html {\n          background: url(\'../static/back.jpg\') no-repeat center center fixed;\n          background-size: cover;\n          display: block;\n          height: 800px;\n          left: 0;\n          position: fixed;\n          right: 0;\n        }\n      '
      )
    ),
    external__react__default.a.createElement(
      'div',
      null,
      external__react__default.a.createElement(components_Conversion, null)
    )
  );
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-grid-system");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ })
/******/ ]);