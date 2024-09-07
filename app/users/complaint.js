import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  text:{
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    marginTop: '100%'
  }
})