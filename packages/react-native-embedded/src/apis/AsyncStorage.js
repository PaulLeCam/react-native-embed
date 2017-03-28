// @flow

import { postRequest } from '../bridge'

export const setItem = (key: string, value: string): Promise<void> => {
  return postRequest({
    name: 'AsyncStorage.setItem',
    data: {key, value},
  })
}

export const getItem = (key: string): Promise<?string> => {
  return postRequest({
    name: 'AsyncStorage.getItem',
    data: {key},
  })
}

export const removeItem = (key: string): Promise<void> => {
  return postRequest({
    name: 'AsyncStorage.removeItem',
    data: {key},
  })
}

export const mergeItem = (key: string, value: Object): Promise<void> => {
  return postRequest({
    name: 'AsyncStorage.mergeItem',
    data: {key, value},
  })
}

export const clear = (): Promise<void> => {
  return postRequest({
    name: 'AsyncStorage.clear',
  })
}

export const getAllKeys = (): Promise<string[]> => {
  return postRequest({
    name: 'AsyncStorage.getAllKeys',
  })
}

export const flushGetRequests = (): Promise<string[]> => {
  return postRequest({
    name: 'AsyncStorage.flushGetRequests',
  })
}

export const multiGet = (keys: string[]): Promise<Array<?string>> => {
  return postRequest({
    name: 'AsyncStorage.multiGet',
    data: {keys},
  })
}

export const multiSet = (keyValuePairs: string[][]): Promise<void> => {
  return postRequest({
    name: 'AsyncStorage.multiSet',
    data: {keyValuePairs},
  })
}

export const multiRemove = (keys: string[]): Promise<void> => {
  return postRequest({
    name: 'AsyncStorage.multiRemove',
    data: {keys},
  })
}

export const multiMerge = (keyValuePairs: string[][]): Promise<void> => {
  return postRequest({
    name: 'AsyncStorage.multiSet',
    data: {keyValuePairs},
  })
}
