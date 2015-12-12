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
},{"./index":13,"react-dom":"react-dom"}],2:[function(require,module,exports){
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

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var Vertical = (function (_Component) {
  _inherits(Vertical, _Component);

  function Vertical() {
    _classCallCheck(this, Vertical);

    _get(Object.getPrototypeOf(Vertical.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Vertical, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.className || "agenda-vertical", style: this.props.style },
        this.props.children
      );
    }
  }]);

  return Vertical;
})(_react.Component);

exports.Vertical = Vertical;

var Row = (function (_Component2) {
  _inherits(Row, _Component2);

  function Row() {
    _classCallCheck(this, Row);

    _get(Object.getPrototypeOf(Row.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Row, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.className || "agenda-row" },
        this.props.children
      );
    }
  }]);

  return Row;
})(_react.Component);

exports.Row = Row;

var Cell = (function (_Component3) {
  _inherits(Cell, _Component3);

  function Cell() {
    _classCallCheck(this, Cell);

    _get(Object.getPrototypeOf(Cell.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Cell, [{
    key: '_handleClick',
    value: function _handleClick(e) {
      e.preventDefault();
      if (this.props.toggleSelection) this.props.toggleSelection();
    }
  }, {
    key: '_handleOver',
    value: function _handleOver(e) {
      e.preventDefault();
      if (this.props.moveSelection) this.props.moveSelection();
    }
  }, {
    key: 'style',
    value: function style() {
      var s = {};
      if (this.props.color) s.background = this.props.color;
      return s;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.className, style: { height: this.props.height },
          onClick: this._handleClick.bind(this),
          onMouseOver: this._handleOver.bind(this) },
        _react2['default'].createElement(
          'div',
          { className: 'col-content', style: this.style() },
          this.props.value
        )
      );
    }
  }]);

  return Cell;
})(_react.Component);

exports.Cell = Cell;

var Navigation = (function (_Component4) {
  _inherits(Navigation, _Component4);

  function Navigation() {
    _classCallCheck(this, Navigation);

    _get(Object.getPrototypeOf(Navigation.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      var store = this.props.store;

      var _props$agenda$getLink = this.props.agenda.getLink(this.props.view);

      var prevLink = _props$agenda$getLink.prevLink;
      var nextLink = _props$agenda$getLink.nextLink;
      var todayLink = _props$agenda$getLink.todayLink;
      var dayLink = _props$agenda$getLink.dayLink;
      var monthLink = _props$agenda$getLink.monthLink;
      var weekLink = _props$agenda$getLink.weekLink;
      var className = this.props.editor ? "btn btn-success" : "btn";

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          Row,
          null,
          _react2['default'].createElement(
            'div',
            { className: 'agenda-navigation-editor' },
            _react2['default'].createElement(
              'button',
              { className: className + " btn-editor",
                onClick: this.props.toggleEditor.bind(this) },
              'Editor'
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'agenda-navigation-view' },
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: monthLink },
              'Month'
            ),
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: weekLink },
              'Week'
            ),
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: dayLink },
              'Day'
            )
          )
        ),
        _react2['default'].createElement(
          Row,
          { className: 'agenda-navigation' },
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: prevLink },
            'Previous'
          ),
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: todayLink },
            'Today'
          ),
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: nextLink },
            'Next'
          )
        )
      );
    }
  }]);

  return Navigation;
})(_react.Component);

exports.Navigation = Navigation;

var Header = (function (_Component5) {
  _inherits(Header, _Component5);

  function Header() {
    _classCallCheck(this, Header);

    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var days = this.props.agenda.getDays(),
          view = this.props.view;
      return _react2['default'].createElement(
        Row,
        { className: 'agenda-row agenda-header' },
        view === 'day' && _react2['default'].createElement(Cell, { value: this.props.day, className: 'col-label' }),
        view !== 'day' && days.map(function (day, i) {
          return _react2['default'].createElement(Cell, { value: day, className: 'col-label', key: day + '-' + i });
        }),
        view === 'week' && this.props.store.map(function (date, i) {
          var props = {
            value: date[0].date.getDate() + '/' + (date[0].date.getMonth() + 1),
            className: "col-label",
            key: date + '-' + i
          };
          return _react2['default'].createElement(Cell, props);
        })
      );
    }
  }]);

  return Header;
})(_react.Component);

exports.Header = Header;

var Info = (function (_Component6) {
  _inherits(Info, _Component6);

  function Info() {
    _classCallCheck(this, Info);

    _get(Object.getPrototypeOf(Info.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Info, [{
    key: '_handlePrevious',
    value: function _handlePrevious(e) {
      e.preventDefault();
      this.props.onPrevious(this.props.info);
    }
  }, {
    key: '_handleNext',
    value: function _handleNext(e) {
      e.preventDefault();
      this.props.onNext(this.props.info);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return props.info.y !== this.props.info.y || props.info.m !== this.props.info.m || props.info.d !== this.props.info.d;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        Row,
        { className: 'agenda-row agenda-info' },
        this.props.onPrevious && _react2['default'].createElement(
          'a',
          { onClick: this._handlePrevious.bind(this), className: 'btn' },
          "<"
        ),
        this.props.view !== 'month' && _react2['default'].createElement(
          'span',
          null,
          this.props.info.d
        ),
        _react2['default'].createElement(
          'span',
          null,
          this.props.info.m
        ),
        _react2['default'].createElement(
          'span',
          null,
          this.props.info.y
        ),
        this.props.onNext && _react2['default'].createElement(
          'a',
          { onClick: this._handleNext.bind(this), className: 'btn' },
          ">"
        )
      );
    }
  }]);

  return Info;
})(_react.Component);

exports.Info = Info;

},{"../lib/agenda":15,"react":"react","react-router":"react-router"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _calendarUtils = require('./calendar-utils');

var ViewDefault = (function (_Component) {
  _inherits(ViewDefault, _Component);

  function ViewDefault(props) {
    _classCallCheck(this, ViewDefault);

    _get(Object.getPrototypeOf(ViewDefault.prototype), 'constructor', this).call(this, props);
    this.state = { width: this.props.width, height: this.props.height, cellClassName: "agenda-vertical" };
  }

  _createClass(ViewDefault, [{
    key: 'setDimension',
    value: function setDimension(width, height) {
      var cellClassName = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

      this.setState({ width: width, height: height, cellClassName: cellClassName });
    }
  }, {
    key: 'prepareRender',
    value: function prepareRender() {
      var withHour = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
      var withMinute = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var events = undefined,
          agenda = this.props.agenda,
          week = this.props.week;
      if (this.props.agenda && this.props.events) {
        events = agenda.tetris(agenda.getEvents(week, this.props.events, withHour, withMinute));
      }
      var selection = {
        s: this.props.selectionStart.date,
        e: this.props.selectionEnd.date
      };
      return { events: events, week: week, selection: selection };
    }
  }, {
    key: 'toggleSelection',
    value: function toggleSelection(val) {
      this.props.toggleSelection(val);
    }
  }, {
    key: 'moveSelection',
    value: function moveSelection(val) {
      this.props.moveSelection(val);
    }
  }, {
    key: 'onSelect',
    value: function onSelect(val) {
      this.props.onSelect(val);
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(val) {
      this.props.toggleSelection({ date: new Date(val.start) }, val);
      var that = this;
      var eventListener = function eventListener() {
        that.props.toggleSelection();
        document.body.removeEventListener('mouseup', eventListener);
      };
      document.body.addEventListener('mouseup', eventListener);
    }
  }, {
    key: 'getMoveUp',
    value: function getMoveUp() {
      return this.props.agenda.getMoveUp(4 * this.props.height / (24 * 2));
    }
  }]);

  return ViewDefault;
})(_react.Component);

var Week = (function (_ViewDefault) {
  _inherits(Week, _ViewDefault);

  function Week() {
    _classCallCheck(this, Week);

    _get(Object.getPrototypeOf(Week.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Week, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setDimension(this.props.width / 7, this.props.height / (24 * 2), "agenda-vertical");
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setDimension(this.props.width / 7, this.props.height / (24 * 2), "agenda-vertical");
    }
  }, {
    key: 'style',
    value: function style(evt) {
      var opacity = arguments.length <= 1 || arguments[1] === undefined ? 0.9 : arguments[1];
      var room = evt.room;
      var cell = evt.cell;
      var width = this.props.height / (24 * 2);
      return {
        opacity: opacity,
        left: (evt.cell.line + 1.5) * 18 + 'px',
        top: cell.start * width + 'px',
        width: (cell.end - cell.start + 1) * width + 'px',
        transform: 'rotate(90deg)',
        transformOrigin: 'left top 0',
        background: room.color || 'grey'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var agenda = this.props.agenda;

      var _prepareRender = this.prepareRender(true, true);

      var events = _prepareRender.events;
      var week = _prepareRender.week;
      var selection = _prepareRender.selection;

      return _react2['default'].createElement(
        _calendarUtils.Vertical,
        { className: this.state.cellClassName, style: { marginTop: this.getMoveUp() + "px" } },
        week.map(function (item) {
          var cond = item.date >= selection.s && item.date <= selection.e || !_this.props.editor && _this.props.current && agenda.compare(new Date(item.date), new Date(_this.props.current.year, _this.props.current.month, Math.abs(_this.props.current.day), _this.props.current.hour), true);
          var props = {
            value: item.minute ? "  " + item.minute : item.hour + "h ",
            className: cond ? "col-day col-day-active" : "col-day",
            toggleSelection: _this.toggleSelection.bind(_this, item),
            moveSelection: _this.moveSelection.bind(_this, item),
            disabled: item.disabled,
            key: 'hour-' + item.hour + '-{item.minute}-' + item.row + '-' + item.col
          };
          if (cond) {
            props.color = _this.props.selectionColor;
          }
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
          }
          return _react2['default'].createElement(_calendarUtils.Cell, _extends({}, props, _this.state));
        }),
        _react2['default'].createElement(Events, { events: events, style: this.style.bind(this),
          onMouseDown: this.onMouseDown.bind(this),
          onClick: this.onSelect.bind(this) })
      );
    }
  }]);

  return Week;
})(ViewDefault);

exports.Week = Week;

var Day = (function (_Week) {
  _inherits(Day, _Week);

  function Day() {
    _classCallCheck(this, Day);

    _get(Object.getPrototypeOf(Day.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Day, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setDimension(this.props.width, this.props.height / (24 * 2), "agenda-vertical agenda-vertical-row");
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setDimension(this.props.width, this.props.height / (24 * 2), "agenda-vertical agenda-vertical-row");
    }
  }, {
    key: 'style',
    value: function style(evt, opacity) {
      var eventWidth = 180;
      var room = evt.room;
      var cell = evt.cell;
      var width = this.props.height / (24 * 2);
      return {
        opacity: opacity,
        top: cell.start * width + 'px',
        left: (evt.cell.line - 0.5) * eventWidth + 'px',
        height: (cell.end - cell.start + 1) * width + 'px',
        width: eventWidth + 'px',
        background: room.color || 'grey'
      };
    }
  }]);

  return Day;
})(Week);

