import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ScrollView,
} from 'react-native'
import { TextInput, ActivityIndicator } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import CardList from './CardList'
import axios from 'axios'
import COLORS from '../constants/colors'

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
        padding: 16,
      }}
    >
      <TextInput
        style={{ marginBottom: 0.05 * height }}
        label="Search"
        theme={{ colors: { primary: COLORS.RUST }, roundness: 5 }}
        mode="outlined"
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text)
        }}
      />

      <Button
        title="Search"
        disabled={searchTerm && !loading ? false : true}
        color={COLORS.RUST}
        onPress={() => {
          callApi(searchTerm)
        }}
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={COLORS.GREEN}
          style={{ padding: 25 }}
        />
      ) : res !== null || undefined ? (
        <ScrollView
          style={{ marginVertical: 0.05 * height }}
          showsVerticalScrollIndicator={false}
        >
          {res.length > 0 ? (
            <>
              <Text
                style={{
                  // fontWeight: 'bold',
                  alignSelf: 'center',
                  marginBottom: 0.02 * height,
                  // color: COLORS.GREEN,
                  // fontSize: 16,
                }}
              >
                Showing {res.length} Results for "{searchTerm}"
              </Text>

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
