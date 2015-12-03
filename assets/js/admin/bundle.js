(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _reactDom = require('react-dom');

var _index = require('./index');

(0, _reactDom.render)((0, _index.GetRouter)(), document.getElementById('body'));
delete global.__ReactInitState__;

// // decomment for testing perf
// import React from 'react/addons'
// window.React = React

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./index":14,"react-dom":"react-dom"}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _newforms = require('newforms');

var _newformsBootstrap = require('newforms-bootstrap');

var _newformsBootstrap2 = _interopRequireDefault(_newformsBootstrap);

var _libMakeForm = require('../lib/make-form');

var _libMakeForm2 = _interopRequireDefault(_libMakeForm);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.makeForm(this.props.formItem);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.mForm) delete this.mForm;
    }
  }, {
    key: 'makeForm',
    value: function makeForm() {
      var formItem = arguments.length <= 0 || arguments[0] === undefined ? this.props.formItem : arguments[0];
      var data = arguments.length <= 1 || arguments[1] === undefined ? this.props.item : arguments[1];

      return (0, _libMakeForm2['default'])(formItem, data);
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(e) {
      e.preventDefault();
      var form = this.mForm.getForm();
      if (form.validate()) this.props.onSave(form.cleanedData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var mForm = this.makeForm();
      if (this.props.modelForm) return _react2['default'].createElement(
        'form',
        { onSubmit: this._onSubmit.bind(this), encType: 'multipart/form-data' },
        mForm && this.props.formItem && _react2['default'].createElement(
          _newforms.RenderForm,
          { form: mForm, ref: function (ref) {
              return _this.mForm = ref;
            } },
          (0, _react.cloneElement)(this.props.modelForm)
        )
      );

      return _react2['default'].createElement(
        'form',
        { onSubmit: this._onSubmit.bind(this), encType: 'multipart/form-data' },
        _react2['default'].createElement(
          'h1',
          null,
          this.props.identity
        ),
        _react2['default'].createElement('hr', null),
        _react2['default'].createElement(
          'p',
          { className: 'text-right' },
          _react2['default'].createElement(
            'button',
            { className: 'btn btn-default' },
            'Save'
          )
        ),
        mForm && this.props.formItem && _react2['default'].createElement(
          _newforms.RenderForm,
          { form: mForm, ref: function (ref) {
              return _this.mForm = ref;
            } },
          _react2['default'].createElement(_newformsBootstrap2['default'], { form: new mForm() })
        )
      );
    }
  }]);

  return _default;
})(_react2['default'].Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"../lib/make-form":16,"newforms":"newforms","newforms-bootstrap":"newforms-bootstrap","react":"react"}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: "_onChange",
    value: function _onChange(lbl, e) {
      e.preventDefault();
      this.props.filterBy(lbl, e.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react2["default"].createElement(
        "tr",
        null,
        _react2["default"].createElement("th", null),
        _react2["default"].createElement("th", null),
        this.props.item.map(function (it) {
          return _react2["default"].createElement(
            "th",
            { key: it.label },
            _react2["default"].createElement("input", { type: "text", onChange: _this._onChange.bind(_this, it.label) })
          );
        })
      );
    }
  }]);

  return _default;
})(_react2["default"].Component);

exports["default"] = _default;
module.exports = exports["default"];

},{"react":"react"}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var item = this.props.item,
          type = this.props.type,
          ifBinary = type === 'binary',
          ifBoolean = type === 'boolean',
          anythingElse = !(ifBinary || ifBoolean);
      return _react2['default'].createElement(
        'div',
        null,
        item && ifBinary && _react2['default'].createElement(ContentBinary, { item: item }),
        item && ifBoolean && _react2['default'].createElement(ContentBoolean, { item: item }),
        item && anythingElse && item.toString()
      );
    }
  }]);

  return _default;
})(_react2['default'].Component);

exports['default'] = _default;

var ContentBinary = (function (_React$Component2) {
  _inherits(ContentBinary, _React$Component2);

  function ContentBinary() {
    _classCallCheck(this, ContentBinary);

    _get(Object.getPrototypeOf(ContentBinary.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ContentBinary, [{
    key: 'render',
    value: function render() {
      var item = this.props.item;
      var cond = item.split("/")[0] === 'data:image';
      return _react2['default'].createElement(
        'span',
        null,
        item && _react2['default'].createElement('img', { src: item || 'data:image/png;base64,null' }),
        !item && _react2['default'].createElement(
          'a',
          { href: item },
          'Download'
        )
      );
    }
  }]);

  return ContentBinary;
})(_react2['default'].Component);

var ContentBoolean = (function (_React$Component3) {
  _inherits(ContentBoolean, _React$Component3);

  function ContentBoolean() {
    _classCallCheck(this, ContentBoolean);

    _get(Object.getPrototypeOf(ContentBoolean.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ContentBoolean, [{
    key: 'render',
    value: function render() {
      var item = this.props.item;
      return _react2['default'].createElement(
        'span',
        null,
        item ? 'true' : 'false'
      );
    }
  }]);

  return ContentBoolean;
})(_react2['default'].Component);

module.exports = exports['default'];

},{"react":"react"}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _listItemContent = require('./list-item-content');

var _listItemContent2 = _interopRequireDefault(_listItemContent);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var item = this.props.item;
      var url = "/" + this.props.urlParams.identity + "/" + this.props.urlParams.id;
      return _react2['default'].createElement(
        'tr',
        { key: item.id },
        _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: url, params: this.props.urlParams },
            'Edit'
          )
        ),
        _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: url + '/delete', params: this.props.urlParams },
            'Delete'
          )
        ),
        this.props.fItem.map(function (it) {
          return _react2['default'].createElement(
            'td',
            { key: it.label },
            _react2['default'].createElement(_listItemContent2['default'], { item: item[it.label], type: it.type })
          );
        })
      );
    }
  }]);

  return _default;
})(_react2['default'].Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"./list-item-content":4,"react":"react","react-router":"react-router"}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: "_onClick",
    value: function _onClick(lbl, e) {
      if (e) e.preventDefault();
      this.props.sortBy(lbl);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react2["default"].createElement(
        "tr",
        null,
        _react2["default"].createElement("th", null),
        _react2["default"].createElement("th", null),
        this.props.item && this.props.item.map(function (it) {
          return _react2["default"].createElement(
            "th",
            { key: it.label, onClick: _this._onClick.bind(_this, it.label) },
            it.label
          );
        })
      );
    }
  }]);

  return _default;
})(_react2["default"].Component);

