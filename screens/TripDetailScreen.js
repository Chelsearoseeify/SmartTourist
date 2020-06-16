import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, StyleSheet, SafeAreaView, Text, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TripDay from '../containers/TripDay';

import { fetchMultiplePlaces } from '../store/actions/places';
import { fetchCities } from '../store/actions/cities';

import Header from '../components/Header';
import Style from '../constants/Style';
import Colors from '../constants/Colors';

const renderTripDay = (placeIds, placesData) => (
  <View style={{ flex: 1 }}>
    <TripDay placeIds={placeIds} placesData={placesData} />
  </View>

);

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.greenSubTitleColor }}
    indicatorContainerStyle={{ alignItems: 'center' }}
    style={{ backgroundColor: 'white' }}
    inactiveColor={Colors.inactiveTabColor}
    activeColor={Colors.activeTabColor}
    renderLabel={renderLabel}
  />
);

const renderLabel = ({ route, color }) => (
  <Text style={{ color }}>
    {route.title}
  </Text>
);

const initialLayout = { width: Dimensions.get('window').width };

const TripDetailScreen = props => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const trips = useSelector(state => state.trips.userTrips);
  const trip = trips.find(t => t.id === tripId);
  const places = useSelector(state => state.places.cachedPlaces);
  const cities = useSelector(state => state.cities.cachedCities);
  const tripCity = cities.find(c => c.id === trip.cityId);
  const dateString = trip.getTripDateString();
  const numberOfDays = trip.numberOfDays();
  let tabRouteData = [];
  let sceneMapData = {};
  let missingPlaceIds = [];
  let placesData = [];
  //console.log(places.length);

  if (trip.placeIds.length > 0) {
    trip.placeIds.map((ids, index) => {
      if (ids.length > 0) {
        //console.log(`index: ${index}`);
        ids.map(id => {
          const foundIndex = places.findIndex(p => p.id === id);
          if (foundIndex === -1) {
            //console.log('place not found');
            missingPlaceIds.push(id);
          } else {
            //console.log('place found');
            placesData.push(places[foundIndex]);
          }
        })
      }
    })
  }

  const loadMissingPlaces = useCallback(async () => {
    try {
      dispatch(fetchMultiplePlaces(missingPlaceIds));
    } catch (error) {
      console.log(error);
    }
  }, [fetchMultiplePlaces, dispatch]);

  const fetchCityData = useCallback(async () => {
    try {
      dispatch(fetchCities([trip.cityId]));
    } catch (error) {
      console.log(error);
    }
  }, [fetchMultiplePlaces, dispatch]);

  useEffect(() => {
    if (missingPlaceIds.length > 0) {
      console.log('missing place ids!');
      loadMissingPlaces().then(() => {
      });
    }

    const foundCityIndex = cities.findIndex(c => c.id === trip.cityId);
    if (foundCityIndex === -1) {
      fetchCityData().then(() => {
      });
    }

  }, [loadMissingPlaces, fetchMultiplePlaces, fetchCities, fetchCityData]);

  for (let i = 0; i < numberOfDays; i++) {
    tabRouteData.push({ key: `key${i}`, title: `Day ${i + 1}` });
    sceneMapData[`key${i}`] = () => renderTripDay(trip.placeIds[i], placesData);
  }

  const [index, setIndex] = useState(0)
  const [routes] = useState(tabRouteData);

  const renderScene = SceneMap(sceneMapData);

  return (
    <View style={styles.container}>
      {tripCity && <View style={{ height: 300 }}>
        <ImageBackground
          source={{ uri: tripCity.photoUrl }}
          style={styles.imageBackgroundStyle}
          resizeMode="cover"
        />
      </View>}
      <View style={styles.titleViewStyle}>
        <Text
          style={{
            color: "white",
            fontWeight: 'bold',
            fontSize: Style.fontSize.h1,
            padding: 20
          }}>
          {tripCity.name}
        </Text>
      </View>
      <View style={styles.cardsContainerStyle}>
        <View style={[styles.cardStyle, { flex: 1 }]}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.tripNameStyle}>
              {trip.name}
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.tripDatesStyle}>
              {dateString}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TabView
              renderTabBar={renderTabBar}
              renderLabel={renderLabel}
              inactiveColor="red"
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const topSpace = 250;

let styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  cardsContainerStyle: {
    flex: 1,
  },
  cardStyle: {
    elevation: Style.elevation,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    backgroundColor: 'white',
    marginTop: -60
  },
  titleViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: topSpace,
    flex: 1,
    position: 'absolute',
  },
  tripNameStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h5,
    textAlign: 'center'
  },
  tripDatesStyle: {
    color: Colors.greenTitleColor,
    fontSize: Style.fontSize.h6,
    textAlign: 'center'
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
});

export default TripDetailScreen;
