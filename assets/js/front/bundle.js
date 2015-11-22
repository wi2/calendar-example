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
},{"./index":10,"react-dom":"react-dom"}],2:[function(require,module,exports){
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
        { className: 'agenda-vertical' },
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
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.className, style: { height: this.props.height },
          onClick: this._handleClick.bind(this),
          onMouseOver: this._handleOver.bind(this) },
        _react2['default'].createElement(
          'div',
          { className: 'col-content' },
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
              { className: className,
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
        null,
        days.map(function (day, i) {
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
      return props.info.y !== this.props.info.y || props.info.m !== this.props.info.m;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        Row,
        null,
        this.props.onPrevious && _react2['default'].createElement(
          'a',
          { onClick: this._handlePrevious.bind(this), className: 'btn' },
          ' ',
          "<",
          ' '
        ),
        _react2['default'].createElement(
          'div',
          null,
          this.props.info.m + " " + this.props.info.y
        ),
        this.props.onNext && _react2['default'].createElement(
          'a',
          { onClick: this._handleNext.bind(this), className: 'btn' },
          ' ',
          ">",
          ' '
        )
      );
    }
  }]);

  return Info;
})(_react.Component);

exports.Info = Info;

},{"../lib/agenda":12,"react":"react","react-router":"react-router"}],3:[function(require,module,exports){
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

var _calendarUtils = require('./calendar-utils');

var ViewDefault = (function (_Component) {
  _inherits(ViewDefault, _Component);

  function ViewDefault(props) {
    _classCallCheck(this, ViewDefault);

    _get(Object.getPrototypeOf(ViewDefault.prototype), 'constructor', this).call(this, props);
    this.state = {
      width: this.props.width,
      height: this.props.height
    };
  }

  _createClass(ViewDefault, [{
    key: 'setDimension',
    value: function setDimension(width, height) {
      this.setState({ width: width, height: height });
    }
  }, {
    key: 'tetris',
    value: function tetris(events) {
      if (events.length === 0) return [];
      events[0].cell.line = 1;

      var _loop = function (j, len) {
        var collision = false;
        var evt = events[j].cell;
        var line = 1;
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
      this.setDimension(this.props.width / 7, this.props.height / 24);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setDimension(this.props.width / 7, this.props.height / 24);
    }
  }, {
    key: 'style',
    value: function style(evt) {
      var room = evt.room;
      var cell = evt.cell;
      var width = this.props.height / 24;

      return {
        opacity: 0.8,
        left: evt.cell.line * 12 + 'px',
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

      var events = undefined,
          week = this.props.week;
      if (this.props.agenda && this.props.events) {
        events = this.tetris(this.props.agenda.getEvents(week, this.props.events, true));
      }
      var selection = {
        s: this.props.selectionStart.date,
        e: this.props.selectionEnd.date
      };

      return _react2['default'].createElement(
        _calendarUtils.Vertical,
        null,
        events && events.map(function (evt, i) {
          return _react2['default'].createElement(
            'div',
            { className: 'event',
              style: _this.style(evt),
              onClick: _this.onSelect.bind(_this, evt),
              key: 'event-' + i },
            evt.title
          );
        }),
        week.map(function (item) {
          var cond = item.date >= selection.s && item.date <= selection.e;

          var props = {
            value: item.hour,
            className: cond ? "col-day col-day-active" : "col-day",
            toggleSelection: _this.toggleSelection.bind(_this, item),
            moveSelection: _this.moveSelection.bind(_this, item),
            disabled: item.disabled,
            key: 'hour-' + item.hour + '-' + item.row + '-' + item.col
          };
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
          }
          return _react2['default'].createElement(_calendarUtils.Cell, _extends({}, props, _this.state));
        })
      );
    }
  }]);

  return Week;
})(ViewDefault);

exports.Week = Week;

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
      var room = evt.room;
      var cell = evt.cell;
      var width = this.state.width;

      return {
        opacity: 0.8,
        top: evt.cell.line * 12 + 'px',
        left: cell.start * width + 'px',
        width: (cell.end - cell.start + 1) * width + 'px',
        background: room.color || 'grey'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var numLine = 0;
      var week = this.props.week;
      var events = this.tetris(this.props.agenda.getEvents(week, this.props.events));

      var selection = {
        s: this.props.selectionStart.date,
        e: this.props.selectionEnd.date
      };
      var that = this;
      return _react2['default'].createElement(
        _calendarUtils.Row,
        null,
        events && events.map(function (evt, i) {
          return _react2['default'].createElement(
            'div',
            { className: 'event',
              style: _this2.style(evt),
              onClick: _this2.onSelect.bind(_this2, evt),
              key: 'event-' + i },
            evt.title
          );
        }),
        week.map(function (item) {
          var cond = item.date >= selection.s && item.date <= selection.e;
          var props = {
            value: item.day,
            className: cond ? "col col-active" : "col",
            toggleSelection: that.toggleSelection.bind(_this2, item),
            moveSelection: that.moveSelection.bind(_this2, item),
            disabled: item.disabled,
            key: 'day-' + item.day + '-' + item.col + '-' + item.row
          };
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
          }
          return _react2['default'].createElement(_calendarUtils.Cell, _extends({}, props, _this2.state));
        })
      );
    }
  }]);

  return Month;
})(ViewDefault);

