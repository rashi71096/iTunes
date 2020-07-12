import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ScrollView,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import CardList from './CardList'
import axios from 'axios'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const MainScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setIsLoading] = useState(false)
  const [res, setRes] = useState(null)

  const callApi = (searchTerm) => {
    setIsLoading(true)
    axios
      .post(`https://itunes.apple.com/search?term=${searchTerm}`)
      .then((response) => {
        setIsLoading(false)
        setRes(response.data.results)
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        marginTop: 0.05 * height,
        padding: 0.1 * width,
      }}
    >
      <TextInput
        style={{ marginBottom: 0.05 * height }}
        label="Search"
        theme={{ colors: { primary: 'red' }, roundness: 5 }}
        mode="outlined"
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text)
        }}
      />

      <Button
        title="Search"
        disabled={searchTerm ? false : true}
        color="red"
        onPress={() => {
          callApi(searchTerm)
        }}
      />

      {res !== null || undefined ? (
        <ScrollView style={{ marginTop: 0.05 * height }}>
          {res.length > 0 ? (
            <>
              <Text
                style={{
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginBottom: 0.02 * height,
                }}
              >
                Results
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  borderWidth: 1,
                }}
              >
                <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>Artist Name</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>Collection Name</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>Track Name</Text>
                </View>
              </View>
              {res.map((entry) => (
                <CardList entry={entry} key={entry.trackId} />
              ))}
            </>
          ) : (
            <>
              <AntDesign
                name="exclamationcircleo"
                size={24}
                color="red"
                style={{ alignSelf: 'center', padding: 9 }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'red',
                }}
              >
                No results found!
              </Text>
            </>
          )}
        </ScrollView>
      ) : null}
    </View>
  )
}
export default MainScreen