exports["default"] = _default;
module.exports = exports["default"];

},{"react":"react"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listSort = require('./list-sort');

var _listSort2 = _interopRequireDefault(_listSort);

var _listFilter = require('./list-filter');

var _listFilter2 = _interopRequireDefault(_listFilter);

var _rcPagination = require('rc-pagination');

var _rcPagination2 = _interopRequireDefault(_rcPagination);

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'sortBy',
    value: function sortBy(lbl) {
      this.props.sortBy(lbl);
    }
  }, {
    key: 'filterBy',
    value: function filterBy(lbl, val) {
      this.props.filterBy(lbl, val);
    }
  }, {
    key: 'changePage',
    value: function changePage(lbl) {
      this.props.changePage(lbl);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var fItem = this.props.formItem || [{ label: 'id' }];
      var items = this.props.items;
      return _react2['default'].createElement(
        'div',
        { className: 'table-responsive' },
        _react2['default'].createElement(
          'h1',
          null,
          this.props.identity,
          ' List'
        ),
        _react2['default'].createElement(
          'table',
          { className: 'table' },
          _react2['default'].createElement(
            'thead',
            null,
            _react2['default'].createElement(_listSort2['default'], { item: fItem, sortBy: this.sortBy.bind(this) }),
            _react2['default'].createElement(_listFilter2['default'], { item: fItem, filterBy: this.filterBy.bind(this) })
          ),
          _react2['default'].createElement(
            'tbody',
            null,
            items && items.map(function (item) {
              var urlParams = { identity: _this.props.identity, id: item.id };
              return _react2['default'].createElement(_listItem2['default'], { key: item.id, item: item, fItem: fItem, urlParams: urlParams });
            })
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'wrap-pagination' },
          _react2['default'].createElement(_rcPagination2['default'], { className: 'pagination',
            onChange: this.changePage.bind(this),
            pageSize: this.props.limit,
            current: this.props.current,
            total: this.props.total })
        )
      );
    }
  }]);

  return _default;
})(_react2['default'].Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"./list-filter":3,"./list-item":5,"./list-sort":6,"rc-pagination":22,"react":"react"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), "constructor", this).apply(this, arguments);
  }

  return _default;
})(_react.Component);

exports["default"] = _default;
module.exports = exports["default"];

// static defaultProps = {
//   root: '/admin'
// }
// static propTypes = {
//   root: React.PropTypes.string.isRequired
// }

},{"react":"react"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _comForm = require('../com/form');

var _comForm2 = _interopRequireDefault(_comForm);

var FormItem = (function (_AdminComponent) {
  _inherits(FormItem, _AdminComponent);

  function FormItem() {
    _classCallCheck(this, FormItem);

    _get(Object.getPrototypeOf(FormItem.prototype), 'constructor', this).apply(this, arguments);
  }

  // FormItem.contextTypes = { hi: React.PropTypes.object }

  _createClass(FormItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.identity = this.props.identity;
      if (this.props.params && this.props.params.identity) this.identity = this.props.params.identity;

      this.getItem(this.identity);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (this.props.location.pathname !== props.location.pathname) {
        this.getItem(this.props.params.identity);
      } else if (this.props.params.identity !== props.params.identity) {
        this.getItem(this.props.params.identity);
      }
    }
  }, {
    key: 'getItem',
    value: function getItem(identity) {
      var _this = this;

      this.identity = identity;
      this.setState({ loading: true });
      var id = this.props.params ? this.props.params.id : this.props.id;
      var url = id ? "/" + id : "/new";
      if (typeof io !== "undefined") {
        io.socket.get(this.props.root || '/admin' + "/" + identity + url, function (res) {
          res.loading = false;
          if (_this.props.models && _this.props.models[_this.identity]) res.modelForm = _this.props.models[_this.identity];
          _this.setState(_extends({}, res));
        });
      }
    }
  }, {
    key: 'multipart',
    value: function multipart(data, binaries, cb) {
      var _this2 = this;

      if (binaries.length) {
        (function () {
          var tmp = binaries.pop();
          if (data[tmp.label] instanceof Blob) {
            var reader = new FileReader();
            reader.onload = function (upload) {
              data[tmp.label] = upload.target.result;
              _this2.multipart(data, binaries, cb);
            };
            reader.readAsDataURL(data[tmp.label]);
          } else _this2.multipart(data, binaries, cb);
        })();
      } else cb(data);
    }
  }, {
    key: 'saving',
    value: function saving(data, url, cb) {
      var _this3 = this;

      if (typeof io !== "undefined") {
        if (typeof url === 'function') {
          cb = url;
          url = "";
        }
        var fItem = undefined;
        if (this.state && this.state.formItem) fItem = this.state.formItem;
        var binaries = fItem.filter(function (a) {
          return a.type === 'binary';
        });
        this.multipart(data, binaries, function (result) {
          io.socket.post("/" + _this3.identity + url, result, function (res) {
            if (cb) cb(res);
          });
        });
      }
    }
  }, {
    key: 'onSave',
    value: function onSave(data) {}
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) {
        var props = _extends({}, this.props);
        if (this.props.models && this.props.models[this.identity]) props.modelForm = this.props.models[this.identity];
        return _react2['default'].createElement(_comForm2['default'], _extends({ onSave: this.onSave.bind(this) }, props));
      } else if (this.state.loading) {
        return _react2['default'].createElement('form', null);
      }

      return _react2['default'].createElement(_comForm2['default'], _extends({ onSave: this.onSave.bind(this)
      }, this.state, {
        modelForm: this.props.models[this.identity] }));
    }
  }]);

  return FormItem;
})(_admin2['default']);