exports.Day = Day;

var Month = (function (_ViewDefault2) {
  _inherits(Month, _ViewDefault2);

  function Month() {
    _classCallCheck(this, Month);

    _get(Object.getPrototypeOf(Month.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Month, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setDimension(this.props.width / 7, this.props.height / 7);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setDimension(this.props.width / 7, this.props.height / 7);
    }
  }, {
    key: 'style',
    value: function style(evt) {
      var opacity = arguments.length <= 1 || arguments[1] === undefined ? 0.9 : arguments[1];
      var room = evt.room;
      var cell = evt.cell;
      var width = this.state.width;
      return {
        opacity: opacity,
        top: (evt.cell.line + 0.5) * 12 + 'px',
        left: cell.start * width + 'px',
        width: (cell.end - cell.start + 1) * width + 'px',
        background: room.color || 'grey'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var agenda = this.props.agenda;

      var _prepareRender2 = this.prepareRender();

      var events = _prepareRender2.events;
      var week = _prepareRender2.week;
      var selection = _prepareRender2.selection;
      var that = this;
      return _react2['default'].createElement(
        _calendarUtils.Row,
        null,
        week.map(function (item) {
          var cond = item.date >= selection.s && item.date <= selection.e || !_this2.props.editor && _this2.props.current && agenda.compare(new Date(item.date), new Date(_this2.props.current.year, _this2.props.current.month, Math.abs(_this2.props.current.day))),
              props = {
            value: item.day,
            className: cond ? "col col-active" : "col",
            toggleSelection: that.toggleSelection.bind(_this2, item),
            moveSelection: that.moveSelection.bind(_this2, item),
            disabled: item.disabled,
            key: 'day-' + item.day + '-' + item.col + '-' + item.row
          };
          if (cond) {
            props.color = _this2.props.selectionColor;
          }
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
          }
          return _react2['default'].createElement(_calendarUtils.Cell, _extends({}, props, _this2.state));
        }),
        _react2['default'].createElement(Events, { events: events, style: this.style.bind(this),
          onMouseDown: this.onMouseDown.bind(this),
          onClick: this.onSelect.bind(this) })
      );
    }
  }]);

  return Month;
})(ViewDefault);

exports.Month = Month;

