import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'



const TextInputExample = () => {
    const [text, onChangeText] = React.useState('useless placeholder');
}

const Search = () => {
  return (
    <LinearGradient colors={['rgba(19, 22, 36, 1)', 'rgba(29, 185, 84, 1)']} style={{backgroundColor: 'black', flex: 1}} 
    start={{x: 1, y: 0}} end={{x: 0, y: 1}}>
      <SafeAreaView>
        <View style={{marginTop: 30, marginLeft: 10}}>
          <Text style={{color: 'white', fontSize: 20}}>
            Search
          </Text>
        </View>
        <TextInput 
            style={styles.input}
            value='Search'
        />
      </SafeAreaView>
    </LinearGradient>
    
  )
}

export default Search

const styles = StyleSheet.create ({
    navlogo: {
      width: 24,
      height: 24
  },
  input: {
    marginTop: 30,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    borderColor: '#C0C0C0',
    color:'#C0C0C0'
  }
})
