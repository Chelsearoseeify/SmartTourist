import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Style from '../constants/Style';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';

const tripPlace = place => {
  const type = place.types.slice(-1);
  return (
    <View style={styles.placeCard}>
      <View style={styles.detailContainer}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text style={styles.placeType}>{type}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: place.photoUrl,
          }}
          style={styles.imageStyle}>
        </Image>
      </View>
    </View>
  );
}

const TripDay = props => {
  let component;

  if (props.placeIds && props.placeIds.length === 0) {
    component = (
      <View style={{ padding: 40, flex: 1 }}>
        <Text style={styles.emptyDayContainer}>There are no places added to this day, add places to see them here!</Text>
      </View>
    )
  } else {
    const places = props.placeIds.map(placeId => {
      return props.placesData.find(p => p.id == placeId);
    });
    component = places.length > 0 &&
      <FlatList
        data={places}
        renderItem={({ item }) => tripPlace(item)}
        keyExtractor={item => item.id}
        style={{ paddingVertical: 20 }}
      />
  }

  return (
    <View style={styles.container}>
      {component}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  placeName: {
    fontSize: Style.fontSize.h6,
    marginBottom: 10
  },
  placeType: {
    color: Colors.textAccentColor
  },
  placeCard: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 15,
    height: 120,
    flexDirection: "row",
    marginBottom: 20
  },
  imageStyle: {
    height: '100%',
    width: 100,
    borderRadius: 10
  },
  detailContainer: {
    width: '50%'
  },
  imageContainer: {
    width: '50%',
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  emptyDayContainer: {
    flex: 1,
    textAlign: "center",
  }
});

export default TripDay;