exports.Month = Month;

},{"./calendar-utils":2,"react":"react"}],4:[function(require,module,exports){
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

var _reactDom = require('react-dom');

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _calendarUtils = require('./calendar-utils');

var _calendarView = require('./calendar-view');

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
      startInit: -1
    };
    if (this.props.onLoad) this.props.onLoad(this.props);
  }

  _createClass(_default, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.agenda.changeDate(props.year, props.month, props.day);
      this.setState({
        view: props.view,
        events: props.events || [],
        agenda: this.agenda,
        store: this.agenda.matrix(props.view),
        info: this.agenda.getInfo()
      });
      this.props.onChange(props);
    }
  }, {
    key: 'toggleEditor',
    value: function toggleEditor() {
      this.setState({ editor: !this.state.editor });
    }
  }, {
    key: 'toggleSelection',
    value: function toggleSelection(val) {
      if (this.state.editor) {
        if (this.state.start !== -1) {
          var selection = this.getSmartSelection(val);
          this.setState({
            selection: selection,
            start: -1,
            end: -1,
            startInit: -1
          });
          this.props.onSelect(selection, this.state.editor);
        } else {
          this.setState({
            startInit: val,
            start: val,
            end: val
          });
        }
      } else {
        this.props.onSelect(val, this.state.editor);
      }
    }
  }, {
    key: 'moveSelection',
    value: function moveSelection(val) {
      if (this.state.start !== -1) this.setState(this.getSmartSelection(val));
    }
  }, {
    key: 'onSelectEvent',
    value: function onSelectEvent(val) {
      this.props.onSelect(val, this.state.editor);
    }
  }, {
    key: 'getSmartSelection',
    value: function getSmartSelection(b) {
      var a = this.state.startInit;
      return {
        start: a.date <= b.date ? a : b,
        end: a.date >= b.date ? a : b
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
        editor: this.state.editor
      };

      return _react2['default'].createElement(
        'div',
        { className: 'agenda', style: { width: this.props.width } },
        _react2['default'].createElement(_calendarUtils.Navigation, { store: store,
          agenda: this.agenda,
          view: view,
          editor: this.state.editor,
          toggleEditor: this.toggleEditor.bind(this) }),
        _react2['default'].createElement(_calendarUtils.Info, { info: this.state.info }),
        _react2['default'].createElement(_calendarUtils.Header, { view: view, store: store, agenda: this.agenda }),
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
        view === 'month' && store.map(function (week, j) {
          return _react2['default'].createElement(_calendarView.Month, _extends({}, props, {
            week: week,
            height: _this.props.height,
            width: _this.props.width,
            agenda: _this.agenda, key: 'row-' + j }));
        })
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

},{"../lib/agenda":12,"./calendar-utils":2,"./calendar-view":3,"react":"react","react-dom":"react-dom"}],5:[function(require,module,exports){
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

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _calendarUtils = require('./calendar-utils');

var ViewDefault = (function (_Component) {
  _inherits(ViewDefault, _Component);

  function ViewDefault(props) {
    _classCallCheck(this, ViewDefault);

    _get(Object.getPrototypeOf(ViewDefault.prototype), 'constructor', this).call(this, props);
  }

  return ViewDefault;
})(_react.Component);

var DatePicker = (function (_ViewDefault) {
  _inherits(DatePicker, _ViewDefault);

  function DatePicker() {
    _classCallCheck(this, DatePicker);

    _get(Object.getPrototypeOf(DatePicker.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.agenda = new _libAgenda2['default'](this.props.year, this.props.month, this.props.day, this.props.hour);
      this.agenda.setException(this.props.except || []);
      var view = this.props.day ? "week" : "month";
      view = this.props.view || view;
      this.update(view);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.agenda.changeDate(props.year, props.month, props.day, props.hour);
      var view = props.day ? "week" : "month";
      view = props.view || view;
      this.update(view);
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
    value: function update(view) {
      var info = this.agenda.getInfo(view),
          link = this.agenda.getLinkHelper(view),
          store = this.agenda.matrix(view),
          current = new Date(link.current.y, link.current.month, link.current.d, link.current.h);

      var value = {
        store: store,
        info: info,
        link: link,
        view: view,
        current: current
      };
      this.setState(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var height = 30;
      return _react2['default'].createElement(
        'div',
        null,
        this.state && _react2['default'].createElement(_calendarUtils.Info, { info: this.state.info,
          onPrevious: this.onPrevious.bind(this),
          onNext: this.onNext.bind(this) }),
        this.state && _react2['default'].createElement(_calendarUtils.Header, { view: this.state.view, store: this.state.store, agenda: this.agenda }),
        _react2['default'].createElement(
          _calendarUtils.Row,
          null,
          _react2['default'].createElement(
            'a',
            { onClick: this._toggleView.bind(this), className: 'btn' },
            'toggle view'
          )
        ),
        _react2['default'].createElement(
          _calendarUtils.Row,
          null,
          this.state && this.state.store.map(function (line, j) {
            if (_this.state.view === 'month') return line.map(function (item, i) {
              var cond = _this.agenda.compare(_this.state.current, item.date);
              var props = {
                height: height,
                value: item.day,
                className: cond ? 'col-day col-day-active' : 'col-day',
                disabled: item.disabled,
                toggleSelection: _this._onSelect.bind(_this, item),
                key: 'cell-' + j + '-' + i + _this.props.name
              };
              if (item.disabled) {
                delete props.toggleSelection;
                props.className = "col-day col-day-disabled";
              }
              return _react2['default'].createElement(_calendarUtils.Cell, props);
            });else return _react2['default'].createElement(
              _calendarUtils.Vertical,
              { key: 'vertical-' + j + '-' + _this.props.name },
              line.map(function (item, i) {
                var cond = _this.agenda.compare(_this.state.current, item.date, true);
                var props = {
                  height: height,
                  value: item.day + " " + item.hour,
                  className: cond ? 'col-day col-day-active' : 'col-day',
                  disabled: item.disabled,
                  toggleSelection: _this._onSelect.bind(_this, item),
                  key: 'cell-' + j + '-' + i + _this.props.name
                };
                if (item.disabled) {
                  delete props.toggleSelection;
                  props.className = "col-day col-day-disabled";
                }
                return _react2['default'].createElement(_calendarUtils.Cell, props);
              })
            );
          })
        )
      );
    }
  }]);

  return DatePicker;
})(ViewDefault);

exports.DatePicker = DatePicker;

},{"../lib/agenda":12,"./calendar-utils":2,"react":"react"}],6:[function(require,module,exports){
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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _newforms = require('newforms');

var _newformsBootstrap = require('newforms-bootstrap');

var _newformsBootstrap2 = _interopRequireDefault(_newformsBootstrap);

var _libAgenda = require('../lib/agenda');

var _libAgenda2 = _interopRequireDefault(_libAgenda);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _datePicker = require('./date-picker');

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    var now = undefined;
    this.state = {
      startPicker: { show: false, date: now },
      endPicker: { show: false, date: now }
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
    value: function onFormChange(e) {
      this.forceUpdate();
    }
  }, {
    key: '_showDatePicker',
    value: function _showDatePicker(e) {
      e.preventDefault();
      var date = new Date(e.target.value);
      this.changeDate(date, e.target.name);
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
        name: name,
        except: this.props.except || []
      };
      this.setState(name === 'start' ? { startPicker: _lodash2['default'].extend({
          show: toggle ? !this.state.startPicker.show : this.state.startPicker.show,
          view: "month"
        }, common) } : { endPicker: _lodash2['default'].extend({
          show: toggle ? !this.state.endPicker.show : this.state.startPicker.show,
          view: "week"
        }, common) });
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
        'form',
        { encType: 'multipart/form-data', className: 'agenda-modal' },
        _react2['default'].createElement(
          _newforms.RenderForm,
          { form: this.form, ref: function (ref) {
              return _this.mForm = ref;
            } },
          _react2['default'].createElement(
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
                { className: 'btn btn-default', onClick: this._onSubmit.bind(this) },
                'Save'
              ),
              _react2['default'].createElement(
                'button',
                { className: 'btn btn-default', onClick: this._onCancel.bind(this) },
                'Cancel'
              )
            ),
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
              _react2['default'].createElement(_newformsBootstrap.Field, { name: 'start', md: '6' }),
              _react2['default'].createElement(_newformsBootstrap.Field, { name: 'end' })
            ),
            _react2['default'].createElement(
              _newformsBootstrap.Row,
              null,
              _react2['default'].createElement(
                _newformsBootstrap.Col,
                { md: '6' },
                this.state.startPicker.show && _react2['default'].createElement(_datePicker.DatePicker, _extends({}, this.state.startPicker, { onSelect: this._onSelectStart.bind(this) }))
              ),
              _react2['default'].createElement(
                _newformsBootstrap.Col,
                null,
                this.state.endPicker.show && _react2['default'].createElement(_datePicker.DatePicker, _extends({}, this.state.endPicker, { onSelect: this._onSelectEnd.bind(this) }))
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

},{"../lib/agenda":12,"./calendar":4,"./date-picker":5,"lodash":"lodash","newforms":"newforms","newforms-bootstrap":"newforms-bootstrap","react":"react"}],7:[function(require,module,exports){
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

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), "constructor", this).call(this, props);
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _react2["default"].createElement(
        "div",
        { className: "agenda-panel" },
        Object.keys(this.props).map(function (key) {
          return _react2["default"].createElement(
            "div",
            { key: key },
            _this.props[key].toString()
          );
        })
      );
    }
  }]);

  return _default;
})(_react.Component);