var Update = (function (_FormItem) {
  _inherits(Update, _FormItem);

  function Update() {
    _classCallCheck(this, Update);

    _get(Object.getPrototypeOf(Update.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Update, [{
    key: 'onSave',
    value: function onSave(data) {
      var _this4 = this;

      this.saving(data, "/" + this.props.params.id, function (res) {
        _this4.props.history.pushState(null, _this4.identity, { force: true });
      });
    }
  }]);

  return Update;
})(FormItem);

exports.Update = Update;

var Create = (function (_FormItem2) {
  _inherits(Create, _FormItem2);

  function Create() {
    _classCallCheck(this, Create);

    _get(Object.getPrototypeOf(Create.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Create, [{
    key: 'onSave',
    value: function onSave(data) {
      var _this5 = this;

      this.saving(data, function (res) {
        _this5.props.history.pushState(null, _this5.identity, { force: true });
      });
    }
  }]);

  return Create;
})(FormItem);

exports.Create = Create;

},{"../com/form":2,"./admin":8,"react":"react"}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _default = (function (_AdminComponent) {
  _inherits(_default, _AdminComponent);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.identity = this.props.identity;
      if (this.props.params && this.props.params.identity) this.identity = this.props.params.identity;
      this.getItem(this.identity);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (this.props.location.pathname !== props.location.pathname) {
        this.getItem(this.props.params.identity);
      } else if (this.props.params.identity !== props.params.identity) {
        this.getItem(this.props.params.identity);
      }
    }
  }, {
    key: 'getItem',
    value: function getItem(identity) {
      var _this = this;

      this.identity = identity;
      var id = this.props.params ? this.props.params.id : this.props.id;
      var url = "/" + id + "/delete";
      if (typeof io !== "undefined") {
        io.socket.get(this.props.root || '/admin' + "/" + identity + url, function (res) {
          _this.setState(_extends({}, res));
        });
      }
    }
  }, {
    key: '_onSaving',
    value: function _onSaving() {
      var _this2 = this;

      var id = this.props.params ? this.props.params.id : this.props.id;
      io.socket['delete']("/" + this.identity + "/" + id, {}, function (res) {
        _this2.props.history.pushState(null, _this2.identity, { force: true });
      });
    }
  }, {
    key: '_onCancel',
    value: function _onCancel() {
      this.props.history.pushState(null, this.identity, { force: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var item = this.state ? this.state.item : {};
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { className: 'text-center' },
          _react2['default'].createElement(
            'h1',
            null,
            'Are you sure you want delete this ',
            this.identity,
            ' ?'
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'button',
            { type: 'button', onClick: this._onSaving.bind(this), className: 'btn btn-lg btn-warning' },
            'Yes'
          ),
          _react2['default'].createElement(
            'button',
            { type: 'button', onClick: this._onCancel.bind(this), className: 'btn btn-lg btn-default' },
            'No'
          ),
          _react2['default'].createElement('hr', null)
        ),
        item && item.id && Object.keys(item).map(function (k) {
          return _react2['default'].createElement(Item, { key: k, label: k, value: item[k] });
        })
      );
    }
  }]);

  return _default;
})(_admin2['default']);

exports['default'] = _default;

