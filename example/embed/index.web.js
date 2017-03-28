import React from 'react'
import { render } from 'react-native-electron'

import App from './src/App'

import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf'
const reactNativeVectorIconsRequiredStyles = `@font-face {
  src: url(${materialIcons});
  font-family: MaterialIcons;
}`

const style = document.createElement('style')
style.type = 'text/css'
if (style.styleSheet){
  style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles
} else {
  style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles))
}

document.head.appendChild(style)

render(<App />, document.getElementById('app'))
