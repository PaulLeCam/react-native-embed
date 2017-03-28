// @flow

import { postRequest } from '../bridge'

export const sharedAction = 'sharedAction'

export const dismissedAction = 'dismissedAction'

type ShareResult = {
  action: sharedAction | dismissedAction,
  activityType?: ?string,
}

export const share = (content: Object, options?: ?Object): Promise<ShareResult> => {
  return postRequest({
    name: 'Share.share',
    data: {content, options},
  })
}
