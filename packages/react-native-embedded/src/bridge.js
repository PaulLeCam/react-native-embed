// @flow

import UUID from 'uuid-js'
import warning from 'warning'

const requests = Object.create(null)

let onEvent = () => {
  warning(false, 'onEvent() not implemented')
}

let onRequest = () => {
  warning(false, 'onRequest() not implemented')
}

const onResponse = ({data, id, ok}: {data: mixed, id: string, ok: bool}) => {
  const req = requests[id]
  if (req) {
    if (ok) req.resolve(data)
    else req.reject(data)
  } else {
    warning(false, 'No tracked request for response: ' + id)
  }
}

let onMessage = (ev: Object) => {
  try {
    const msg = JSON.parse(ev.data)
    if (msg.type) {
      switch (msg.type) {
        case 'event':
          onEvent(msg)
          break
        case 'request':
          onRequest(msg)
          break
        case 'response':
          onResponse(msg)
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

export const postMessage = (payload = {}) => {
  window.postMessage(JSON.stringify(payload))
}

export const postEvent = ({name, data}: {name: string, data: mixed}) => {
  postMessage({name, data, type: 'event'})
}

export const postRequest = ({name, data}: {name: string, data: mixed}) => {
  const id = UUID.create().toString()
  const promise = new Promise((resolve, reject) => {
    requests[id] = {resolve, reject}
  })
  postMessage({name, data, id, type: 'request'})
  return promise
}

export const postResponse = ({name, data, id}: {name: string, data: mixed, id: string}) => {
  postMessage({name, data, id, type: 'response'})
}

export const setup = (handlers = {}) => {
  if (handlers.onEvent) {
    onEvent = handlers.onEvent
  }
  if (handlers.onRequest) {
    onRequest = handlers.onResponse
  }
  if (handlers.onRequest) {
    onMessage = handlers.onMessage
  }
  document.addEventListener('message', onMessage)
}
