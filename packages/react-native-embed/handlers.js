// @flow

import {
  Alert,
  AsyncStorage,
  Clipboard,
  Linking,
  NetInfo,
  Share,
} from 'react-native'

export const eventHandlers = {
  'Alert.alert': (data = {}) => {
    Alert.alert(data.title, data.message, data.buttons, data.type)
  },
  'Clipboard.setString': (data = {}) => {
    Clipboard.setString(data.content)
  },
}

export const eventListeners = {
  'NetInfo.change': {
    add: (handler: Function) => {
      NetInfo.addEventListener('change', handler)
    },
    remove: (handler: Function) => {
      NetInfo.removeEventListener('change', handler)
    },
  }
}

export const requestHandlers = {
  'Alert.alert': (data = {}) => {
    if (data.buttons) {
      return new Promise((resolve) => {
        const buttons = data.buttons.map((button, i) => ({
          text: button.text,
          onPress: () => {
            resolve(i)
          },
        }))
        Alert.alert(data.title, data.message, buttons, data.type)
      })
    } else {
      Alert.alert(data.title, data.message, null, data.type)
    }
  },
  'AsyncStorage.setItem': (data = {}) => {
    return AsyncStorage.setItem(data.key, data.value)
  },
  'AsyncStorage.getItem': (data = {}) => {
    return AsyncStorage.getItem(data.key)
  },
  'AsyncStorage.removeItem': (data = {}) => {
    return AsyncStorage.removeItem(data.key)
  },
  'AsyncStorage.mergeItem': (data = {}) => {
    return AsyncStorage.mergeItem(data.key, data.value)
  },
  'AsyncStorage.clear': () => {
    return AsyncStorage.clear()
  },
  'AsyncStorage.getAllKeys': () => {
    return AsyncStorage.getAllKeys()
  },
  'AsyncStorage.flushGetRequests': () => {
    return AsyncStorage.flushGetRequests()
  },
  'AsyncStorage.multiGet': (data = {}) => {
    return AsyncStorage.multiGet(data.keys)
  },
  'AsyncStorage.multiSet': (data = {}) => {
    return AsyncStorage.multiSet(data.keyValuePairs)
  },
  'AsyncStorage.multiRemove': (data = {}) => {
    return AsyncStorage.multiRemove(data.keys)
  },
  'AsyncStorage.multiMerge': (data = {}) => {
    return AsyncStorage.multiMerge(data.keyValuePairs)
  },
  'Clipboard.getString': () => {
    return Clipboard.getString()
  },
  'Linking.canOpenURL': (data = {}) => {
    return Linking.canOpenURL(data.url)
  },
  'Linking.getInitialURL': () => {
    return Linking.getInitialURL()
  },
  'Linking.openURL': (data = {}) => {
    return Linking.openURL(data.url)
  },
  'NetInfo.fetch': () => {
    return NetInfo.fetch()
  },
  'NetInfo.isConnected.fetch': () => {
    return NetInfo.isConnected.fetch()
  },
  'NetInfo.isConnectionExpensive.fetch': () => {
    return NetInfo.isConnectionExpensive.fetch()
  },
  'Share.share': (data = {}) => {
    return Share.share(data.content, data.options)
  },
}