var Events = (function (_Component2) {
  _inherits(Events, _Component2);

  function Events(props) {
    _classCallCheck(this, Events);

    _get(Object.getPrototypeOf(Events.prototype), 'constructor', this).call(this, props);
    this.state = { phase: null };
    this.interval = null;
  }

  _createClass(Events, [{
    key: 'onClick',
    value: function onClick(evt, e) {
      e.preventDefault();
      clearTimeout(this.interval);
      if (this.state.phase === null) this.props.onClick(evt);else this.setState({ phase: null });
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(evt, e) {
      var _this3 = this;

      e.preventDefault();
      this.interval = setTimeout(function () {
        _this3.props.onMouseDown(evt);
        _this3.setState({ phase: 'down' });
      }, 500);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var events = this.props.events || [];
      return _react2['default'].createElement(
        'div',
        { className: 'events' },
        events && events.map(function (evt, i) {
          return _react2['default'].createElement(
            'div',
            { className: 'event',
              style: _this4.props.style(evt),
              onMouseDown: _this4.onMouseDown.bind(_this4, evt),
              onClick: _this4.onClick.bind(_this4, evt), key: 'event-' + i },
            evt.title
          );
        })
      );
    }
  }]);

  return Events;
})(_react.Component);

},{"./calendar-utils":2,"react":"react","react-motion":"react-motion"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _calendarUtils = require('./calendar-utils');

var _calendarView = require('./calendar-view');

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    this.agenda = new _libAgenda2['default'](this.props.year, this.props.month, this.props.day);
    this.agenda.setException(this.props.except || []);
    this.state = {
      editor: false,
      view: this.props.view,
      events: this.props.events || [],
      store: this.agenda.matrix(this.props.view),
      info: this.agenda.getInfo(),
      start: -1,
      end: -1,
      startInit: -1,
      selection: {},
      color: null
    };
    if (this.props.onLoad) this.props.onLoad(this.props);
  }

  _createClass(_default, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.agenda.changeDate(props.year, props.month, props.day);
      this.setState({
        current: props.current || {},
        view: props.view,
        events: props.events || [],
        agenda: this.agenda,
        store: this.agenda.matrix(props.view),
        info: this.agenda.getInfo()
      });
      this.props.onChange(props);
    }
  }, {
    key: 'hexToRGB',
    value: function hexToRGB(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    }
  }, {
    key: 'toggleEditor',
    value: function toggleEditor() {
      this.setState({
        editor: !this.state.editor,
        start: -1,
        end: -1,
        startInit: -1,
        color: null
      });
    }
  }, {
    key: 'toggleSelection',
    value: function toggleSelection(val) {
      var isEvent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (this.state.editor) {
        if (this.state.start !== -1) {
          var selection = _lodash2['default'].extend(this.state.selection, { start: this.state.start, end: this.state.end });
          this.setState({
            selection: {},
            start: -1,
            end: -1,
            startInit: -1,
            isEvent: false
          });
          if (this.state.view === "month") {
            selection = {
              start: _lodash2['default'].clone(selection.start),
              end: _lodash2['default'].clone(selection.end),
              isEvent: _lodash2['default'].clone(selection.isEvent)
            };
            selection.end.date = new Date(selection.end.date);
            selection.end.date.setHours(23);
            selection.end.date.setMinutes(45);
            selection.end.hour = 23;
            selection.end.minute = 45;
          }
          this.props.onSelect(selection.isEvent ? _lodash2['default'].extend({}, selection.isEvent, selection) : selection, this.state.editor);
        } else {
          var color = null;
          if (isEvent) {
            var colorRGB = this.hexToRGB(isEvent.room.color);
            color = 'rgba(' + colorRGB.r + ', ' + colorRGB.g + ', ' + colorRGB.b + ', 0.5)';
          }
          this.setState({
            startInit: val,
            start: val,
            end: val,
            selection: { isEvent: isEvent },
            color: color
          });
          console.log({
            startInit: val,
            start: val,
            end: val,
            selection: { isEvent: isEvent },
            color: color
          });
        }
      } else {
        val.view = this.state.view;
        this.props.onSelect(val, this.state.editor);
      }
    }
  }, {
    key: 'moveSelection',
    value: function moveSelection(val) {
      var updateState = true;
      if (this.state.start !== -1) {
        var selection = this.getSmartSelection(val);
        console.log(selection);
        if (this.props.limitDay && selection.start.date.getDate() !== selection.end.date.getDate()) updateState = false;
        if (updateState) this.setState(selection);
      }
    }
  }, {
    key: 'onSelectEvent',
    value: function onSelectEvent(val) {
      if (val.member.id === this.props.me.id || this.props.me.role === 'admin') {
        val.date = new Date(val.start);
        this.props.onSelect(val, this.state.editor);
      }
    }
  }, {
    key: 'onFilterChange',
    value: function onFilterChange(val) {
      this.props.onFilterChange(val);
    }
  }, {
    key: 'getSmartSelection',
    value: function getSmartSelection(b) {
      var a = this.state.startInit;
      return {
        start: a.date < b.date ? a : b,
        end: a.date < b.date ? b : a
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var view = this.state.view,
          events = this.state.events,
          agenda = this.state.agenda,
          store = this.state.store,
          props = {
        events: events,
        toggleSelection: this.toggleSelection.bind(this),
        moveSelection: this.moveSelection.bind(this),
        onSelect: this.onSelectEvent.bind(this),
        selectionStart: this.state.start,
        selectionEnd: this.state.end,
        selectionColor: this.state.color,
        editor: this.state.editor,
        current: this.props.current
      };

      return _react2['default'].createElement(
        _reactMotion.Motion,
        { style: { width: (0, _reactMotion.spring)(this.props.width || 2000) } },
        function (value) {
          return _react2['default'].createElement(
            'div',
            { className: "agenda" + (_this.state.editor && !_this.state.selection.isEvent ? " edition" : ""), style: { width: value.width } },
            _react2['default'].createElement(_filter2['default'], _extends({}, _this.props.filters, {
              rooms: _this.props.rooms,
              onChange: _this.onFilterChange.bind(_this) })),
            _react2['default'].createElement(_calendarUtils.Navigation, { store: store,
              agenda: _this.agenda,
              view: view,
              editor: _this.state.editor,
              toggleEditor: _this.toggleEditor.bind(_this) }),
            _react2['default'].createElement(_calendarUtils.Info, { info: _this.state.info, view: view }),
            view !== 'day' && _react2['default'].createElement(_calendarUtils.Header, { view: view, store: store, agenda: _this.agenda }),
            view === 'week' && _react2['default'].createElement(
              _calendarUtils.Row,
              null,
              store.map(function (week, j) {
                return _react2['default'].createElement(_calendarView.Week, _extends({}, props, {
                  week: week,
                  height: _this.props.height,
                  width: _this.props.width,
                  agenda: _this.agenda, key: 'row-' + j }));
              })
            ),
            view === 'day' && _react2['default'].createElement(
              _calendarUtils.Row,
              null,
              _react2['default'].createElement(_calendarView.Day, _extends({}, props, {
                week: store,
                height: _this.props.height,
                width: _this.props.width,
                agenda: _this.agenda }))
            ),
            view === 'month' && store.map(function (week, j) {
              return _react2['default'].createElement(_calendarView.Month, _extends({}, props, {
                week: week,
                height: _this.props.height,
                width: _this.props.width,
                agenda: _this.agenda, key: 'row-' + j }));
            })
          );
        }
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"../lib/agenda":15,"./calendar-utils":2,"./calendar-view":3,"./filter":7,"lodash":"lodash","react":"react","react-dom":"react-dom","react-motion":"react-motion"}],5:[function(require,module,exports){
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

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _calendarUtils = require('./calendar-utils');

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.agenda = new _libAgenda2['default'](this.props.year, this.props.month, this.props.day, this.props.hour);
      this.agenda.setException(this.props.except || []);
      var view = this.props.day ? "week" : "month";
      view = this.props.view || view;
      this.update(view, true);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.agenda.changeDate(props.year, props.month, props.day, props.hour);
      var view = props.day ? "week" : "month";
      view = props.view || view;
      this.update(view, true);
    }
  }, {
    key: 'onPrevious',
    value: function onPrevious(date) {
      this.agenda.changeDate(this.state.link.previous.y, this.state.link.previous.m, this.state.link.previous.d);
      this.update(this.state.view);
    }
  }, {
    key: 'onNext',
    value: function onNext(date) {
      this.agenda.changeDate(this.state.link.next.y, this.state.link.next.m, this.state.link.next.d);
      this.update(this.state.view);
    }
  }, {
    key: '_onSelect',
    value: function _onSelect(val) {
      this.props.onSelect(val);
    }
  }, {
    key: '_toggleView',
    value: function _toggleView() {
      this.update(this.state.view === 'month' ? 'week' : 'month');
    }
  }, {
    key: 'update',
    value: function update(view, withCurrent) {
      var info = this.agenda.getInfo(view),
          link = this.agenda.getLinkHelper(view),
          store = this.agenda.matrix(view),
          current = new Date(link.current.y, link.current.month, link.current.d, link.current.h);

      var value = { store: store, info: info, link: link, view: view };

      if (withCurrent) value.current = current;
      this.setState(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var height = 30;
      return _react2['default'].createElement(
        'div',
        { className: 'date-picker' },
        this.state && _react2['default'].createElement(_calendarUtils.Info, { info: this.state.info,
          onPrevious: this.onPrevious.bind(this),
          onNext: this.onNext.bind(this) }),
        this.state && _react2['default'].createElement(_calendarUtils.Header, { view: this.state.view, store: this.state.store, agenda: this.agenda }),
        this.props.toggle && _react2['default'].createElement(
          _calendarUtils.Row,
          null,
          _react2['default'].createElement(
            'a',
            { onClick: this._toggleView.bind(this), className: 'btn' },
            'toggle view'
          )
        ),
        this.state && _react2['default'].createElement(Cases, { view: this.state.view,
          store: this.state.store,
          agenda: this.agenda,
          current: this.state.current,
          height: height,
          toggleSelection: this._onSelect.bind(this) })
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;

var Cases = (function (_Component2) {
  _inherits(Cases, _Component2);

  function Cases() {
    _classCallCheck(this, Cases);

    _get(Object.getPrototypeOf(Cases.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Cases, [{
    key: 'prepareProps',
    value: function prepareProps(item) {
      var cond = this.props.agenda.compare(this.props.current, item.date);
      var props = {
        height: this.props.height,
        value: item.day,
        className: cond ? 'col-day col-day-active' : 'col-day',
        disabled: item.disabled,
        toggleSelection: this.props.toggleSelection.bind(this, item)
      };
      if (item.disabled) {
        delete props.toggleSelection;
        props.className = "col-day col-day-disabled";
      }
      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        _calendarUtils.Row,
        null,
        this.props.store.map(function (line, j) {
          if (_this.props.view === 'month') return line.map(function (item, i) {
            var props = _this.prepareProps(item);
            return _react2['default'].createElement(_calendarUtils.Cell, _extends({}, props, { key: 'cell-' + item.col + '-' + i + '-' + item.day }));
          });else return _react2['default'].createElement(ColCases, _extends({}, _this.props, {
            line: line,
            key: 'cell-column-' + j }));
        })
      );
    }
  }]);

  return Cases;
})(_react.Component);

var ColCases = (function (_Component3) {
  _inherits(ColCases, _Component3);

  function ColCases() {
    _classCallCheck(this, ColCases);

    _get(Object.getPrototypeOf(ColCases.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ColCases, [{
    key: 'prepareProps',
    value: function prepareProps(item) {
      var cond = this.props.agenda.compare(this.props.current, item.date, true, true);
      var props = {
        height: this.props.height,
        value: item.minute ? "  " + item.minute : item.hour + "h ",
        className: cond ? 'col-day col-day-active' : 'col-day',
        disabled: item.disabled,
        toggleSelection: this.props.toggleSelection.bind(this, item)
      };
      if (item.disabled) {
        delete props.toggleSelection;
        props.className = "col-day col-day-disabled";
      }
      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2['default'].createElement(
        _calendarUtils.Vertical,
        null,
        this.props.line.map(function (item, i) {
          var props = _this2.prepareProps(item);
          return _react2['default'].createElement(_calendarUtils.Cell, _extends({}, props, { key: 'cell-col-' + i + '-' + item.day + '-' + item.hour }));
        })
      );
    }
  }]);

  return ColCases;
})(_react.Component);

module.exports = exports['default'];

},{"../lib/agenda":15,"./calendar-utils":2,"react":"react"}],6:[function(require,module,exports){
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

var _reactMotion = require('react-motion');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _datePicker = require('./date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = require('./time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    this.state = {
      year: this.props.year,
      month: this.props.month,
      day: this.props.day,
      hour: this.props.hour,
      minute: this.props.minute,
      name: this.props.name,
      except: this.props.except || [],
      type: "date",
      decal: this.props.decal || 0
    };
  }

  _createClass(_default, [{
    key: '_onSelectDate',
    value: function _onSelectDate(val) {
      this.setState(_lodash2['default'].extend({ type: "hour" }, val));
    }
  }, {
    key: '_onSelectTime',
    value: function _onSelectTime(val) {
      this.setState(_lodash2['default'].extend({ type: "date" }, val));
      var date = new Date(this.state.year, this.state.month, this.state.day, val.hour, val.minute),
          current = _lodash2['default'].extend(this.state, val, { date: date });
      this.props.onSelect(current);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        _reactMotion.Motion,
        { defaultStyle: { alpha: 0 }, style: { alpha: (0, _reactMotion.spring)(1) } },
        function (value) {
          return _react2['default'].createElement(
            'div',
            { className: 'date-time-picker', style: { opacity: value.alpha } },
            _this.state.type === "date" && _react2['default'].createElement(_datePicker2['default'], _extends({}, _this.state, { view: 'month', onSelect: _this._onSelectDate.bind(_this) })),
            _this.state.type === "hour" && _react2['default'].createElement(_timePicker2['default'], _extends({}, _this.state, { onSelect: _this._onSelectTime.bind(_this) }))
          );
        }
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"./date-picker":5,"./time-picker":10,"lodash":"lodash","react":"react","react-motion":"react-motion"}],7:[function(require,module,exports){
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

var _reactMotion = require('react-motion');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _newforms = require('newforms');

var _newformsBootstrap = require('newforms-bootstrap');

var _newformsBootstrap2 = _interopRequireDefault(_newformsBootstrap);

var _datePicker = require('./date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    this.state = { show: false };
    this.createForm();
  }

  _createClass(_default, [{
    key: 'createForm',
    value: function createForm() {
      var MyForm = _newforms.Form.extend({
        room: (0, _newforms.MultipleChoiceField)({
          widget: _newforms.CheckboxSelectMultiple,
          choices: this.props.rooms.map(function (r) {
            return [r.id, r.name];
          }),
          initial: this.props.rooms.map(function (r) {
            return r.id;
          }),
          widgetAttrs: {
            onFocus: this._onFocus.bind(this),
            onBlur: this._onSubmit.bind(this)
          }
        }),
        mine: (0, _newforms.BooleanField)({
          required: false,
          widgetAttrs: {
            onFocus: this._onFocus.bind(this),
            onBlur: this._onSubmit.bind(this)
          }
        })
      });
      this.form = new MyForm({
        controlled: true,
        onChange: this.onFormChange.bind(this),
        validation: 'auto'
      });
    }
  }, {
    key: 'onFormChange',
    value: function onFormChange() {
      this.forceUpdate();
    }
  }, {
    key: '_onFocus',
    value: function _onFocus(e) {
      e.preventDefault();
      setTimeout(function () {
        return e.target.blur();
      }, 50);
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(e) {
      if (e) e.preventDefault();
      var form = this.mForm.getForm();
      if (form.validate()) {
        var cleanedData = _lodash2['default'].clone(form.cleanedData);
        this.props.onChange(cleanedData);
      }
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.setState({ show: !this.state.show });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'form',
        { className: 'agenda-filter' },
        !this.state.show && _react2['default'].createElement(
          'a',
          { onClick: this.toggle.bind(this) },
          'Filter'
        ),
        this.state.show && _react2['default'].createElement(
          _reactMotion.Motion,
          { defaultStyle: { opacity: 0, height: 0 }, style: { opacity: (0, _reactMotion.spring)(1), height: 50 } },
          function (value) {
            return _react2['default'].createElement(
              'div',
              { style: value },
              _react2['default'].createElement(
                _newforms.RenderForm,
                { form: _this.form, ref: function (ref) {
                    return _this.mForm = ref;
                  } },
                _react2['default'].createElement(
                  _newformsBootstrap.Row,
                  null,
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'room', md: '10' }),
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'mine', md: '2' })
                )
              )
            );
          }
        )
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"./date-picker":5,"lodash":"lodash","newforms":"newforms","newforms-bootstrap":"newforms-bootstrap","react":"react","react-motion":"react-motion"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _newforms = require('newforms');

var _newformsBootstrap = require('newforms-bootstrap');

var _newformsBootstrap2 = _interopRequireDefault(_newformsBootstrap);

var _dateTimePicker = require('./date-time-picker');

var _dateTimePicker2 = _interopRequireDefault(_dateTimePicker);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    var startDate = this.props.start.date ? this.props.start.date : new Date(this.props.start),
        endDate = this.props.end.date ? this.props.end.date : new Date(this.props.end),
        startExcept = [].concat(_toConsumableArray(this.props.except)),
        endExcept = [].concat(_toConsumableArray(this.props.except));

    startExcept.push({
      start: endDate,
      end: new Date(new Date(endDate).setYear(2020))
    });
    endExcept.push({
      start: new Date(new Date(startDate).setYear(2000)),
      end: startDate
    });

    this.state = {
      startPicker: { show: false, date: startDate, except: startExcept },
      endPicker: { show: false, date: endDate, except: endExcept, decal: 14 }
    };
    this.createForm();
  }

  _createClass(_default, [{
    key: 'createForm',
    value: function createForm() {
      var MyForm = _newforms.Form.extend({
        title: (0, _newforms.CharField)({ initial: this.props.title || '' }),
        content: (0, _newforms.CharField)({
          required: false,
          widget: _newforms.Textarea,
          initial: this.props.content || ''
        }),
        room: (0, _newforms.ChoiceField)({
          choices: this.props.rooms.map(function (r) {
            return [r.id, r.name];
          }),
          initial: this.props.room ? this.props.room.id : this.props.rooms[0].id
        }),
        start: (0, _newforms.DateTimeField)({
          initial: this.props.start.date ? this.props.start.date : new Date(this.props.start),
          widgetAttrs: { onClick: this._showDatePicker.bind(this) }
        }),
        end: (0, _newforms.DateTimeField)({
          initial: this.props.end.date ? this.props.end.date : new Date(this.props.end),
          widgetAttrs: { onClick: this._showDatePicker.bind(this) }
        }),
        members: (0, _newforms.MultipleChoiceField)({
          widget: _newforms.CheckboxSelectMultiple,
          choices: this.props.users.map(function (r) {
            return [r.id, r.username];
          }),
          initial: (this.props.members || []).map(function (r) {
            return r.id;
          })
        })
      });
      this.form = new MyForm({
        controlled: true,
        onChange: this.onFormChange.bind(this),
        validation: 'auto'
      });
    }
  }, {
    key: 'onFormChange',
    value: function onFormChange() {
      this.forceUpdate();
    }
  }, {
    key: '_showDatePicker',
    value: function _showDatePicker(e) {
      e.preventDefault();
      this.changeDate(new Date(e.target.value), e.target.name);
    }
  }, {
    key: 'changeDate',
    value: function changeDate(date, name) {
      var toggle = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var common = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        name: name
      },
          startPicker = this.state.startPicker,
          endPicker = this.state.endPicker;

      if (name === "start") {
        _lodash2['default'].extend(startPicker, common);
        endPicker.except = [].concat(_toConsumableArray(this.props.except));
        endPicker.except.push({
          start: new Date(new Date(date).setYear(2000)),
          end: date
        });
      } else {
        _lodash2['default'].extend(endPicker, common, { decal: 14 });
        startPicker.except = [].concat(_toConsumableArray(this.props.except));
        startPicker.except.push({
          start: date,
          end: new Date(new Date(date).setYear(2020))
        });
      }

      if (toggle) {
        if (name === "start") startPicker.show = !this.state.startPicker.show;else if (name === "end") endPicker.show = !this.state.endPicker.show;
      }
      this.setState({ startPicker: startPicker, endPicker: endPicker });
    }
  }, {
    key: '_onSelectStart',
    value: function _onSelectStart(val) {
      var form = this.mForm.getForm(),
          start = new Date(val.date);
      form.updateData({ start: start });
      this.changeDate(start, "start");
    }
  }, {
    key: '_onSelectEnd',
    value: function _onSelectEnd(val) {
      var form = this.mForm.getForm(),
          end = new Date(val.date);
      form.updateData({ end: end });
      this.changeDate(end, "end");
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(e) {
      e.preventDefault();
      var form = this.mForm.getForm();
      if (form.validate()) this.props.onSubmit(form.cleanedData, this.props.id);
    }
  }, {
    key: '_onDelete',
    value: function _onDelete(e) {
      e.preventDefault();
      var form = this.mForm.getForm();
      this.props.onDelete(this.props.id);
    }
  }, {
    key: '_onCancel',
    value: function _onCancel(e) {
      e.preventDefault();
      this.props.onCancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        _reactMotion.Motion,
        { defaultStyle: { x: 2000 }, style: { x: (0, _reactMotion.spring)(15) } },
        function (value) {
          return _react2['default'].createElement(
            'form',
            { encType: 'multipart/form-data', className: 'agenda-modal', key: 'modal', style: { left: value.x } },
            _react2['default'].createElement(
              _newforms.RenderForm,
              { form: _this.form, ref: function (ref) {
                  return _this.mForm = ref;
                } },
              _react2['default'].createElement(
                _newformsBootstrap.Container,
                { autoColumns: 'md' },
                _react2['default'].createElement(
                  'h1',
                  null,
                  'Add event',
                  _react2['default'].createElement(
                    'span',
                    { className: 'float-right' },
                    _react2['default'].createElement(
                      'button',
                      { className: 'btn btn-default', onClick: _this._onSubmit.bind(_this) },
                      'Save'
                    ),
                    _react2['default'].createElement(
                      'button',
                      { className: 'btn btn-default', onClick: _this._onCancel.bind(_this) },
                      'Cancel'
                    ),
                    _react2['default'].createElement(
                      'button',
                      { className: 'btn btn-default', onClick: _this._onDelete.bind(_this) },
                      'Delete'
                    )
                  )
                ),
                _react2['default'].createElement('hr', null),
                _react2['default'].createElement(
                  _newformsBootstrap.Row,
                  null,
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'title', md: '8' }),
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'room' })
                ),
                _react2['default'].createElement(
                  _newformsBootstrap.Row,
                  null,
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'content' })
                ),
                _react2['default'].createElement(
                  _newformsBootstrap.Row,
                  null,
                  _react2['default'].createElement(
                    _newformsBootstrap.Col,
                    { md: '6' },
                    _this.state.startPicker.show && _react2['default'].createElement(_dateTimePicker2['default'], _extends({}, _this.state.startPicker, { onSelect: _this._onSelectStart.bind(_this) }))
                  ),
                  _react2['default'].createElement(
                    _newformsBootstrap.Col,
                    null,
                    _this.state.endPicker.show && _react2['default'].createElement(_dateTimePicker2['default'], _extends({}, _this.state.endPicker, { onSelect: _this._onSelectEnd.bind(_this) }))
                  )
                ),
                _react2['default'].createElement(
                  _newformsBootstrap.Row,
                  null,
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'start', md: '6' }),
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'end' })
                ),
                _react2['default'].createElement(
                  _newformsBootstrap.Row,
                  null,
                  _react2['default'].createElement(_newformsBootstrap.Field, { name: 'members' })
                )
              )
            )
          );
        }
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"./date-time-picker":6,"lodash":"lodash","newforms":"newforms","newforms-bootstrap":"newforms-bootstrap","react":"react","react-motion":"react-motion"}],9:[function(require,module,exports){
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

var _datePicker = require('./date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    this.agenda = new _libAgenda2['default']();
  }

  _createClass(_default, [{
    key: '_onSelect',
    value: function _onSelect(val) {
      this.props.onSelectDate(val);
    }
  }, {
    key: 'format',
    value: function format(dateStr, ifEnd) {
      var date = new Date(dateStr);
      if (ifEnd) return this.agenda.getEndDate(date).toLocaleString();else return date.toLocaleString();
    }
  }, {
    key: 'formatGetEndDate',
    value: function formatGetEndDate(dateStr) {
      var date = new Date(dateStr);
      return this.agenda.getEndDate(dateStr);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var events = this.agenda.getEventsByDate(this.props.date, this.props.events, this.props.view !== "month");
      return _react2['default'].createElement(
        'div',
        { className: 'agenda-panel', style: { right: this.props.right }, key: 'panel' },
        this.props.date && _react2['default'].createElement(_datePicker2['default'], { view: 'month',
          year: this.props.date.getFullYear(),
          month: this.props.date.getMonth(),
          day: this.props.date.getDate(),
          except: this.props.except,
          onSelect: this._onSelect.bind(this) }),
        events.map(function (evt) {
          return _react2['default'].createElement(
            'div',
            { className: 'panel-event', key: "evt" + evt.id, style: { background: evt.room.color } },
            _react2['default'].createElement(
              'div',
              { className: 'panel-event-date' },
              _this.format(evt.start),
              ' to ',
              _this.format(evt.end, true)
            ),
            evt.member && _react2['default'].createElement(
              'div',
              { className: 'panel-event-member' },
              'reserved by ',
              evt.member.username
            ),
            _react2['default'].createElement(
              'div',
              { className: 'panel-event-title' },
              evt.title
            ),
            _react2['default'].createElement(
              'p',
              { className: 'panel-event-content' },
              evt.content
            ),
            evt.members && _react2['default'].createElement(
              'ul',
              null,
              evt.members.map(function (member) {
                return _react2['default'].createElement(
                  'li',
                  { key: 'member-' + member.id },
                  member.username
                );
              })
            )
          );
        })
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"../lib/agenda":15,"./date-picker":5,"react":"react"}],10:[function(require,module,exports){
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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    var diameter = Number(this.props.diameter) || 200,
        hour = Number(this.props.hour),
        minute = Number(this.props.minute);
    this.state = {
      diameter: diameter,
      radius: diameter * 0.7 / 2,
      type: this.props.type || "hour",
      ampm: hour > 11 ? 'PM' : 'AM',
      hour: hour,
      minute: minute,
      current: { hour: hour, minute: minute }
    };
  }

  _createClass(_default, [{
    key: 'toggle',
    value: function toggle() {
      if (this.state.type === 'hour') this.setState({ ampm: this.state.ampm === 'AM' ? 'PM' : 'AM' });
    }
  }, {
    key: 'onSelect',
    value: function onSelect(val) {
      if (this.state.type === 'hour') {
        var hour = Number(val);
        this.setState({
          type: "minute",
          hour: hour,
          current: { hour: hour, minute: this.state.current.minute }
        });
      } else {
        var minute = Number(val),
            current = _lodash2['default'].extend(this.state.current, { minute: minute });
        this.setState({
          type: "hour",
          minute: minute,
          current: current
        });
        this.props.onSelect(current);
      }
    }
  }, {
    key: 'getDashItems',
    value: function getDashItems() {
      var except = this.props.except,
          items = [],
          disabled = undefined,
          range = this.state.type === 'minute' || this.state.ampm === 'AM' ? { start: 0, end: 12 } : { start: 12, end: 24 },
          dateHour = new Date(this.props.year, this.props.month, this.props.day, 0);

      for (var num = range.start; num < range.end; num++) {
        disabled = false;
        dateHour.setHours(num);
        if (this.state.type === 'hour') {
          for (var i = 0, len = except.length; i < len; i++) {
            if (typeof except[i] === 'object') if (typeof except[i].start === 'number' && except[i].start <= num && except[i].end >= num) disabled = true;else if (typeof except[i].start === 'object' && except[i].start <= dateHour && except[i].end >= dateHour) disabled = true;else if (except[i].toString() === dateHour.toString()) disabled = true;
          }
        } else if (this.state.type === 'minute' && num % 3 !== 0) {
          disabled = true;
        }
        items.push({ num: num, disabled: disabled });
      }
      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var radius = this.state.diameter / 2 + "px",
          style = {
        width: radius,
        height: radius,
        marginTop: radius,
        marginLeft: radius
      };

      return _react2['default'].createElement(
        'div',
        { className: 'time-picker', style: style },
        _react2['default'].createElement('div', { className: 'time-circle' }),
        _react2['default'].createElement(Pointer, { className: 'time-minute',
          minute: this.state.minute, type: 'minute' }),
        _react2['default'].createElement(Pointer, { className: 'time-hour',
          hour: this.state.hour, type: 'hour' }),
        _react2['default'].createElement(Choice, { className: 'time-circle time-circle-button',
          ampm: this.state.ampm,
          onToggle: this.toggle.bind(this) }),
        this.getDashItems().map(function (item) {
          return _react2['default'].createElement(Dash, { className: 'time-dash',
            disabled: item.disabled,
            onSelect: _this.onSelect.bind(_this),
            radius: _this.state.radius,
            value: item.num,
            ampm: _this.state.ampm,
            decal: _this.props.decal,
            type: _this.state.type, key: "dash-" + item.num });
        })
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;

var Choice = (function (_Component2) {
  _inherits(Choice, _Component2);

  function Choice(props) {
    _classCallCheck(this, Choice);

    _get(Object.getPrototypeOf(Choice.prototype), 'constructor', this).call(this, props);
    this.state = { ampm: this.props.ampm };
  }

  _createClass(Choice, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ ampm: props.ampm });
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.props.onToggle) this.props.onToggle();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.className, onClick: this.toggle.bind(this) },
        this.state.ampm
      );
    }
  }]);

  return Choice;
})(_react.Component);

var Dash = (function (_Component3) {
  _inherits(Dash, _Component3);

  function Dash(props) {
    _classCallCheck(this, Dash);

    _get(Object.getPrototypeOf(Dash.prototype), 'constructor', this).call(this, props);
    var value = this.props.value,
        angle = 360 / 12 * value;
    if (this.props.type === 'minute') {
      if (this.props.decal > 0) angle += 90;
    }
    value = this.props.type === 'hour' ? value : value * 5;
    this.state = {
      style: { transform: 'translate(-50%, -50%) rotate(' + angle + 'deg) translateY(-' + this.props.radius + 'px)' },
      numStyle: { transform: 'translate(-50%, -50%) rotate(-' + angle + 'deg)' },
      value: value
    };
  }

  _createClass(Dash, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var angle = 360 / 12 * props.value,
          value = props.value;
      if (props.type === 'minute') {
        value = value * 5;
        if (props.decal > 0) angle += 90;
      }
      this.setState({
        style: { transform: 'translate(-50%, -50%) rotate(' + angle + 'deg) translateY(-' + props.radius + 'px)' },
        numStyle: { transform: 'translate(-50%, -50%) rotate(-' + angle + 'deg)' },
        value: value
      });
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(e) {
      e.preventDefault();
      if (this.props.onSelect && !this.props.disabled) this.props.onSelect(this.state.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className || "time-dash";
      if (this.props.disabled) className += " time-dash-disabled";
      var valueStr = this.props.type === 'hour' ? this.state.value : this.state.value + this.props.decal;
      return _react2['default'].createElement(
        'div',
        { className: className, style: this.state.style },
        _react2['default'].createElement(
          'div',
          { onClick: this._handleClick.bind(this), style: this.state.numStyle },
          valueStr
        )
      );
    }
  }]);

  return Dash;
})(_react.Component);

var Pointer = (function (_Component4) {
  _inherits(Pointer, _Component4);

  function Pointer(props) {
    _classCallCheck(this, Pointer);

    _get(Object.getPrototypeOf(Pointer.prototype), 'constructor', this).call(this, props);
    this.state = this.prepare(this.props);
  }

  _createClass(Pointer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState(this.prepare(props));
    }
  }, {
    key: 'prepare',
    value: function prepare(props) {
      var ratio = props.type === 'hour' ? 360 / 12 : 360 / 60,
          value = Number(props.minute || props.hour),
          angle = ratio * value;
      return { style: { transform: 'translate(-50%, -50%) rotate(' + angle + 'deg)' } };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', { className: this.props.className, style: this.state.style });
    }
  }]);

  return Pointer;
})(_react.Component);

module.exports = exports['default'];

},{"lodash":"lodash","react":"react"}],11:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

var _comCalendar = require('../com/calendar');

var _comCalendar2 = _interopRequireDefault(_comCalendar);

var _comModal = require('../com/modal');

var _comModal2 = _interopRequireDefault(_comModal);

var _comPanel = require('../com/panel');

var _comPanel2 = _interopRequireDefault(_comPanel);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    var _this = this;

    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    this.except = this.props.exception.map(function (exc) {
      var value = undefined;
      if (exc.type === 'day') {
        value = exc.day;
      } else if (exc.type === 'date') {
        var date = new Date(exc.date);
        value = Date(date.getFullYear(), date.getMonth(), date.getDate());
      } else if (exc.type === 'dateHour') {
        var date = new Date(exc.date);
        value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
      } else if (exc.type === 'dates') {
        var tmp = { start: new Date(exc.startDate), end: new Date(exc.endDate) },
            start = new Date(tmp.start.getFullYear(), tmp.start.getMonth(), tmp.start.getDate()),
            end = new Date(tmp.end.getFullYear(), tmp.end.getMonth(), tmp.end.getDate());
        value = { start: start, end: end };
      } else if (exc.type === 'datesHour') {
        var tmp = { start: new Date(exc.startDate), end: new Date(exc.endDate) },
            start = new Date(tmp.start.getFullYear(), tmp.start.getMonth(), tmp.start.getDate(), tmp.start.getHours(), tmp.start.getMinutes()),
            end = new Date(tmp.end.getFullYear(), tmp.end.getMonth(), tmp.end.getDate(), tmp.end.getHours(), tmp.end.getMinutes());
        value = { start: start, end: end };
      } else if (exc.type === 'hours') {
        value = { start: exc.startHour, end: exc.endHour };
      }
      return value;
    });

    this.state = {
      show: false,
      me: this.props.me || {},
      rooms: this.props.rooms || [],
      users: this.props.users || [],
      height: 700,
      defaultRight: typeof document !== "undefined" ? -document.body.offsetWidth * 0.2 : -500,
      right: typeof document !== "undefined" ? -document.body.offsetWidth * 0.2 : -500,
      filters: { where: {}, limit: 500 }
    };
    this.timeout = null;
    this.loadEvents();
    if (global.io) io.socket.on('event', function (msg) {
      return _this.loadEvents();
    });
  }

  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ width: (0, _reactDom.findDOMNode)(this).offsetWidth });
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (this.state.filters !== state.filters) this.loadEvents();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.loadEvents(props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return this.state && this.state !== state;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (global.io) io.socket.off();
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: 'handleResize',
    value: function handleResize(e) {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          width: e.target.innerWidth,
          right: -e.target.innerWidth * 0.2
        });
      }, 50);
      setTimeout(function () {
        _this2.setState({
          width: e.target.innerWidth,
          right: -e.target.innerWidth * 0.2
        });
      }, 100); //need twice for window resize and show inspector (why??)
    }
  }, {
    key: 'loadEvents',
    value: function loadEvents() {
      var _this3 = this;

      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      var months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"],
          currentMonth = months.indexOf(props.params.month),
          dateStart = new Date(props.params.year, currentMonth - 1),
          dateEnd = new Date(props.params.year, currentMonth + 1),
          filters = {
        limit: 500,
        where: {
          room: this.state.filters.room,
          or: [{ start: { '>=': dateStart, '<=': dateEnd } }, { end: { '>=': dateStart, '<=': dateEnd } }, { start: { '<=': dateStart }, end: { '>=': dateEnd } }]
        }
      };
      if (this.state.filters.mine) {
        filters.where.member = this.state.me.id;
      }

      if (global.io) io.socket.get('/event', filters, function (res) {
        _this3.setState({ events: typeof res === 'string' ? [] : res });
      });
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      this.setState({ show: false, selection: null });
    }
  }, {
    key: 'onFilterChange',
    value: function onFilterChange(filters) {
      this.setState({ filters: filters });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(data, id) {
      var _this4 = this;

      if (global.io) {
        if (id) io.socket.put("/event/" + id, data, function (res) {
          return _this4.loadEvents();
        });else io.socket.post("/event", data, function (res) {
          if (res.error) console.log("Error", res);else _this4.loadEvents();
        });
      }
      this.hideModal();
    }
  }, {
    key: 'onDelete',
    value: function onDelete(id) {
      var _this5 = this;

      io.socket['delete']("/event/" + id, function (res) {
        return _this5.loadEvents();
      });
      this.hideModal();
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.hideModal();
    }
  }, {
    key: 'onSelectDatePanel',
    value: function onSelectDatePanel(val) {
      var url = '/day/' + val.year + '/' + val.monthName + '/' + Math.abs(val.day);
      this.props.history.pushState(null, url, { force: true });
      this.setState({ current: val });
    }
  }, {
    key: 'onSelect',
    value: function onSelect(data) {
      var _this6 = this;

      var edition = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (edition) this.setState({
        show: true,
        selection: data,
        width: document.body.offsetWidth,
        right: -document.body.offsetWidth * 0.2
      });else {
        this.setState({
          current: data,
          width: document.body.offsetWidth * 0.8,
          defaultRight: -document.body.offsetWidth * 0.2,
          right: 0
        });
        setTimeout(function () {
          _this6.setState({
            width: document.body.offsetWidth * 0.8
          });
        }); // twice : why?
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(data) {}
  }, {
    key: 'onLoad',
    value: function onLoad(data) {}
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'app' },
        this.state.current && _react2['default'].createElement(_comPanel2['default'], _extends({}, this.state.current, {
          onSelectDate: this.onSelectDatePanel.bind(this),
          right: this.state.right || 0,
          defaultRight: this.state.defaultRight,
          except: this.except,
          events: this.state.events || this.props.events || [] })),
        this.state.show && _react2['default'].createElement(_comModal2['default'], _extends({}, this.state.selection, {
          rooms: this.state.rooms,
          users: this.state.users,
          onSubmit: this.onSubmit.bind(this),
          onCancel: this.onCancel.bind(this),
          onDelete: this.onDelete.bind(this),
          except: this.except
        }, this.props.params)),
        _react2['default'].createElement(_comCalendar2['default'], _extends({ events: this.props.events || [],
          me: this.state.me,
          limitDay: true,
          except: this.except,
          onSelect: this.onSelect.bind(this),
          onChange: this.onChange.bind(this),
          onLoad: this.onLoad.bind(this),
          onFilterChange: this.onFilterChange.bind(this)
        }, this.state, this.props.params))
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../com/calendar":4,"../com/modal":8,"../com/panel":9,"lodash":"lodash","react":"react","react-dom":"react-dom"}],12:[function(require,module,exports){
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

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var agenda = new _libAgenda2['default'](),
          now = agenda.getToday(),
          link = '/month/' + now.y + '/' + now.m + '/';
      return _react2['default'].createElement(
        'div',
        { className: 'app' },
        _react2['default'].createElement(
          'h1',
          null,
          'HomePage'
        ),
        _react2['default'].createElement(
          _reactRouter.Link,
          { to: link },
          'Go to calendar'
        )
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"../lib/agenda":15,"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
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

var _ctrlCalendar = require('./ctrl/calendar');

var _ctrlCalendar2 = _interopRequireDefault(_ctrlCalendar);

function GetRouter(basename, layout) {
  if (basename === undefined) basename = '/';

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
    _react2['default'].createElement(_reactRouter.Route, { path: '/:view/:year/:month', component: _ctrlCalendar2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: '/:view/:year/:month/:day', component: _ctrlCalendar2['default'] })
  );
}

module.exports = {
  GetRouter: GetRouter,
  Routes: Routes
};

},{"./ctrl/calendar":11,"./ctrl/home":12,"./layout":14,"history":"history","react":"react","react-router":"react-router"}],14:[function(require,module,exports){
(function (global){
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

var _nav = require('./nav');

var _nav2 = _interopRequireDefault(_nav);

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
},{"./nav":16,"react":"react"}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _default = (function () {
  function _default(y, m, d) {
    var h = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var mm = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

    _classCallCheck(this, _default);

    this.months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"];
    this.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.except = [];
    if (!y) {
      var now = new Date();
      y = now.getFullYear();
      m = this.months[now.getMonth()];
    }
    this.changeDate(y, m, d, h, mm);
  }

  _createClass(_default, [{
    key: "setException",
    value: function setException(except) {
      this.except = except;
    }
  }, {
    key: "changeDate",
    value: function changeDate(y, m, d, h, mm) {
      if (typeof m === 'number') m = this.months[m];
      this.date = this.linkHelper(y, m, d, h, mm);
    }
  }, {
    key: "getEvents",
    value: function getEvents(line, events) {
      var _this = this;

      var withHour = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var withMinute = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      var allevents = events.filter(function (evt) {
        var _getLimit = _this.getLimit(line, evt, withHour, withMinute);

        var start = _getLimit.start;
        var end = _getLimit.end;

        if (start && end) {
          evt.cell = { start: start.col, end: end.col };
          return evt;
        }
      });
      if (allevents.length === 0) return allevents;

      return allevents.sort(function (a, b) {
        return b.room.id - a.room.id;
      }).sort(function (a, b) {
        return b.cell.end - b.cell.start - (a.cell.end - a.cell.start);
      });
    }
  }, {
    key: "getEventsByDate",
    value: function getEventsByDate(date, events) {
      var _this2 = this;

      var withHour = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var withMinute = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      return events.filter(function (evt) {
        return _this2.compare(date, new Date(evt.start), withHour, withMinute) || _this2.compare(date, new Date(evt.end), withHour, withMinute) || date >= new Date(evt.start) && date <= new Date(evt.end);
      });
    }
  }, {
    key: "tetris",
    value: function tetris(events) {
      if (events.length === 0) return [];
      events[0].cell.line = 1;

      var _loop = function (j, len) {
        var collision = false,
            evt = events[j].cell,
            line = 1;
        while (!evt.line) {
          var evts = events.filter(function (a) {
            if (a.cell.line === line) return a;
          });
          for (var i = 0, _len = evts.length; i < _len; i++) {
            var c = evts[i].cell;
            if (evt.start >= c.start && evt.start <= c.end || evt.end >= c.start && evt.end <= c.end) collision = true;
          }
          if (collision) {
            collision = false;
            line++;
          } else {
            evt.line = line;
          }
        }
      };

      for (var j = 0, len = events.length; j < len; j++) {
        _loop(j, len);
      }
      return events;
    }
  }, {
    key: "matrix",
    value: function matrix() {
      var _this3 = this;

      var view = arguments.length <= 0 || arguments[0] === undefined ? 'month' : arguments[0];
      var _date = this.date;
      var y = _date.y;
      var month = _date.month;
      var d = _date.d;
      var h = _date.h;
      var mm = _date.mm;

      var _getRange = this.getRange(6, 7);

      var rows = _getRange.rows;
      var cols = _getRange.cols;

      var _getInitDates = this.getInitDates();

      var start = _getInitDates.start;
      var next = _getInitDates.next;
      var date = _getInitDates.date;
      var days = next.getDate();
      var months = [];
      var weeks;
      var day;
      var tmp;
      var commonCell;
      var currentWeek;
      var currentDay;
      var cellDate;
      _lodash2["default"].each(rows, function (row) {
        weeks = [];
        _lodash2["default"].each(cols, function (col) {
          if (row === 0) {
            day = col - start.getDay() + 1;
            tmp = col < start.getDay() ? -new Date(y, month, -(start.getDay() - 1 - col)).getDate() : day;
          } else {
            day = _lodash2["default"].last(months)[6].day + col + 1;
            tmp = day <= days ? day : -(day - days);
          }
          //adjust month and year
          var yearTmp = Number(y),
              monthTmp = Number(month);
          if (tmp < -20) monthTmp -= 1;else if (tmp < 0) monthTmp += 1;
          if (monthTmp < 0) {
            monthTmp = 11;
            yearTmp -= 1;
          } else if (monthTmp > 11) {
            monthTmp = 0;
            yearTmp += 1;
          }
          cellDate = new Date(yearTmp, monthTmp, Math.abs(tmp), h);
          commonCell = {
            date: cellDate,
            day: tmp,
            week: cellDate.getWeek(),
            month: cellDate.getMonth(),
            monthName: _this3.months[cellDate.getMonth()],
            year: cellDate.getFullYear(),
            disabled: _this3.checkExcept(cellDate, view)
          };
          weeks.push(_lodash2["default"].extend({ col: col, row: row }, commonCell));
          if (view === 'day' && cellDate.getWeek() === date.getWeek() && cellDate.getDate() === date.getDate() && !currentDay) currentDay = commonCell;
        });
        if (view === 'week' && cellDate.getWeek() === date.getWeek() && !currentWeek) currentWeek = weeks;
        if (!row || weeks[0].day > 0) months.push(weeks);
      });

      if (currentDay) {
        var _ret2 = (function () {
          var dayHour = [];
          _lodash2["default"].range(0, 24).map(function (hour) {
            _lodash2["default"].range(0, 4).map(function (quart) {
              var minute = quart * 15;
              var date = new Date(currentDay.year, currentDay.month, Math.abs(currentDay.day), hour, minute),
                  check = _this3.checkExcept(date, view);
              dayHour.push(_lodash2["default"].assign({}, currentDay, { hour: hour }, { minute: minute }, { col: dayHour.length }, { date: date }, { disabled: check }));
            });
          });
          return {
            v: dayHour
          };
        })();

        if (typeof _ret2 === "object") return _ret2.v;
      } else if (currentWeek) {
        var _ret3 = (function () {
          var weekHour = [];
          _lodash2["default"].each(currentWeek, function (item) {
            var dayHour = [];
            _lodash2["default"].range(0, 24).map(function (hour) {
              _lodash2["default"].range(0, 4).map(function (quart) {
                var minute = quart * 15;
                var date = new Date(item.year, item.month, Math.abs(item.day), hour, minute),
                    check = _this3.checkExcept(date, view);
                dayHour.push(_lodash2["default"].assign({}, item, { hour: hour }, { minute: minute }, { col: dayHour.length }, { date: date }, { disabled: check }));
              });
            });
            weekHour.push(dayHour);
          });
          return {
            v: weekHour
          };
        })();

        if (typeof _ret3 === "object") return _ret3.v;
      }
      return months;
    }
  }, {
    key: "checkExcept",
    value: function checkExcept(date, view) {
      var ret = false;
      for (var i = 0, len = this.except.length; i < len; i++) {
        switch (typeof this.except[i]) {
          case 'string':
            if (date.getDay() === this.days.indexOf(this.except[i])) ret = true;
            break;
          case 'object':
            switch (typeof this.except[i].start) {
              case 'number':
                if (view !== 'month' && date.getHours() >= this.except[i].start && date.getHours() <= this.except[i].end) ret = true;
                break;
              case 'object':
                if (date >= this.except[i].start && date <= this.except[i].end) ret = true;
                break;
              default:
                if (view === 'month' && date.toString() === this.except[i].toString()) ret = true;else if (view !== 'month') {
                  var tmp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                  if (tmp.toString() === this.except[i].toString()) ret = true;
                }
                break;
            }
            if (date.getDay() === this.days.indexOf(this.except[i])) ret = true;
            break;
          default:
            if (date.toString() === this.except[i].toString()) ret = true;
            break;
        }
      }
      return ret;
    }
  }, {
    key: "getMoveUp",
    value: function getMoveUp(height) {
      var decal = 0;
      for (var i = 0, len = this.except.length; i < len; i++) {
        if (typeof this.except[i].start === 'number' && this.except[i].start === 0) {
          decal -= this.except[i].end * height;
        }
      }
      return decal;
    }
  }, {
    key: "getRange",
    value: function getRange(rows, cols) {
      return {
        rows: _lodash2["default"].range(0, rows),
        cols: _lodash2["default"].range(0, cols)
      };
    }
  }, {
    key: "getInitDates",
    value: function getInitDates() {
      return {
        start: new Date(this.date.y, this.date.month),
        next: new Date(this.date.y, this.date.month + 1, 0),
        date: new Date(this.date.y, this.date.month, this.date.d)
      };
    }
  }, {
    key: "getDays",
    value: function getDays() {
      return this.days;
    }
  }, {
    key: "getToday",
    value: function getToday(withDay) {
      var today = new Date();
      return this.linkHelper(today.getFullYear(), today.getMonth(), withDay ? today.getDate() : null);
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      var info = new Date(this.date.y, this.date.month, this.date.d);
      return this.linkHelper(info.getFullYear(), info.getMonth(), info.getDate());
    }
  }, {
    key: "getEndDate",
    value: function getEndDate(date) {
      var min = date.getMinutes();
      date.setMinutes(min + 14);
      return date;
    }
  }, {
    key: "getLink",
    value: function getLink(view) {
      var _getLinkHelper = this.getLinkHelper(view);

      var previous = _getLinkHelper.previous;
      var next = _getLinkHelper.next;
      var today = _getLinkHelper.today;
      var current = _getLinkHelper.current;
      var prevLink = "/" + view + "/" + previous.y + "/" + previous.m;
      var nextLink = "/" + view + "/" + next.y + "/" + next.m;
      var todayLink = "/" + view + "/" + today.y + "/" + today.m;
      var monthLink = "/month/" + current.y + "/" + current.m;
      var weekLink = "/week/" + current.y + "/" + current.m + "/15";
      var dayLink = "/day/" + current.y + "/" + current.m + "/15";
      if (view === 'week' || view === 'day') {
        prevLink += "/" + previous.d;
        nextLink += "/" + next.d;
        todayLink += "/" + today.d;
      }
      return { prevLink: prevLink, nextLink: nextLink, todayLink: todayLink, dayLink: dayLink, monthLink: monthLink, weekLink: weekLink };
    }
  }, {
    key: "getLinkHelper",
    value: function getLinkHelper(view) {
      var y = this.date.y,
          m = this.date.month * 1,
          d = this.date.d * 1,
          h = this.date.h,
          mm = this.date.mm;
      if (view === 'week' || view === 'day') {
        var nt = new Date(y, m, d + (view === 'week' ? 7 : 1)),
            pv = new Date(y, m, d - (view === 'week' ? 7 : 1));
        return {
          next: this.linkHelper(nt.getFullYear(), nt.getMonth(), nt.getDate()),
          previous: this.linkHelper(pv.getFullYear(), pv.getMonth(), pv.getDate()),
          today: this.getToday(true),
          current: this.linkHelper(y, m, d, h, mm)
        };
      } else {
        var nt = new Date(y, m + 1),
            pv = new Date(y, m - 1);
        return {
          next: this.linkHelper(nt.getFullYear(), nt.getMonth()),
          previous: this.linkHelper(pv.getFullYear(), pv.getMonth()),
          today: this.getToday(),
          current: this.linkHelper(y, m, d, h, mm)
        };
      }
    }
  }, {
    key: "getLimit",
    value: function getLimit(line, evt, withHour, withMinute) {
      var _this4 = this;

      var eventDate = {
        start: new Date(evt.start),
        end: new Date(evt.end)
      };
      var start = _lodash2["default"].find(line, function (item) {
        return _this4.compare(item.date, eventDate.start, withHour, withMinute);
      });
      var end = _lodash2["default"].find(line, function (item) {
        return _this4.compare(item.date, eventDate.end, withHour, withMinute);
      });
      if (!(start || end || line[0].date > eventDate.start && line[line.length - 1].date < eventDate.end)) return { start: start, end: end };
      if (!start) start = line[0];
      if (!end) end = line[line.length - 1];
      return { start: start, end: end };
    }
  }, {
    key: "compare",
    value: function compare(date1, date2, withHour, withMinute) {
      if (withMinute) return this.compareWithMinute(date1, date2);else if (withHour) return this.compareWithHour(date1, date2);
      return this.compareDate(date1, date2);
    }
  }, {
    key: "compareWithMinute",
    value: function compareWithMinute(date1, date2) {
      return date1.getMinutes() === date2.getMinutes() && this.compareWithHour(date1, date2);
    }
  }, {
    key: "compareWithHour",
    value: function compareWithHour(date1, date2) {
      return date1.getHours() === date2.getHours() && this.compareDate(date1, date2);
    }
  }, {
    key: "compareDate",
    value: function compareDate(date1, date2) {
      return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }
  }, {
    key: "linkHelper",
    value: function linkHelper(y, m, d) {
      var h = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
      var mm = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

      var month = undefined; //number
      if (typeof m === 'string') month = this.months.indexOf(m);else {
        month = m;
        m = this.months[month];
      }
      if (m == -1) {
        month = 11;
        y--;
      } else if (month == 12) {
        month = 0;
        y++;
      }
      m = this.months[month];
      d = d || 1;
      return { y: y, m: m, d: d, h: h, mm: mm, month: month };
    }
  }]);

  return _default;
})();

//
exports["default"] = _default;
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  var ret = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return ret;
};
module.exports = exports["default"];

},{"lodash":"lodash"}],16:[function(require,module,exports){
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

var _libAgenda = require('./lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var identities = this.props.identities,
          agenda = new _libAgenda2['default'](),
          now = agenda.getToday(),
          link = '/month/' + now.y + '/' + now.m + '/';

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
                _reactRouter.Link,
                { to: '/' },
                'Accueil'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: link },
                'Calendar'
              )
            ),
            !this.props.isLogged && _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'a',
                { href: '/login' },
                'login'
              )
            ),
            this.props.isLogged && _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'a',
                { href: '/logout' },
                'logout'
              )
            ),
            this.props.isAdmin && _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'a',
                { href: '/admin' },
                'Mon Admin'
              )
            )
          )
        )
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"./lib/agenda":15,"react":"react","react-router":"react-router"}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
