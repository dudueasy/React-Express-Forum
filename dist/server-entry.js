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
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2; // 定义一个 Mobx store 的构造函数 AppStateClass.


var _mobx = __webpack_require__(4);

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

// AppStateClass receive count, name as params
var AppStateClass = (_class = function () {
  function AppStateClass() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'apolo';

    _classCallCheck(this, AppStateClass);

    _initDefineProp(this, 'count', _descriptor, this);

    _initDefineProp(this, 'name', _descriptor2, this);

    this.count = count;
    this.name = name;
  }

  _createClass(AppStateClass, [{
    key: 'add',
    value: function add() {
      this.count += 1;
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      return {
        count: this.count,
        name: this.name
      };
    }
  }, {
    key: 'msg',
    get: function get() {
      return this.name + ' : ' + this.count;
    }
  }]);

  return AppStateClass;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'count', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'name', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, 'msg', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'msg'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'add', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'add'), _class.prototype)), _class);

// update counter
// setInterval(
//   () => {
//     appState.add()
//   },
//   1000,
// )

exports.default = AppStateClass;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AppStateClass, 'AppStateClass', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/store/app-state.js');
}();

;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreMap = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _mobxReact = __webpack_require__(2);

var _store = __webpack_require__(6);

var _App = __webpack_require__(7);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mobxReact.useStaticRendering)(true); // server-entry

__webpack_require__(14).install();

// server-bundle 是一个函数 可以接收 store 作为 provider 传递的数据

var _default = function _default(stores, routerContext, url) {
  return (
    // stores = {store: xxx, ...}
    _react2.default.createElement(
      _mobxReact.Provider,
      stores,
      _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { context: routerContext, location: url },
        _react2.default.createElement(_App2.default, null)
      )
    )
  );
};

exports.default = _default;
exports.createStoreMap = _store.createStoreMap;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/server-entry.js');
}();

;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreMap = exports.AppState = undefined;

var _appState = __webpack_require__(3);

var _appState2 = _interopRequireDefault(_appState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppState = exports.AppState = _appState2.default;

var _default = {
  AppState: AppState

  // 这个函数为服务端渲染的组件提供store对象 {appState: storeObj}
};
exports.default = _default;
var createStoreMap = exports.createStoreMap = function createStoreMap() {
  return {
    appState: new AppState()
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AppState, 'AppState', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/store/store.js');

  __REACT_HOT_LOADER__.register(createStoreMap, 'createStoreMap', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/store/store.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/store/store.js');
}();

;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _router = __webpack_require__(8);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // do something here
    }
  }, {
    key: 'render',
    value: function render() {
      return [_react2.default.createElement(
        'div',
        { key: 'banner' },
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          '\u9996\u9875'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/detail' },
          '\u8BE6\u60C5\u9875'
        )
      ), _react2.default.createElement(_router2.default, { key: 'routes' })];
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(App, 'App', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/views/App.jsx');
}();

;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(11);

var _index4 = _interopRequireDefault(_index3);

var _api = __webpack_require__(12);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return [_react2.default.createElement(_reactRouterDom.Route, { path: '/', render: function render() {
      return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/list' });
    }, key: 'first-route', exact: true }), _react2.default.createElement(_reactRouterDom.Route, { path: '/list', component: _index2.default, key: 'second-route' }), _react2.default.createElement(_reactRouterDom.Route, { path: '/detail', component: _index4.default, key: 'third-route' }), _react2.default.createElement(_reactRouterDom.Route, { path: '/test', component: _api2.default, key: 'test' })];
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/config/router.js');
}();

;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _descriptor;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobx = __webpack_require__(4);

var _mobxReact = __webpack_require__(2);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _appState = __webpack_require__(3);

var _appState2 = _interopRequireDefault(_appState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var TopicList = (_dec = (0, _mobxReact.inject)('appState'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 = function (_React$Component) {
  _inherits(TopicList, _React$Component);

  function TopicList(props) {
    _classCallCheck(this, TopicList);

    var _this = _possibleConstructorReturn(this, (TopicList.__proto__ || Object.getPrototypeOf(TopicList)).call(this, props));

    _initDefineProp(_this, 'changeName', _descriptor, _this);

    _this.changeName = _this.changeName.bind(_this);
    return _this;
  }

  _createClass(TopicList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'asyncBoostrap',
    value: function asyncBoostrap() {
      var _this2 = this;

      return new Promise(function (resolve) {
        setTimeout(function () {
          _this2.props.appState.count = 3;
          resolve(true);
        }, 3000);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var appState = this.props.appState;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { type: 'text', onChange: this.changeName }),
        'This is topic list component',
        _react2.default.createElement(
          'p',
          null,
          appState.msg
        )
      );
    }
  }]);

  return TopicList;
}(_react2.default.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'changeName', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (e) {
      _this3.props.appState.name = e.target.value;
    };
  }
})), _class2)) || _class) || _class);
exports.default = TopicList;


TopicList.propTypes = {
  appState: _propTypes2.default.instanceOf(_appState2.default)

  // TopicList.defaultProps = {
  //   appState: new AppState(),
  // }

};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TopicList, 'TopicList', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/views/topic-list/index.js');
}();

;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopicDetail = function (_React$Component) {
  _inherits(TopicDetail, _React$Component);

  function TopicDetail() {
    _classCallCheck(this, TopicDetail);

    return _possibleConstructorReturn(this, (TopicDetail.__proto__ || Object.getPrototypeOf(TopicDetail)).apply(this, arguments));
  }

  _createClass(TopicDetail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // do something here
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'This is topic detail component'
      );
    }
  }]);

  return TopicDetail;
}(_react2.default.Component);

exports.default = TopicDetail;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TopicDetail, 'TopicDetail', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/views/topic-detail/index.js');
}();

;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(13);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */
var TestApi = function (_React$Component) {
  _inherits(TestApi, _React$Component);

  function TestApi() {
    _classCallCheck(this, TestApi);

    return _possibleConstructorReturn(this, (TestApi.__proto__ || Object.getPrototypeOf(TestApi)).apply(this, arguments));
  }

  _createClass(TestApi, [{
    key: 'getTopic',
    value: function getTopic() {
      _axios2.default.get('/api/topics').then(function (res) {
        return console.log(res);
      }).catch(function (err) {
        return console.log;
      });
    }
  }, {
    key: 'login',
    value: function login() {
      _axios2.default.post('/api/user/login', {
        accesstoken: 'e8cad389-e0a5-4769-9eee-5a5c3be7cfd8'
        // accesstoken: 'e8cad389-e0a5-4769-9eee-5a5c3be7c'
      }).then(function (res) {
        return console.log(res);
      }).catch(function (err) {
        return console.log;
      });
    }
  }, {
    key: 'markAll',
    value: function markAll() {
      _axios2.default.post('/api/message/mark_all?needAccessToken=true').then(function (res) {
        console.log(res);
      }).catch(function (err) {
        return console.log;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'button',
          { type: 'button', onClick: this.getTopic },
          ' topics'
        ),
        _react2.default.createElement(
          'button',
          { type: 'button', onClick: this.login },
          ' login'
        ),
        _react2.default.createElement(
          'button',
          { type: 'button', onClick: this.markAll },
          ' markAll'
        )
      );
    }
  }]);

  return TestApi;
}(_react2.default.Component);
/* eslint-enable */


exports.default = TestApi;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TestApi, 'TestApi', '/Users/apolodu/Documents/My_projects/React_Cnode_Project/client/views/test/api.test.jsx');
}();

;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ })
/******/ ]);