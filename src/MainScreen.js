import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { TextInput, Appbar, Button } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import CardList from './CardList'
import axios from 'axios'
import COLORS from '../constants/colors'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0.02 * height,
    padding: 16,
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
    <>
      <Appbar.Header theme={{ colors: { primary: COLORS.RUST } }}>
        <Appbar.Action icon="magnify" />
        <Appbar.Content title="Songs" subtitle="Search Track" />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          style={{ marginBottom: 0.02 * height }}
          label="Search"
          theme={{ colors: { primary: COLORS.RUST }, roundness: 5 }}
          mode="outlined"
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text)
          }}
        />
        <Button
          icon="magnify"
          theme={{ colors: { primary: COLORS.RUST }, roundness: 5 }}
          loading={loading}
          mode="text"
          disabled={searchTerm && !loading ? false : true}
          onPress={() => {
            callApi(searchTerm)
          }}
        >
          Search
        </Button>
        {loading ? (
          <>
            <AntDesign
              name="hourglass"
              size={24}
              color={COLORS.PERFECT_GREY}
              style={{ alignSelf: 'center', padding: 11 }}
            />

            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: COLORS.PERFECT_GREY,
              }}
            >
              Please Wait!
            </Text>
          </>
        ) : res !== null || undefined ? (
          <ScrollView
            style={{ marginVertical: 0.05 * height }}
            showsVerticalScrollIndicator={false}
          >
            {res.length > 0 ? (
              <>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginBottom: 0.02 * height,
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
                  color={COLORS.ERROR_MESSAGE}
                  style={{ alignSelf: 'center', padding: 9 }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: COLORS.ERROR_MESSAGE,
                  }}
                >
                  No results found!
                </Text>
              </>
            )}
          </ScrollView>
        ) : null}
      </View>
    </>
  )
}
export default MainScreen
