import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native-embedded'

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

class App extends Component {
  onPress () {
    Alert.alert('Hello native alert!')
  }

  render () {
    return (
      <View>
        <Button onPress={this.onPress} title='Hello world!' />
      </View>
    )
  }
}

AppRegistry.registerComponent('EmbeddedApp', () => App)
AppRegistry.runApplication('EmbeddedApp', {
  rootTag: document.getElementById('app')
})
