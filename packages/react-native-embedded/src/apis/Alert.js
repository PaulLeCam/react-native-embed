// @flow

import { postEvent, postRequest } from '../bridge'

export const alert = (title, message, btns, type) => {
  if (btns) {
    const callbacks = {}
    const buttons = btns.map((btn, i) => {
      if (btn.onPress) {
        callbacks[i] = btn.onPress
      }
      return {text: btn.text}
    })
    postRequest({
      name: 'Alert.alert',
      data: {title, message, buttons, type},
    }).then((index) => {
      if (typeof index !== 'undefined') {
        const onPress = callbacks[index]
        if (onPress) onPress()
      }
    })
  } else {
    postEvent({
      name: 'Alert.alert',
      data: {title, message, buttons: btns, type},
    })
  }
}