var Item = (function (_Component) {
  _inherits(Item, _Component);

  function Item() {
    _classCallCheck(this, Item);

    _get(Object.getPrototypeOf(Item.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Item, [{
    key: 'render',
    value: function render() {
      var cond = ['string', 'number'].indexOf(typeof this.props.value) === -1;
      return _react2['default'].createElement(
        'div',
        { className: 'row' },
        _react2['default'].createElement(
          'div',
          { className: 'col-md-3 text-right' },
          _react2['default'].createElement(
            'strong',
            null,
            this.props.label,
            ':'
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-md-9' },
          !cond && _react2['default'].createElement(
            'span',
            null,
            this.props.value
          ),
          cond && _react2['default'].createElement(
            'span',
            null,
            this.props.value.toString()
          )
        )
      );
    }
  }]);

  return Item;
})(_react.Component);

module.exports = exports['default'];

},{"./admin":8,"react":"react"}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _default = (function (_AdminComponent) {
  _inherits(_default, _AdminComponent);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;

      if (typeof io !== "undefined") io.socket.get(this.props.root || '/admin', function (res) {
        _this.setState(res);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'h1',
        null,
        'ADMIN: HomePage'
      );
    }
  }]);

  return _default;
})(_admin2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"./admin":8,"react":"react"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _comList = require('../com/list');

var _comList2 = _interopRequireDefault(_comList);

var _default = (function (_AdminComponent) {
  _inherits(_default, _AdminComponent);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'componentWillMount',

    // state = {
    //   contain: {},
    //   sort: this.props.sort||['id', 'ASC'],
    //   skip: this.props.skip||0,
    //   limit: this.props.limit||30
    // }
    value: function componentWillMount() {
      this.setState({
        contain: {},
        sort: this.props.sort || ['id', 'ASC'],
        skip: this.props.skip || 0,
        limit: this.props.limit || 30
      });
      if (!this.props.items || this.props.location.query.force) {
        this.getItems(this.props.params.identity || this.props.identity);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (this.props.location.pathname !== props.location.pathname) {
        this.getItems(this.props.params.identity);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      if (state.doChange && state.doChange !== this.state.doChange) {
        this.getItems(props.params.identity, {
          contain: state.contain || {},
          sort: state.sort.join(" ") || "id ASC",
          limit: props.limit || 30,
          skip: state.skip || 0
        });
        this.setState({ doChange: false });
      }
    }
  }, {
    key: 'getItems',
    value: function getItems(identity, params) {
      var _this = this;

      if (identity === undefined) identity = this.props.identity || this.props.params.identity;

      if (typeof io !== "undefined") {
        params = params || {
          contain: this.state ? this.state.contain : {},
          sort: this.state ? this.state.sort.join(" ") : "id ASC",
          limit: this.state ? this.state.limit : 30,
          skip: this.state ? this.state.skip : 0
        };
        io.socket.get(this.props.root || '/admin' + "/" + identity, params, function (res) {
          _this.setState(res);
        });
      }
    }
  }, {
    key: 'filterBy',
    value: function filterBy(lbl, val) {
      var contain = this.state.contain;
      contain[lbl] = { 'contains': val };
      this.setState({ contain: contain, doChange: true });
    }
  }, {
    key: 'sortBy',
    value: function sortBy(lbl) {
      var sort = this.state.sort;
      var direction = 'ASC';
      if (sort[0] === lbl) direction = sort[1] === 'ASC' ? 'DESC' : 'ASC';
      this.setState({
        doChange: true,
        sort: [lbl, direction]
      });
    }
  }, {
    key: 'changePage',
    value: function changePage(num) {
      var skip = (num - 1) * (this.props.limit || this.state.limit);
      this.setState({
        doChange: true,
        skip: skip
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2['default'].createElement(_comList2['default'], _extends({ items: []
      }, this.props, this.props.params, this.state, {
        changePage: this.changePage.bind(this),
        sortBy: this.sortBy.bind(this),
        filterBy: this.filterBy.bind(this) }));
    }
  }]);

  return _default;
})(_admin2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../com/list":7,"./admin":8,"react":"react"}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _newformsBootstrap = require('newforms-bootstrap');

var user = _react2['default'].createElement(
  _newformsBootstrap.Container,
  { autoColumns: 'md' },
  _react2['default'].createElement(
    'h1',
    null,
    'Rôle'
  ),
  _react2['default'].createElement('hr', null),
  _react2['default'].createElement(
    'p',
    { className: 'text-right' },
    _react2['default'].createElement(
      'button',
      { className: 'btn btn-default' },
      'Save'
    )
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'username', md: '8' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'active' })
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'email', md: '8' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'role' })
  )
);

exports.user = user;
var role = _react2['default'].createElement(
  _newformsBootstrap.Container,
  { autoColumns: 'md' },
  _react2['default'].createElement(
    'h1',
    null,
    'Rôle'
  ),
  _react2['default'].createElement('hr', null),
  _react2['default'].createElement(
    'p',
    { className: 'text-right' },
    _react2['default'].createElement(
      'button',
      { className: 'btn btn-default' },
      'Save'
    )
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'name', md: '8' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'active' })
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'description' })
  )
);

exports.role = role;
var room = _react2['default'].createElement(
  _newformsBootstrap.Container,
  { autoColumns: 'md' },
  _react2['default'].createElement(
    'h1',
    null,
    'Room'
  ),
  _react2['default'].createElement('hr', null),
  _react2['default'].createElement(
    'p',
    { className: 'text-right' },
    _react2['default'].createElement(
      'button',
      { className: 'btn btn-default' },
      'Save'
    )
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'name', md: '8' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'color' })
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'description' })
  )
);

