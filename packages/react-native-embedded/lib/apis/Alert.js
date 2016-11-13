'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = undefined;

var _bridge = require('../bridge');

var alert = exports.alert = function alert(title, message, btns, type) {
  if (btns) {
    (function () {
      var callbacks = {};
      var buttons = btns.map(function (btn, i) {
        if (btn.onPress) {
          callbacks[i] = btn.onPress;
        }
        return { text: btn.text };
      });
      (0, _bridge.postRequest)({
        name: 'Alert.alert',
        data: { title: title, message: message, buttons: buttons, type: type }
      }).then(function (index) {
        if (typeof index !== 'undefined') {
          var onPress = callbacks[index];
          if (onPress) onPress();
        }
      });
    })();
  } else {
    (0, _bridge.postEvent)({
      name: 'Alert.alert',
      data: { title: title, message: message, buttons: btns, type: type }
    });
  }
};