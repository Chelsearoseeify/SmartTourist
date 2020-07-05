import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView, Text, ScrollView} from 'react-native';
import HorizontalScrollView from '../components/HorizontalScrollView';
import NextTripCard from '../components/Cards/NextTripCard';
import BigListCard from '../components/Cards/ListCardCityBig';

import TopDestinations from '../containers/TopDestinations';
import BeautifulCities from '../containers/BeautifulCities';

import Header from '../components/Header';
import Style from '../constants/Style';

import {fetchCities} from '../store/actions/cities';

const TripsScreen = props => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const trips = useSelector(state => state.trips.userTrips);
  const cities = useSelector(state => state.cities.cachedCities);

  let missingCities = [];

  if (trips.length > 0) {
    trips.map(trip => {
      const foundCityIndex = cities.findIndex(c => c.id === trip.cityId);
      if (foundCityIndex === -1) {
        missingCities.push(trip.cityId);
      }
    });
  }

  const fetchCitiesData = useCallback(async () => {
    try {
      dispatch(fetchCities(missingCities));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (missingCities.length > 0) {
      fetchCitiesData().then(() => {});
    }
  }, [fetchCitiesData, fetchCities]);

  const onTripSelected = trip => {
    console.log(`Selected trip ${trip.name}`);
    props.navigation.navigate('TripDetailScreen', {
      tripId: trip.id,
    });
  };

  let nextTripComponent;

  if (trips.length === 0) {
    nextTripComponent = <Text>No trips</Text>;
  } else {
    const nextCity = cities.find(city => city.id === trips[0].cityId);
    nextTripComponent = (
      <View style={{padding: 20}}>
        <Text
          style={{
            color: Colors.greenTitleColor,
            fontWeight: 'bold',
            fontSize: Style.fontSize.h4,
          }}>
          Your next trip
        </Text>
        <View style={styles.tripContainer}>
          {nextCity ? (
            <NextTripCard
              tripName={trips[0].name}
              tripCity={nextCity}
              dateString={trips[0].getTripDateString()}
              onPress={() => onTripSelected(trips[0])}
            />
          ) : (
            <Text>You have no trips. Create one!</Text>
          )}
        </View>
      </View>
    );
  }

  let tripsHorizontal =
    trips.length > 1 ? (
      <View style={{marginVertical: 10, paddingLeft: 10}}>
        <HorizontalScrollView
          name={'All Trips'}
          paddingLeft={10}
          onMoreTap={() => {
            console.log('See all trips');
          }}>
          {trips.map(trip => {
            const city = cities.find(city => city.id === trip.cityId);
            return (
              <BigListCard
                name={trip.name}
                imageId={city ? city.photoUrl : ''}
                onPress={() => onTripSelected(trip)}
              />
            );
          })}
        </HorizontalScrollView>
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleViewStyle}>
          <Header title={'Your trips'} mapIcon={false} />
        </View>
        <View>
          <View style={styles.cardsContainerStyle}>
            <View style={[styles.cardStyle, Style.shadow, {height: '100%'}]}>
              {nextTripComponent}

              {tripsHorizontal}

              <View style={styles.listViewStyle}>
                <View>
                  <Text style={styles.subtitleStyle}>Suggestions</Text>
                </View>
                <View>
                  <TopDestinations />
                  <BeautifulCities />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const topSpace = 70;

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  cardsContainerStyle: {
    marginTop: topSpace,
    marginBottom: 30,
  },
  cardStyle: {
    borderRadius: Style.borderRadiusCardContainer,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  titleViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: topSpace,
    flex: 1,
    position: 'absolute',
  },
  listViewStyle: {
    marginTop: 10,
    marginBottom: 20,
  },
  subtitleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5,
    paddingLeft: 20,
  },
  tripContainer: {
    flex: 1,
    textAlign: 'center',
    color: Colors.blueTitleColor,
    height: 200,
  },
});

export default TripsScreen;