exports.room = room;
var event = _react2['default'].createElement(
  _newformsBootstrap.Container,
  { autoColumns: 'md' },
  _react2['default'].createElement(
    'h1',
    null,
    'Event'
  ),
  _react2['default'].createElement('hr', null),
  _react2['default'].createElement(
    'p',
    { className: 'text-right' },
    _react2['default'].createElement(
      'button',
      { className: 'btn btn-default' },
      'Save'
    )
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'title', md: '4' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'room', md: '4' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'member' })
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'content' })
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'start', md: '6' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'end' })
  )
);

exports.event = event;
var image = _react2['default'].createElement(
  _newformsBootstrap.Container,
  { autoColumns: 'md' },
  _react2['default'].createElement(
    'h1',
    null,
    'special Image'
  ),
  _react2['default'].createElement('hr', null),
  _react2['default'].createElement(
    'p',
    { className: 'text-right' },
    _react2['default'].createElement(
      'button',
      { className: 'btn btn-default' },
      'Save'
    )
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'title' })
  ),
  _react2['default'].createElement(
    _newformsBootstrap.Row,
    null,
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'small', md: '4' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'medium', md: '4' }),
    _react2['default'].createElement(_newformsBootstrap.Field, { name: 'big' })
  )
);
exports.image = image;

},{"newforms-bootstrap":"newforms-bootstrap","react":"react"}],14:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _history = require('history');

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _ctrlHome = require('./ctrl/home');

var _ctrlHome2 = _interopRequireDefault(_ctrlHome);

var _ctrlList = require('./ctrl/list');

var _ctrlList2 = _interopRequireDefault(_ctrlList);

var _ctrlCreate_update = require('./ctrl/create_update');

var _ctrlDelete = require('./ctrl/delete');

var _ctrlDelete2 = _interopRequireDefault(_ctrlDelete);

function GetRouter(basename, layout) {
  if (basename === undefined) basename = '/admin';

  var history = (0, _history.useBasename)(_history.createHistory)({ basename: basename });
  return _react2['default'].createElement(
    _reactRouter2['default'],
    { history: history },
    Routes(layout)
  );
}

function Routes() {
  var layout = arguments.length <= 0 || arguments[0] === undefined ? _layout2['default'] : arguments[0];

  return _react2['default'].createElement(
    _reactRouter.Route,
    { path: '/', component: layout },
    _react2['default'].createElement(_reactRouter.IndexRoute, { component: _ctrlHome2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: ':identity', component: _ctrlList2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: ':identity/new', component: _ctrlCreate_update.Create }),
    _react2['default'].createElement(_reactRouter.Route, { path: ':identity/:id', component: _ctrlCreate_update.Update }),
    _react2['default'].createElement(_reactRouter.Route, { path: ':identity/:id/delete', component: _ctrlDelete2['default'] })
  );
}

module.exports = {
  Home: _ctrlHome2['default'],
  List: _ctrlList2['default'],
  Create: _ctrlCreate_update.Create,
  Update: _ctrlCreate_update.Update,
  Delete: _ctrlDelete2['default'],
  GetRouter: GetRouter,
  Routes: Routes
};

},{"./ctrl/create_update":9,"./ctrl/delete":10,"./ctrl/home":11,"./ctrl/list":12,"./layout":15,"history":"history","react":"react","react-router":"react-router"}],15:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nav = require('./nav');

var _nav2 = _interopRequireDefault(_nav);

var _forms = require('./forms');

var modelsForm = _interopRequireWildcard(_forms);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      if (!this.initState) this.initState = global.__ReactInitState__;
      this.initState.models = modelsForm;
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_nav2['default'], this.initState),
        this.props.children && (0, _react.cloneElement)(this.props.children, _extends({}, this.initState))
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./forms":13,"./nav":17,"react":"react"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _newforms = require('newforms');

exports['default'] = function (formItem, data) {
  var mobj = {};
  if (formItem) {
    for (var i = 0, len = formItem.length; i < len; i++) {
      var item = formItem[i];
      if (['id', 'createdAt', 'updatedAt'].indexOf(item.label) === -1) {
        var params = item;
        if (data && data[item.label]) params.initial = data[item.label];else if (item.defaultsTo) params.initial = item.defaultsTo;
        delete params.defaultsTo;

        switch (item.input) {
          case 'binary':
            if (data && data[item.label]) params.initial = getFile(item.label, data[item.label]);
            mobj[item.label] = (0, _newforms.FileField)(params);break;
          case 'image':
            if (data && data[item.label]) params.initial = getFile(item.label, data[item.label]);
            mobj[item.label] = (0, _newforms.ImageField)(params);break;
          case 'email':
            mobj[item.label] = (0, _newforms.EmailField)(params);break;
          case 'url':
            mobj[item.label] = (0, _newforms.URLField)(params);break;
          case 'urlish':
            mobj[item.label] = (0, _newforms.FilePathField)(params);break;
          case 'ipv4':
            mobj[item.label] = (0, _newforms.GenericIPAddressField)(params, 'ipv4');break;
          case 'ipv6':
            mobj[item.label] = (0, _newforms.GenericIPAddressField)(params, 'ipv6');break;
          case 'text':
            params.widget = _newforms.Textarea;
          case 'string':
            mobj[item.label] = (0, _newforms.CharField)(params);break;
          case 'regex':
            mobj[item.label] = (0, _newforms.RegexField)(eval(item.pattern), params);break;
          case 'slug':
            mobj[item.label] = (0, _newforms.SlugField)(params);break;
          case 'integer':
            mobj[item.label] = (0, _newforms.IntegerField)(params);break;
          case 'float':
            mobj[item.label] = (0, _newforms.FloatField)(params);break;
          case 'date':
            mobj[item.label] = (0, _newforms.DateField)(params);break;
          case 'datetime':
            params.widget = _newforms.SplitDateTimeWidget;
            if (data) params.initial = new Date(data[item.label]);
            mobj[item.label] = (0, _newforms.DateTimeField)(params);break;
          case 'boolean':
            mobj[item.label] = (0, _newforms.BooleanField)(params);break;
          case 'choice':
            params.choices = item['in'];
            mobj[item.label] = (0, _newforms.ChoiceField)(params);break;
        }
      }
    }
  }
  return _newforms.Form.extend(mobj);
};

