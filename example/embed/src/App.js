import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Embed from 'react-native-embed'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
})

export default class App extends Component {
  state = {
    display: false,
  }

  onPress = () => {
    this.setState({ display: true })
  }

  render() {
    const display = this.state.display
      ? <Embed
          ref={e => {
            this.embed = e
          }}
          onEvent={this.onEvent}
          source={{ uri: 'http://localhost:3001' }}
        />
      : <Button onPress={this.onPress} title="Press me" />

    return (
      <View style={styles.container}>
        {display}
      </View>
    )
  }
}
