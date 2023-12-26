import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ArtistCard = ({item}) => {
  return (
    <View style={{margin: 15}}>
      <Image style={{width: 150, height: 150, borderRadius: 5}} source={{uri:item.images[0].url}}/>
      <Text style={styles.color}>{item.name}</Text>
    </View>
  )
}

export default ArtistCard

const styles = StyleSheet.create({
    color: {
        color: 'white',
        fontSize: 13,
        fontWeight: 500,
        marginTop: 10
    }
})