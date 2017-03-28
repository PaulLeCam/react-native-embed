// @flow

import { addListener, removeListener, postRequest } from '../bridge'

export const fetch = (): Promise<string> => {
  return postRequest({
    name: 'NetInfo.fetch',
  })
}

export const addEventListener = (type: string, handler: Function) => {
  if (type === 'change' && typeof handler === 'function') {
    addListener('NetInfo.change', handler)
  }
}

export const removeEventListener = (type: string, handler: Function) => {
  if (type === 'change' && typeof handler === 'function') {
    removeListener('NetInfo.change', handler)
  }
}

export const isConnected = {
  fetch: (): Promise<string> => {
    return postRequest({
      name: 'NetInfo.isConnected.fetch',
    })
  },
  addEventListener: (type: string, handler: Function) => {
    if (type === 'change' && typeof handler === 'function') {
      addListener('NetInfo.isConnected.change', handler)
    }
  },
  removeEventListener: (type: string, handler: Function) => {
    if (type === 'change' && typeof handler === 'function') {
      removeListener('NetInfo.isConnected.change', handler)
    }
  },
}

export const isConnectionExpensive = {
  fetch: (): Promise<string> => {
    return postRequest({
      name: 'NetInfo.isConnectionExpensive.fetch',
    })
  }
}
