// @flow

import { postRequest } from '../bridge'

export const canOpenURL = (url: string): Promise<boolean> => {
  return postRequest({
    name: 'Linking.canOpenURL',
    data: {url},
  })
}

export const getInitialURL = (): Promise<?string> => {
  return postRequest({
    name: 'Linking.getInitialURL',
  })
}

export const openURL = (url: string): Promise<void> => {
  return postRequest({
    name: 'Linking.openURL',
    data: {url},
  })
}