function getFile(name, url) {
  function CurrentFile() {
    this.name = name;
    this.url = url;
  }
  CurrentFile.prototype.toString = function () {
    return this.name;
  };
  return new CurrentFile(name, url);
}
module.exports = exports['default'];

},{"newforms":"newforms"}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var identities = this.props.identities;
      return _react2['default'].createElement(
        'nav',
        { className: 'navbar navbar-default navbar-fixed-top' },
        _react2['default'].createElement(
          'div',
          { className: 'container' },
          _react2['default'].createElement(
            'ul',
            { className: 'nav navbar-nav' },
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'a',
                { href: '/' },
                'Go to website'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/' },
                'Admin'
              )
            ),
            identities && identities.map(function (identity) {
              return _react2['default'].createElement(
                'li',
                { className: 'dropdown', key: identity },
                _react2['default'].createElement(
                  'a',
                  { href: '#', className: 'dropdown-toggle',
                    'data-toggle': 'dropdown', role: 'button',
                    'aria-haspopup': 'true', 'aria-expanded': 'false' },
                  identity,
                  _react2['default'].createElement('span', { className: 'caret' })
                ),
                _react2['default'].createElement(
                  'ul',
                  { className: 'dropdown-menu' },
                  _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: '/' + identity },
                      'List'
                    )
                  ),
                  _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: '/' + identity + '/new' },
                      'Create'
                    )
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"react":"react","react-router":"react-router"}],18:[function(require,module,exports){
"use strict";

module.exports = {
  ZERO: 48,
  NINE: 57,

  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,

  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,

  ARROW_UP: 38,
  ARROW_DOWN: 40
};
},{}],19:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var KEYCODE = require('./KeyCode');

var Options = (function (_React$Component) {
  _inherits(Options, _React$Component);

  function Options(props) {
    var _this = this;

    _classCallCheck(this, Options);

    _get(Object.getPrototypeOf(Options.prototype), 'constructor', this).call(this, props);

    this.state = {
      current: props.current,
      _current: props.current
    };

    ['_handleChange', '_changeSize', '_go', '_buildOptionText'].forEach(function (method) {
      return _this[method] = _this[method].bind(_this);
    });
  }

  _createClass(Options, [{
    key: '_buildOptionText',
    value: function _buildOptionText(value) {
      return value + ' ' + this.props.locale.items_per_page;
    }
  }, {
    key: '_changeSize',
    value: function _changeSize(value) {
      this.props.changeSize(Number(value));
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(evt) {
      var _val = evt.target.value;

      this.setState({
        _current: _val
      });
    }
  }, {
    key: '_go',
    value: function _go(e) {
      var _val = e.target.value;
      if (_val === '') {
        return;
      }
      var val = Number(this.state._current);
      if (isNaN(val)) {
        val = this.state.current;
      }
      if (e.keyCode === KEYCODE.ENTER) {
        var c = this.props.quickGo(val);
        this.setState({
          _current: c,
          current: c
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var state = this.state;
      var locale = props.locale;
      var prefixCls = props.rootPrefixCls + '-options';
      var changeSize = props.changeSize;
      var quickGo = props.quickGo;
      var buildOptionText = props.buildOptionText || this._buildOptionText;
      var Select = props.selectComponentClass;
      var changeSelect = null;
      var goInput = null;

      if (!(changeSize || quickGo)) {
        return null;
      }

      if (changeSize && Select) {
        (function () {
          var Option = Select.Option;
          var defaultOption = props.pageSizeOptions[0];
          var options = props.pageSizeOptions.map(function (opt, i) {
            return React.createElement(
              Option,
              { key: i, value: opt },
              buildOptionText(opt)
            );
          });

          changeSelect = React.createElement(
            Select,
            {
              prefixCls: props.selectPrefixCls, showSearch: false,
              className: prefixCls + '-size-changer',
              optionLabelProp: 'children',
              defaultValue: defaultOption, onChange: _this2._changeSize },
            options
          );
        })();
      }

      if (quickGo) {
        goInput = React.createElement(
          'div',
          { title: 'Quick jump to page', className: prefixCls + '-quick-jumper' },
          locale.jump_to,
          React.createElement('input', { type: 'text', value: state._current, onChange: this._handleChange.bind(this), onKeyUp: this._go.bind(this) }),
          locale.page
        );
      }

      return React.createElement(
        'div',
        { className: '' + prefixCls },
        changeSelect,
        goInput
      );
    }
  }]);

  return Options;
})(React.Component);

Options.propTypes = {
  changeSize: React.PropTypes.func,
  quickGo: React.PropTypes.func,
  selectComponentClass: React.PropTypes.func,
  current: React.PropTypes.number,
  pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
  buildOptionText: React.PropTypes.func,
  locale: React.PropTypes.object
};

Options.defaultProps = {
  pageSizeOptions: ['10', '20', '30', '40']
};

module.exports = Options;
},{"./KeyCode":18,"react":"react"}],20:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Pager = (function (_React$Component) {
  _inherits(Pager, _React$Component);

  function Pager() {
    _classCallCheck(this, Pager);

    _get(Object.getPrototypeOf(Pager.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Pager, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var locale = props.locale;
      var prefixCls = props.rootPrefixCls + '-item';
      var cls = prefixCls + ' ' + prefixCls + '-' + props.page;

      if (props.active) {
        cls = cls + ' ' + prefixCls + '-active';
      }

      var title = undefined;
      if (props.page === 1) {
        title = locale.first_page;
      } else if (props.last) {
        title = locale.last_page + ': ' + props.page;
      } else {
        title = props.page;
      }
      return React.createElement(
        'li',
        { title: title, className: cls, onClick: props.onClick },
        React.createElement(
          'a',
          null,
          props.page
        )
      );
    }
  }]);

  return Pager;
})(React.Component);

Pager.propTypes = {
  page: React.PropTypes.number,
  active: React.PropTypes.bool,
  last: React.PropTypes.bool,
  locale: React.PropTypes.object
};

module.exports = Pager;
},{"react":"react"}],21:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Pager = require('./Pager');
var Options = require('./Options');
var KEYCODE = require('./KeyCode');
var LOCALE = require('./locale/zh_CN');

