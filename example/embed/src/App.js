import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Embed from 'react-native-embed'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
})

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Embed
          ref={e => { this.embed = e }}
          onEvent={this.onEvent}
          source={{uri: 'http://localhost:7000'}}
        />
      </View>
    )
  }
}