exports["default"] = _default;
module.exports = exports["default"];

},{"react":"react"}],8:[function(require,module,exports){
(function (global){
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
    this.except = ['Sun', 'Sat', { start: new Date(2015, 9, 7), end: new Date(2015, 9, 11) }, { start: new Date(2015, 9, 15), end: new Date(2015, 9, 17) }, { start: 0, end: 6 }, { start: 20, end: 23 }, new Date(2015, 10, 7), new Date(2015, 10, 10)];
    this.state = {
      show: false,
      rooms: this.props.rooms || [],
      width: 1000,
      height: 700
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.loadEvents();
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
        _this2.setState({ width: e.target.innerWidth });
      }, 50);
      setTimeout(function () {
        _this2.setState({ width: e.target.innerWidth });
      }, 100); //need twice for window resize and show inspector (why??)
    }
  }, {
    key: 'loadEvents',
    value: function loadEvents() {
      var _this3 = this;

      if (global.io) io.socket.get('/event?limit=100', function (res) {
        _this3.setState({ events: res });
      });
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      this.setState({ show: false, selection: null });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(data, id) {
      var _this4 = this;

      if (global.io) {
        if (id) io.socket.put("/event/" + id, data, function (res) {
          _this4.loadEvents();
        });else io.socket.post("/event", data, function (res) {
          _this4.loadEvents();
        });
      }
      this.hideModal();
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.hideModal();
    }
  }, {
    key: 'onSelect',
    value: function onSelect(data) {
      var _this5 = this;

      var edition = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (edition) this.setState({
        show: true,
        selection: data,
        width: document.body.offsetWidth
      });else {
        this.setState({
          current: data,
          width: document.body.offsetWidth * 0.8
        });
        setTimeout(function () {
          _this5.setState({ width: document.body.offsetWidth * 0.8 }); // twice : why?
        });
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
        this.state.current && _react2['default'].createElement(_comPanel2['default'], this.state.current),
        this.state.show && _react2['default'].createElement(_comModal2['default'], _extends({}, this.state.selection, {
          rooms: this.state.rooms,
          onSubmit: this.onSubmit.bind(this),
          onCancel: this.onCancel.bind(this),
          except: this.except
        }, this.props.params)),
        _react2['default'].createElement(_comCalendar2['default'], _extends({ events: this.props.events || [],
          onSelect: this.onSelect.bind(this),
          onChange: this.onChange.bind(this),
          onLoad: this.onLoad.bind(this)
        }, this.state, {
          except: this.except
        }, this.props.params))
      );
    }
  }]);

  return _default;
})(_react.Component);

