import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Style from '../constants/Style';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';

import { removePlaceFromTrip } from '../store/actions/trips';

const tripPlace = (place, navigation, onRemovePlace, isEditing) => {
  const type = place.types.slice(-1);

  return (
    <View>
      {isEditing &&
        <View style={styles.deleteIconContainer}>
          <Icon
            style={styles.deleteIcon}
            name="close"
            onPress={() => {
              onRemovePlace(place.id)
            }}
          />
        </View>}
      <TouchableOpacity
        style={styles.placeCard}
        onPress={() => navigation.navigate('Place', {
          id: place.id,
          placeName: place.name,
          cityName: place.cityId,
          cityId: place.cityId,
        })}>
        <View style={styles.detailContainer}>
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.placeType}>{type}</Text>
        </View>

        {place.photoUrl !== '' &&
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: place.photoUrl,
              }}
              style={styles.imageStyle}
            />
          </View>
        }
      </TouchableOpacity>
    </View>
  );
};

const TripDay = props => {
  let component;
  const dispatch = useDispatch();

  const onRemovePlace = placeId => {
    dispatch(removePlaceFromTrip(props.tripId, props.dayIndex, placeId))
  }

  if (props.placeIds && props.placeIds.length === 0) {
    component = (
      <View style={{ padding: 40, flex: 1 }}>
        <Text style={styles.emptyDayContainer}>
          There are no places added to this day, add places to see them here!
        </Text>
      </View>
    );
  } else {
    const places = props.placeIds.map(placeId => {
      return props.placesData.find(p => p.id == placeId);
    });
    component = places.length > 0 && (
      <FlatList
        data={places}
        renderItem={({ item }) => tripPlace(item, props.navigation, onRemovePlace, props.isEditing)}
        keyExtractor={item => item.id}
        style={{ paddingVertical: 20 }}
      />
    );
  }

  return <View style={styles.container}>{component}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeName: {
    fontSize: Style.fontSize.h6,
    marginBottom: 10,
  },
  placeType: {
    color: Colors.textAccentColor,
  },
  placeCard: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    height: 120,
    flexDirection: 'row',
    marginBottom: 20,
    ...Style.shadow,
  },
  imageStyle: {
    height: '100%',
    width: 100,
    borderRadius: 15,
  },
  detailContainer: {
    width: '50%',
  },
  imageContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  emptyDayContainer: {
    flex: 1,
    textAlign: 'center',
  },
  deleteIconContainer: {
    padding: 0,
    alignItems: 'flex-end',
    marginHorizontal: 15,
    marginTop: -5,
  },
  deleteIcon: {
    fontSize: Style.iconSize,
    color: Colors.blueTitleColor,
  },
});

export default TripDay;
