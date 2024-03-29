import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import TripDay from '../containers/TripDay';
import ButtonWithIcon from '../components/Buttons/ButtonWithIcon';
import BackButton from '../components/Buttons/BackButton';

import { getPlacesDetails } from '../store/actions/places';
import { fetchCities } from '../store/actions/cities';

//import RNColorThief from 'react-native-color-thief';
import Style from '../constants/Style';
import Colors from '../constants/Colors';

const renderTripDay = (placeIds, placesData, navigation, dayIndex, tripId, isEditing, tripCity) => (
  <View style={{ flex: 1 }}>
    <TripDay
      placeIds={placeIds}
      placesData={placesData}
      navigation={navigation}
      dayIndex={dayIndex}
      tripId={tripId}
      isEditing={isEditing}
      tripCity={tripCity}
    />
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
  <Text style={{ color }}>{route.title}</Text>
);

const initialLayout = { width: Dimensions.get('window').width };

const TripDetailScreen = props => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const trips = useSelector(state => state.trips.userTrips);
  const trip = trips.find(t => t.id === tripId);
  const places = useSelector(state => state.places.cachedPlaces);
  const cities = useSelector(state => state.cities.cachedCities);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [isEditing, setIsEditing] = useState(false);
  const tripCity = cities.find(c => c.id === trip.cityId);
  console.log(tripCity);
  const dateString = trip.getTripDateString();
  const numberOfDays = trip.numberOfDays();
  let tabRouteData = [];
  let sceneMapData = {};
  let missingPlaceIds = [];
  let placesData = [];
  //console.log(places.length);

  useEffect(() => {
    const stealColor = async () => {
      //let colors = await RNColorThief.getColor(tripCity.photoUrl, 500, true);
      //setBackgroundColor(`rgb(${colors.r}, ${colors.g}, ${colors.b})`);
    };
    stealColor();
  });

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
        });
      }
    });
  }

  const loadMissingPlaces = useCallback(async () => {
    try {
      dispatch(getPlacesDetails(missingPlaceIds, trip.cityId));
    } catch (error) {
      console.log(error);
    }
  }, [getPlacesDetails, dispatch]);

  const fetchCityData = useCallback(async () => {
    try {
      dispatch(fetchCities([trip.cityId]));
    } catch (error) {
      console.log(error);
    }
  }, [getPlacesDetails, dispatch]);

  useEffect(() => {
    if (missingPlaceIds.length > 0) {
      console.log('missing place ids!');
      loadMissingPlaces().then(() => { });
    }

    const foundCityIndex = cities.findIndex(c => c.id === trip.cityId);
    if (foundCityIndex === -1) {
      fetchCityData().then(() => { });
    }
  }, [loadMissingPlaces, getPlacesDetails, fetchCities, fetchCityData]);

  for (let i = 0; i < numberOfDays; i++) {
    tabRouteData.push({ key: `key${i}`, title: `Day ${i + 1}` });
    sceneMapData[`key${i}`] = () => renderTripDay(trip.placeIds[i], placesData, props.navigation, i, tripId, isEditing, tripCity);
  }

  const [index, setIndex] = useState(0);
  const [routes] = useState(tabRouteData);

  const renderScene = SceneMap(sceneMapData);

  return (
    <View style={styles.container}>
      <BackButton navigation={props.navigation} />
      {tripCity && (
        <View style={{ height: 300 }}>
          <ImageBackground
            source={{ uri: tripCity.photoUrl }}
            style={styles.imageBackgroundStyle}
            resizeMode="cover">
            <LinearGradient
              colors={['transparent', backgroundColor]}
              start={{ x: 0.8, y: 0.4 }}
              end={{ x: 0.72, y: 1.0 }}
              locations={[0.1, 0.8]}
              style={{ height: '100%' }}>
              {/* <View
                style={{
                  height: 240,
                  flexDirection: 'column-reverse',
                  paddingStart: Style.paddingCard,
                  paddingBottom: Style.paddingCard,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: Style.fontSize.h2,
                    marginLeft: Style.marginTopCardContainer,
                  }}>
                  {tripCity.name}
                </Text>
              </View> */}
            </LinearGradient>
          </ImageBackground>
        </View>
      )}
      <View style={styles.cardsContainerStyle}>
        <View style={[styles.cardStyle, Style.shadow, { flex: 1 }]}>
          <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 20 }}>
            <View style={{ flex: 1 }}>
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.tripNameStyle}>{trip.name}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="city-variant" style={styles.iconStyle} />
                <Text style={styles.tripDatesStyle}>{tripCity.name}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="calendar" style={styles.iconStyle} />
                <Text style={styles.tripDatesStyle}>{dateString}</Text>
              </View>
              {trip.placeIds[index].length > 0 &&
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    isEditing ? setIsEditing(false) : setIsEditing(true);
                  }}
                >
                  <View style={styles.iconViewStyle}>
                    <Icon
                      style={styles.editIcon}
                      name="pencil"
                    />
                  </View>
                  <Text style={styles.tripDatesStyle}>Edit Places</Text>
                </TouchableOpacity>
              }

            </View>

            {trip.placeIds[index].length > 0 &&
              <View style={{ width: '45%', alignItems: "center" }}>
                <Text style={styles.directionsTitle}>Directions</Text>
                <ButtonWithIcon
                  icon="car"
                  text="Driving"
                  onPress={() => {
                    props.navigation.navigate('TripDayMap', {
                      mapData: {
                        city: tripCity,
                        placeIds: trip.placeIds[index],
                        directionMode: 'driving',
                        navigation: props.navigation
                      }
                    })
                  }}
                />
                <ButtonWithIcon
                icon="walk"
                text="Walking"
                onPress={() => {
                  props.navigation.navigate('TripDayMap', {
                    mapData: {
                      city: tripCity,
                      placeIds: trip.placeIds[index],
                      directionMode: 'walking',
                      navigation: props.navigation
                    }
                  })
                }}
              />
              </View>
            }
          </View>
          {missingPlaceIds.length === 0 &&
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
          }
        </View>
      </View>
    </View>
  );
};

const topSpace = 240;

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
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    backgroundColor: 'white',
    marginTop: -60,
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
    fontSize: Style.fontSize.h3,
  },
  tripDatesStyle: {
    color: Colors.blueTitleColor,
    fontSize: Style.fontSize.h6,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
  iconStyle: {
    fontSize: Style.iconSize,
    color: Colors.blueTitleColor,
    marginRight: 10,
    marginTop: 3
  },
  editIcon: {
    fontSize: Style.iconSize,
    marginRight: 10,
    color: Colors.blueTitleColor,
  },
  directionsTitle: {
    color: Colors.blueTitleColor,
    fontSize: Style.fontSize.h6,
    fontWeight: 'bold',
  }
});

export default TripDetailScreen;
