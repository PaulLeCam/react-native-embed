'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _uuidJs = require('uuid-js');

var _uuidJs2 = _interopRequireDefault(_uuidJs);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventHandlers = {
  'Alert.alert': function AlertAlert() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _reactNative.Alert.alert(data.title, data.message, data.buttons, data.type);
  }
};

var requestHandlers = {
  'Alert.alert': function AlertAlert() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (data.buttons) {
      return new Promise(function (resolve) {
        var buttons = data.buttons.map(function (button, i) {
          return {
            text: button.text,
            onPress: function onPress() {
              resolve(i);
            }
          };
        });
        _reactNative.Alert.alert(data.title, data.message, buttons, data.type);
      });
    } else {
      _reactNative.Alert.alert(data.title, data.message, null, data.type);
    }
  }
};

var Embed = function (_Component) {
  _inherits(Embed, _Component);

  function Embed() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Embed);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Embed.__proto__ || Object.getPrototypeOf(Embed)).call.apply(_ref, [this].concat(args))), _this), _this.requests = Object.create(null), _this.bindWebView = function (e) {
      _this.webview = e;
    }, _this.onMessage = function (ev) {
      var data = ev.nativeEvent.data;

      try {
        var msg = JSON.parse(data);
        if (msg.type) {
          switch (msg.type) {
            case 'event':
              _this.onEvent(msg);
              break;
            case 'request':
              _this.onRequest(msg);
              break;
            case 'response':
              _this.onResponse(msg);
              break;
            default:
              (0, _warning2.default)(false, 'Unknown message type: ' + msg.type);
          }
        } else {
          (0, _warning2.default)(false, 'Invalid message: no type provided', msg);
        }
      } catch (ex) {
        (0, _warning2.default)(false, 'Invalid message: could not parse JSON', data);
      }
    }, _this.onEvent = function (_ref2) {
      var name = _ref2.name,
          data = _ref2.data;

      var handler = eventHandlers[name];
      if (handler) {
        handler(data);
      } else if (_this.props.onEvent) {
        _this.props.onEvent(name, data);
      } else {
        (0, _warning2.default)(false, 'No handler to process event');
      }
    }, _this.onRequest = function (_ref3) {
      var name = _ref3.name,
          data = _ref3.data,
          id = _ref3.id;

      var handler = requestHandlers[name];
      var hasHandler = false;
      var res = void 0;

      if (handler) {
        hasHandler = true;
        res = handler(data);
      } else if (_this.props.onRequest) {
        hasHandler = true;
        res = _this.props.onRequest(name, data);
      }

      if (hasHandler) {
        if (res.then) {
          res.then(function (result) {
            _this.postResponse({ id: id, ok: true, data: result });
          }).catch(function (err) {
            _this.postResponse({ id: id, ok: false, data: err });
          });
        } else {
          _this.postResponse({ id: id, ok: true, data: res });
        }
      } else {
        (0, _warning2.default)(false, 'No handler to process request');
      }
    }, _this.onResponse = function (_ref4) {
      var data = _ref4.data,
          id = _ref4.id,
          ok = _ref4.ok;

      var req = _this.requests[id];
      if (req) {
        if (ok) req.resolve(data);else req.reject(data);
      } else {
        (0, _warning2.default)(false, 'No tracked request for response: ' + id);
      }
    }, _this.postEvent = function (_ref5) {
      var name = _ref5.name,
          data = _ref5.data;

      _this.webview.postMessage(JSON.stringify({ name: name, data: data, type: 'event' }));
    }, _this.postRequest = function (_ref6) {
      var name = _ref6.name,
          data = _ref6.data;

      var id = _uuidJs2.default.create().toString();
      var promise = new Promise(function (resolve, reject) {
        _this.requests[id] = { resolve: resolve, reject: reject };
      });
      _this.webview.postMessage(JSON.stringify({ name: name, data: data, id: id, type: 'request' }));
      return promise;
    }, _this.postResponse = function (_ref7) {
      var data = _ref7.data,
          id = _ref7.id,
          ok = _ref7.ok;

      _this.webview.postMessage(JSON.stringify({ data: data, id: id, ok: ok, type: 'response' }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Embed, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onEvent = _props.onEvent,
          onRequest = _props.onRequest,
          props = _objectWithoutProperties(_props, ['onEvent', 'onRequest']);

      return _react2.default.createElement(_reactNative.WebView, _extends({
        onMessage: this.onMessage,
        ref: this.bindWebView
      }, props));
    }
  }]);

  return Embed;
}(_react.Component);

exports.default = Embed;