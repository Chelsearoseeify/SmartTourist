import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Style from '../constants/Style';
import Colors from '../constants/Colors';

const TripDay = props => {
  let component;

  if(props.placeIds && props.placeIds.length === 0){
    component = (
      <View style={{marginVertical: 20}}>
        <Text style={styles.emptyDayContainer}>There are no places added to this day, add places to see them here!</Text>
      </View>
    )
  } else{
    component = props.placeIds && props.placeIds.map(placeId => {
      const place = props.placesData.find(p => p.id == placeId);
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
        </View>)
    })
  }

  return (
    <View style={styles.container}>
      {component}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
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
  emptyDayContainer:{
    flex: 1,
    textAlign: "center",
    color: Colors.textAccentColor
  }
});

export default TripDay;