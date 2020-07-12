import React from 'react'
import { Text, View, Dimensions, Button } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import COLORS from '../constants/colors'

const CardList = (props) => {
  const { entry } = props
  return (
    <Card
      style={{
        borderWidth: 0.5,
        borderColor: COLORS.PERFECT_GREY,
        borderRadius: 5,
        elevation: 7,
        marginVertical: 5,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Card.Cover
            source={{ uri: entry.artworkUrl100 }}
            style={{ height: 100, width: 100 }}
          />
        </View>
        <View style={{ marginStart: 11, flex: 3 }}>
          <Card.Content>
            <Title style={{ fontSize: 16 }}>{entry.trackName}</Title>
            <Paragraph>Artist: {entry.artistName}</Paragraph>
            <Paragraph>{entry.collectionName}</Paragraph>
          </Card.Content>
        </View>
      </View>
    </Card>
  )
}
export default CardList
