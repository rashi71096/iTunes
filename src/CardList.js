import React from 'react'
import { Text, View, Dimensions, Button } from 'react-native'

const CardList = (props) => {
  const { entry } = props
  //   console.log(entry.trackId)
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', padding: 11 }}>
        <Text>{entry.artistName}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', padding: 11 }}>
        <Text>{entry.collectionName}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', padding: 11 }}>
        <Text>{entry.trackName}</Text>
      </View>
    </View>
  )
}
export default CardList
