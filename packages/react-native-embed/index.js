// @flow

import React, { Component } from 'react'
import { WebView } from 'react-native'
import uuid from 'uuid/v4'
import warning from 'warning'

import { eventHandlers, requestHandlers } from './handlers'

const wrappedHandlers = new Map()

export const addEventListener = (type: string, handler: Function) => {
  if (type === 'url' && typeof handler === 'function') {
    const wrapHandler = (event: Object, url: string) => {
      handler({type, url})
    }
    wrappedHandlers.set(handler, wrapHandler)
    remote.app.on('open-url', wrapHandler)
  }
}

export const removeEventListener = (type: string, handler: Function) => {
  if (type === 'url' && typeof handler === 'function') {
    const wrapHandler = wrappedHandlers.get(handler)
    if (wrapHandler) {
      remote.app.removeListener('open-url', wrapHandler)
    }
    wrappedHandlers.delete(handler)
  }
}

export default class Embed extends Component {
  requests: Map<string, Promise<*>> = new Map()
  webview: React.Element<*>
  wrappedHandlers: Map = new Map()

  bindWebView = (e: React.Element<*>) => {
    this.webview = e
  }

  onMessage = (ev: Object) => {
    const { data } = ev.nativeEvent
    try {
      const msg = JSON.parse(data)
      if (msg.type) {
        switch (msg.type) {
          // TODO: add addListener/removeListener handlers
          // Should keep reference of the message ID and use postEvent with the ID
          case 'event':
            this.onEvent(msg)
            break
          case 'listener.add':
            this.onAddListener(msg)
            break
          case 'listener.remove':
            this.onRemoveListener(msg)
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
      }
    } catch (ex) {
      // Invalid JSON, likely not sent by the embedded bridge
    }
  }

  onAddListener = ({name, id}: {name: string}) => {

  }

  onRemoveListener = ({id}: {id: string}) => {

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
        }, (err) => {
          this.postResponse({id, ok: false, data: err})
        })
      } else {
        this.postResponse({id, ok: true, data: res})
      }
    } else {
      warning(false, 'No handler to process request')
    }
  }

  onResponse = ({data, id, ok}: {data: mixed, id: string, ok: boolean}) => {
    const req = this.requests[id]
    if (req) {
      if (ok) req.resolve(data)
      else req.reject(data)
    } else {
      warning(false, 'No existing request for response: ' + id)
    }
  }

  postEvent = ({name, data}: {name: string, data: mixed}) => {
    this.webview.postMessage(JSON.stringify({name, data, type: 'event'}))
  }

  postListenerEvent = () => {

  }

  postListenerRemoved = () => {

  }

  postRequest = ({name, data}: {name: string, data: mixed}) => {
    const id = uuid()
    const promise = new Promise((resolve, reject) => {
      this.requests[id] = {resolve, reject}
    })
    this.webview.postMessage(JSON.stringify({name, data, id, type: 'request'}))
    return promise
  }

  postResponse = ({data, id, ok}: {data: mixed, id: string, ok: boolean}) => {
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
