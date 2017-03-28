// @flow

import { postEvent, postRequest } from '../bridge'

export const getString = (): Promise<?string> => {
  return postRequest({
    name: 'Clipboard.getString',
  })
}

export const setString = (content: string) => {
  postEvent({
    name: 'Clipboard.setString',
    data: {content},
  })
}