exports['default'] = _default;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../com/calendar":4,"../com/modal":6,"../com/panel":7,"react":"react","react-dom":"react-dom"}],9:[function(require,module,exports){
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

},{"../lib/agenda":12,"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
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

},{"./ctrl/calendar":8,"./ctrl/home":9,"./layout":11,"history":"history","react":"react","react-router":"react-router"}],11:[function(require,module,exports){
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
},{"./nav":13,"react":"react"}],12:[function(require,module,exports){
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

    if (!y) {
      var now = new Date();
      y = now.getFullYear();
      m = this.months[now.getMonth()];
    }

    if (typeof Number(m) === 'number') m = this.months[m];
    this.changeDate(y, m, d, h, mm);

    //
    this.except = [];
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

      var allevents = events.filter(function (evt) {
        var _getLimit = _this.getLimit(line, evt, withHour);

        var start = _getLimit.start;
        var end = _getLimit.end;

        if (start && end) {
          evt.cell = { start: start.col, end: end.col };
          return evt;
        }
      });

      return allevents.sort(function (a, b) {
        return b.cell.start - a.cell.start;
      }).sort(function (a, b) {
        return b.cell.end - b.cell.start - (a.cell.end - a.cell.start);
      });
    }
  }, {
    key: "matrix",
    value: function matrix() {
      var _this2 = this;

      var view = arguments.length <= 0 || arguments[0] === undefined ? 'month' : arguments[0];
      var _date = this.date;
      var y = _date.y;
      var m = _date.m;
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
      var currentWeek;
      var cellDate;

      _lodash2["default"].each(rows, function (row) {
        weeks = [];
        _lodash2["default"].each(cols, function (col) {
          if (row === 0) {
            day = col - start.getDay() + 1;
            tmp = col < start.getDay() ? -new Date(y, m, -(start.getDay() - 1 - col)).getDate() : day;
          } else {
            day = _lodash2["default"].last(months)[6].day + col + 1;
            tmp = day <= days ? day : -(day - days);
          }

          //adjust month and year
          var yearTmp = y,
              monthTmp = m;
          if (tmp < -20) monthTmp -= 1;else if (tmp < 0) monthTmp += 1;
          if (monthTmp < 0) {
            monthTmp = 11;
            yearTmp -= 1;
          } else if (monthTmp > 11) {
            monthTmp = 0;
            yearTmp += 1;
          }

          cellDate = new Date(yearTmp, monthTmp, Math.abs(tmp));
          weeks.push({
            date: cellDate,
            day: tmp,
            week: cellDate.getWeek(),
            month: cellDate.getMonth(),
            year: cellDate.getFullYear(),
            col: col,
            row: row,
            disabled: _this2.checkExcept(cellDate, view)
          });
        });
        if (view === 'week' && cellDate.getWeek() === date.getWeek() && !currentWeek) currentWeek = weeks;

        if (!row || weeks[0].day > 0) months.push(weeks);
      });

      if (currentWeek) {
        var _ret = (function () {
          var weekHour = [];
          _lodash2["default"].each(currentWeek, function (item) {
            var dayHour = [];
            _lodash2["default"].range(0, 24).map(function (hour) {
              var date = new Date(item.year, item.month, Math.abs(item.day), hour),
                  check = _this2.checkExcept(date, view);
              dayHour.push(_lodash2["default"].assign({}, item, { hour: hour }, { col: hour }, { date: date }, { disabled: check }));
            });
            weekHour.push(dayHour);
          });
          return {
            v: weekHour
          };
        })();

        if (typeof _ret === "object") return _ret.v;
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
                if (view === 'week' && date.getHours() >= this.except[i].start && date.getHours() <= this.except[i].end) ret = true;
                break;
              default:
                if (date >= this.except[i].start && date <= this.except[i].end) ret = true;
                break;
            }
            if (date.getDay() === this.days.indexOf(this.except[i])) ret = true;
            break;
          default:
            if (date == this.except[i]) ret = true;
            break;

        }
      }
      return ret;
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
        start: new Date(this.date.y, this.date.m),
        next: new Date(this.date.y, this.date.m + 1, 0),
        date: new Date(this.date.y, this.date.m, this.date.d)
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
      var info = new Date(this.date.y, this.date.m);
      return this.linkHelper(info.getFullYear(), info.getMonth());
    }
  }, {
    key: "getLink",
    value: function getLink(view) {
      var _getLinkHelper = this.getLinkHelper(view);

      var previous = _getLinkHelper.previous;
      var next = _getLinkHelper.next;
      var today = _getLinkHelper.today;
      var current = _getLinkHelper.current;

      var prevLink = "/" + view + "/" + previous.y + "/" + previous.m,
          nextLink = "/" + view + "/" + next.y + "/" + next.m,
          todayLink = "/" + view + "/" + today.y + "/" + today.m,
          monthLink = "/month/" + current.y + "/" + current.m,
          weekLink = "/week/" + current.y + "/" + current.m + "/2";

      if (view === 'week') {
        prevLink += "/" + previous.d;
        nextLink += "/" + next.d;
        todayLink += "/" + today.d;
      }
      return { prevLink: prevLink, nextLink: nextLink, todayLink: todayLink, monthLink: monthLink, weekLink: weekLink };
    }
  }, {
    key: "getLinkHelper",
    value: function getLinkHelper(view) {
      var y = this.date.y,
          m = this.date.m * 1,
          d = this.date.d * 1,
          h = this.date.h,
          mm = this.date.mm;

      if (view === 'week') {
        var nt = new Date(y, m, d + 7),
            pv = new Date(y, m, d - 7);

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
    value: function getLimit(line, evt, withHour) {
      var _this3 = this;

      var eventDate = {
        start: new Date(evt.start),
        end: new Date(evt.end)
      };
      var start = _lodash2["default"].find(line, function (item) {
        return _this3.compare(item.date, eventDate.start, withHour);
      });

      var end = _lodash2["default"].find(line, function (item) {
        return _this3.compare(item.date, eventDate.end, withHour);
      });

      if (!(start || end || line[0].date > eventDate.start && line[line.length - 1].date < eventDate.end)) return { start: start, end: end };

      if (!start) start = line[0];
      if (!end) end = line[line.length - 1];

      return { start: start, end: end };
    }
  }, {
    key: "compare",
    value: function compare(date1, date2, withHour) {
      if (withHour) return this.compareWithHour(date1, date2);
      return this.compareDate(date1, date2);
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

      var mo = m * 1;
      if (mo >= -1) {
        if (mo == -1) {
          mo = 11;
          y--;
        } else if (mo == 12) {
          mo = 0;
          y++;
        }
        m = this.months[mo];
      } else {
        m = this.months.indexOf(m);
      }
      d = d || 1;
      return { y: y, m: m, d: d, h: h, mm: mm, month: this.months.indexOf(m) };
    }
  }]);

  return _default;
})();

//
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

},{"lodash":"lodash"}],13:[function(require,module,exports){
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
            _react2['default'].createElement(
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

},{"./lib/agenda":12,"react":"react","react-router":"react-router"}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13]);
