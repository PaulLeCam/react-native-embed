// @flow

import React, { Component } from 'react'
import { Alert, WebView } from 'react-native'
import UUID from 'uuid-js'
import warning from 'warning'

const eventHandlers = {
  'Alert.alert': (data = {}) => {
    Alert.alert(data.title, data.message, data.buttons, data.type)
  },
}

const requestHandlers = {
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
}

export default class Embed extends Component {
  requests = Object.create(null)
  webview: React.Element<*>

  bindWebView = (e: React.Element<*>) => {
    this.webview = e
  }

  onMessage = (ev: Object) => {
    const { data } = ev.nativeEvent
    try {
      const msg = JSON.parse(data)
      if (msg.type) {
        switch (msg.type) {
          case 'event':
            this.onEvent(msg)
            break
          case 'request':
            this.onRequest(msg)
            break
          case 'response':
            this.onResponse(msg)
            break
          default:
            warning(false, 'Unknown message type: ' + msg.type)
        }
      } else {
        warning(false, 'Invalid message: no type provided', msg)
      }
    } catch (ex) {
      warning(false, 'Invalid message: could not parse JSON', data)
    }
  }

  onEvent = ({name, data}: {name: string, data: mixed}) => {
    const handler = eventHandlers[name]
    if (handler) {
      handler(data)
    } else if (this.props.onEvent) {
      this.props.onEvent(name, data)
    } else {
      warning(false, 'No handler to process event')
    }
  }

  onRequest = ({name, data, id}: {name: string, data: mixed, id: string}) => {
    const handler = requestHandlers[name]
    let hasHandler = false
    let res

    if (handler) {
      hasHandler = true
      res = handler(data)
    } else if (this.props.onRequest) {
      hasHandler = true
      res = this.props.onRequest(name, data)
    }

    if (hasHandler) {
      if (res.then) {
        res.then((result) => {
          this.postResponse({id, ok: true, data: result})
        }).catch((err) => {
          this.postResponse({id, ok: false, data: err})
        })
      } else {
        this.postResponse({id, ok: true, data: res})
      }
    } else {
      warning(false, 'No handler to process request')
    }
  }

  onResponse = ({data, id, ok}: {data: mixed, id: string, ok: bool}) => {
    const req = this.requests[id]
    if (req) {
      if (ok) req.resolve(data)
      else req.reject(data)
    } else {
      warning(false, 'No tracked request for response: ' + id)
    }
  }

  postEvent = ({name, data}: {name: string, data: mixed}) => {
    this.webview.postMessage(JSON.stringify({name, data, type: 'event'}))
  }

  postRequest = ({name, data}: {name: string, data: mixed}) => {
    const id = UUID.create().toString()
    const promise = new Promise((resolve, reject) => {
      this.requests[id] = {resolve, reject}
    })
    this.webview.postMessage(JSON.stringify({name, data, id, type: 'request'}))
    return promise
  }

  postResponse = ({data, id, ok}: {data: mixed, id: string, ok: bool}) => {
    this.webview.postMessage(JSON.stringify({data, id, ok, type: 'response'}))
  }

  render () {
    const { onEvent, onRequest, ...props } = this.props
    return (
      <WebView
        onMessage={this.onMessage}
        ref={this.bindWebView}
        {...props}
      />
    )
  }
}