function noop() {}

var Pagination = (function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination(props) {
    var _this = this;

    _classCallCheck(this, Pagination);

    _get(Object.getPrototypeOf(Pagination.prototype), 'constructor', this).call(this, props);

    var hasOnChange = props.onChange !== noop;
    var hasCurrent = ('current' in props);
    if (hasCurrent && !hasOnChange) {
      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.');
    }

    var current = props.defaultCurrent;
    if ('current' in props) {
      current = props.current;
    }

    this.state = {
      current: current,
      _current: current,
      pageSize: props.pageSize
    };

    ['render', '_handleChange', '_handleKeyUp', '_handleKeyDown', '_changePageSize', '_isValid', '_prev', '_next', '_hasPrev', '_hasNext', '_jumpPrev', '_jumpNext'].forEach(function (method) {
      return _this[method] = _this[method].bind(_this);
    });
  }

  _createClass(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('current' in nextProps) {
        this.setState({
          current: nextProps.current
        });
      }

      if ('pageSize' in nextProps) {
        this.setState({
          pageSize: nextProps.pageSize
        });
      }
    }

    // private methods

  }, {
    key: '_calcPage',
    value: function _calcPage(p) {
      var pageSize = p;
      if (typeof pageSize === 'undefined') {
        pageSize = this.state.pageSize;
      }
      return Math.floor((this.props.total - 1) / pageSize) + 1;
    }
  }, {
    key: '_isValid',
    value: function _isValid(page) {
      return typeof page === 'number' && page >= 1 && page !== this.state.current;
    }
  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(evt) {
      if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
        evt.preventDefault();
      }
    }
  }, {
    key: '_handleKeyUp',
    value: function _handleKeyUp(evt) {
      var _val = evt.target.value;
      var val = undefined;

      if (_val === '') {
        val = _val;
      } else if (isNaN(Number(_val))) {
        val = this.state._current;
      } else {
        val = Number(_val);
      }

      this.setState({
        _current: val
      });

      if (evt.keyCode === KEYCODE.ENTER) {
        this._handleChange(val);
      } else if (evt.keyCode === KEYCODE.ARROW_UP) {
        this._handleChange(val - 1);
      } else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
        this._handleChange(val + 1);
      }
    }
  }, {
    key: '_changePageSize',
    value: function _changePageSize(size) {
      if (typeof size === 'number') {
        var current = this.state.current;

        this.setState({
          pageSize: size
        });

        if (this.state.current > this._calcPage(size)) {
          current = this._calcPage(size);
          this.setState({
            current: current,
            _current: current
          });
        }

        this.props.onShowSizeChange(current, size);
      }
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(p) {
      var page = p;
      if (this._isValid(page)) {
        if (page > this._calcPage()) {
          page = this._calcPage();
        }

        if (!('current' in this.props)) {
          this.setState({
            current: page,
            _current: page
          });
        }

        this.props.onChange(page);

        return page;
      }

      return this.state.current;
    }
  }, {
    key: '_prev',
    value: function _prev() {
      if (this._hasPrev()) {
        this._handleChange(this.state.current - 1);
      }
    }
  }, {
    key: '_next',
    value: function _next() {
      if (this._hasNext()) {
        this._handleChange(this.state.current + 1);
      }
    }
  }, {
    key: '_jumpPrev',
    value: function _jumpPrev() {
      this._handleChange(Math.max(1, this.state.current - 5));
    }
  }, {
    key: '_jumpNext',
    value: function _jumpNext() {
      this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
    }
  }, {
    key: '_hasPrev',
    value: function _hasPrev() {
      return this.state.current > 1;
    }
  }, {
    key: '_hasNext',
    value: function _hasNext() {
      return this.state.current < this._calcPage();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var locale = props.locale;

      var prefixCls = props.prefixCls;
      var allPages = this._calcPage();
      var pagerList = [];
      var jumpPrev = null;
      var jumpNext = null;
      var firstPager = null;
      var lastPager = null;

      if (props.simple) {
        return React.createElement(
          'ul',
          { className: prefixCls + ' ' + prefixCls + '-simple ' + props.className },
          React.createElement(
            'li',
            { title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
            React.createElement('a', null)
          ),
          React.createElement(
            'div',
            { title: this.state.current + '/' + allPages, className: prefixCls + '-simple-pager' },
            React.createElement('input', { type: 'text', value: this.state._current, onKeyDown: this._handleKeyDown, onKeyUp: this._handleKeyUp, onChange: this._handleKeyUp }),
            React.createElement(
              'span',
              { className: prefixCls + '-slash' },
              '／'
            ),
            allPages
          ),
          React.createElement(
            'li',
            { title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
            React.createElement('a', null)
          )
        );
      }

      if (allPages <= 9) {
        for (var i = 1; i <= allPages; i++) {
          var active = this.state.current === i;
          pagerList.push(React.createElement(Pager, { locale: locale, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
        }
      } else {
        jumpPrev = React.createElement(
          'li',
          { title: locale.prev_5, key: 'prev', onClick: this._jumpPrev, className: prefixCls + '-jump-prev' },
          React.createElement('a', null)
        );
        jumpNext = React.createElement(
          'li',
          { title: locale.next_5, key: 'next', onClick: this._jumpNext, className: prefixCls + '-jump-next' },
          React.createElement('a', null)
        );
        lastPager = React.createElement(Pager, {
          locale: props.locale,
          last: true, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, allPages), key: allPages, page: allPages, active: false });
        firstPager = React.createElement(Pager, {
          locale: props.locale,
          rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, 1), key: 1, page: 1, active: false });

        var current = this.state.current;

        var left = Math.max(1, current - 2);
        var right = Math.min(current + 2, allPages);

        if (current - 1 <= 2) {
          right = 1 + 4;
        }

        if (allPages - current <= 2) {
          left = allPages - 4;
        }

        for (var i = left; i <= right; i++) {
          var active = current === i;
          pagerList.push(React.createElement(Pager, {
            locale: props.locale,
            rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
        }

        if (current - 1 >= 4) {
          pagerList.unshift(jumpPrev);
        }
        if (allPages - current >= 4) {
          pagerList.push(jumpNext);
        }

        if (left !== 1) {
          pagerList.unshift(firstPager);
        }
        if (right !== allPages) {
          pagerList.push(lastPager);
        }
      }

      return React.createElement(
        'ul',
        { className: prefixCls + ' ' + props.className,
          unselectable: 'unselectable' },
        React.createElement(
          'li',
          { title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
          React.createElement('a', null)
        ),
        pagerList,
        React.createElement(
          'li',
          { title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
          React.createElement('a', null)
        ),
        React.createElement(Options, {
          locale: props.locale,
          rootPrefixCls: prefixCls,
          selectComponentClass: props.selectComponentClass,
          selectPrefixCls: props.selectPrefixCls,
          changeSize: this.props.showSizeChanger ? this._changePageSize.bind(this) : null,
          current: this.state.current,
          pageSizeOptions: this.props.pageSizeOptions,
          quickGo: this.props.showQuickJumper ? this._handleChange.bind(this) : null })
      );
    }
  }]);

  return Pagination;
})(React.Component);

Pagination.propTypes = {
  current: React.PropTypes.number,
  defaultCurrent: React.PropTypes.number,
  total: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  onChange: React.PropTypes.func,
  showSizeChanger: React.PropTypes.bool,
  onShowSizeChange: React.PropTypes.func,
  selectComponentClass: React.PropTypes.func,
  showQuickJumper: React.PropTypes.bool,
  pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),

  locale: React.PropTypes.object
};

Pagination.defaultProps = {
  defaultCurrent: 1,
  total: 0,
  pageSize: 10,
  onChange: noop,
  className: '',
  selectPrefixCls: 'rc-select',
  prefixCls: 'rc-pagination',
  selectComponentClass: null,
  showQuickJumper: false,
  showSizeChanger: false,
  onShowSizeChange: noop,
  locale: LOCALE
};

module.exports = Pagination;
},{"./KeyCode":18,"./Options":19,"./Pager":20,"./locale/zh_CN":23,"react":"react"}],22:[function(require,module,exports){
// export this package's api
'use strict';

module.exports = require('./Pagination');
},{"./Pagination":21}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  // Options.jsx
  items_per_page: '条/页',
  jump_to: '跳至',
  page: '页',

  // Pager.jsx
  first_page: '第一页',
  last_page: '最后一页',

  // Pagination.jsx
  prev_page: '上一页',
  next_page: '下一页',
  prev_5: '向前 5 页',
  next_5: '向后 5 页'
};
module.exports = exports['default'];
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
