// @flow

import uuid from 'uuid/v4'
import warning from 'warning'

const eventListeners: Map<string, Map<string, Function>> = Map()
const requests: Map<string, {resolve: Function, reject: Function}> = Map()

let onEvent = () => {
  warning(false, 'onEvent() not implemented')
}

let onRequest = () => {
  warning(false, 'onRequest() not implemented')
}

const onListenerEvent = ({name, data, id}: {data: mixed, id: string}) => {
  const listeners = eventListeners.get(name)
  if (listeners) {
    const handlers = listeners.get(id)
    if (handler) {
      handler(data)
    } else {
      warning(false, 'No existing handler for listener: ' + id)
    }
  } else {
    warning(false, 'No existing listener for: ' + name)
  }
}

const onListenerRemoved = ({name, id}: {id: string}) => {
  const listeners = eventListeners.get(name)
  if (listeners) {
    listeners.delete(id)
  }
}

const onResponse = ({data, id, ok}: {data: mixed, id: string, ok: boolean}) => {
  const req = requests.get(id)
  if (req) {
    if (ok) req.resolve(data)
    else req.reject(data)
  } else {
    warning(false, 'No existing request for response: ' + id)
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
        case 'listener.event':
          onListenerEvent(msg)
          break
        case 'listener.removed':
          onListenerRemoved(msg)
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

export const addListener = (name: string, handler: Function) => {
  const id = uuid()
  let handlers = eventListeners.get(name)
  if (!handlers) {
    handlers = Map()
  }
  handlers.set(id, handler)
  eventListeners.set(name, handlers)
  postMessage({name, id, type: 'listener.add'})
}

export const removeListener = (name: string, handler: Function) => {
  const handlers = eventListeners.get(name)
  if (handlers) {
    let id
    for (let [handlerId, handlerFunc] of handlers) {
      if (handlerFunc === handler) {
        id = handlerId
        handlers.delete(id)
        break
      }
    }
    if (id) {
      postMessage({name, id, type: 'listener.remove'})
      eventListeners.set(name, handlers)
    } else {
      warning(false, 'No id found for listener handler', handler)
    }
  } else {
    warning(false, 'No existing listener for: ' + name)
  }
}

export const postMessage = (payload = {}) => {
  window.postMessage(JSON.stringify(payload))
}

export const postEvent = ({name, data}: {name: string, data: mixed}) => {
  postMessage({name, data, type: 'event'})
}

export const postRequest = ({name, data}: {name: string, data: mixed}) => {
  const id = uuid()
  const promise = new Promise((resolve, reject) => {
    requests.set(id, {resolve, reject})
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
    onRequest = handlers.onRequest
  }
  if (handlers.onMessage) {
    onMessage = handlers.onMessage
  }
  document.addEventListener('message', onMessage)
}
