import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import HorizontalScrollView from '../components/HorizontalScrollView';
import NextTripCard from '../components/Cards/NextTripCard';
import BigListCard from '../components/Cards/ListCardCityBig';
import ButtonWithIcon from '../components/Buttons/ButtonWithIcon';

import TopDestinations from '../containers/TopDestinations';
import BeautifulCities from '../containers/BeautifulCities';

import Header from '../components/Header';
import Style from '../constants/Style';

import { fetchCities } from '../store/actions/cities';

import moment from 'moment';

const TripsScreen = props => {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips.userTrips);
  const cities = useSelector(state => state.cities.cachedCities);
  let closestTrip = null;
  let futureTrips = [];
  let pastTrips = [];

  let missingCities = [];
  const dateNow = moment().unix();
  console.log(dateNow);

  if (trips.length > 0) {
    trips.map(trip => {
      const foundCityIndex = cities.findIndex(c => c.id === trip.cityId);
      if (foundCityIndex === -1) {
        missingCities.push(trip.cityId);
      }
    });
  }

  if (trips.length > 0 && missingCities.length === 0) {
    trips.map(trip => {
      if (trip.startDate > dateNow) {
        console.log(`trip "${trip.name}" is in the future`);
        futureTrips.push(trip);
      } else {
        console.log(`trip "${trip.name}" is in the past`);
        pastTrips.push(trip);
      }
    })

    if (futureTrips.length > 0) {
      closestTrip = futureTrips[0];
    }
  }

  const fetchCitiesData = useCallback(async () => {
    try {
      dispatch(fetchCities(missingCities));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, trips]);

  useEffect(() => {
    if (missingCities.length > 0) {
      fetchCitiesData().then(() => { });
    }
  }, [fetchCitiesData, fetchCities, trips]);

  const onCreateTrip = () => {
    props.navigation.navigate('Plus');
  }

  const onTripSelected = trip => {
    console.log(`Selected trip ${trip.name}`);
    props.navigation.navigate('TripDetailScreen', {
      tripId: trip.id,
    });
  };

  let nextTripComponent;

  if (trips.length === 0) {
    nextTripComponent = <View style={{ alignItems: "center", paddingVertical: 20 }}>
      <Text>You have no trips. Create one!</Text>
      <ButtonWithIcon icon='plus' text='Create a trip' onPress={onCreateTrip} />
    </View>
  } else {
    const nextCity = cities.find(city => city.id === trips[0].cityId);
    nextTripComponent = (
      <View style={{ paddingHorizontal: 10, paddingVertical: 30 }}>
        <Text
          style={{
            color: Colors.greenTitleColor,
            fontWeight: 'bold',
            fontSize: Style.fontSize.h4,
          }}>
          Your next trip
        </Text>
        <View style={styles.tripContainer}>
          {closestTrip ? (
            <NextTripCard
              tripName={closestTrip.name}
              tripCity={nextCity}
              dateString={closestTrip.getTripDateString()}
              onPress={() => onTripSelected(closestTrip)}
            />
          ) : (
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <Text>You have no incoming trips. Create one!</Text>
                <ButtonWithIcon icon='plus' text='Create a trip' onPress={onCreateTrip} />
              </View>
            )}
        </View>
      </View>
    );
  }

  let futureTripsHorizontal =
    futureTrips.length > 1 ? (
      <HorizontalScrollView
        name={'Future Trips'}
        paddingLeft={10}
        isThereMore={false}
        onMoreTap={() => {
          console.log('See all trips');
        }}>
        {futureTrips.map(trip => {
          const city = cities.find(city => city.id === trip.cityId);

          if (trip.id === closestTrip.id)
            return;

          return (
            <BigListCard
              name={trip.name}
              subTitle={trip.getTripDateString()}
              imageId={city ? city.photoUrl : ''}
              onPress={() => onTripSelected(trip)}
            />
          );
        })}
      </HorizontalScrollView>
    ) : null;

  let pastTripsHorizontal =
    pastTrips.length > 0 ? (
      <HorizontalScrollView
        name={'Past Trips'}
        paddingLeft={10}
        isThereMore={false}
        onMoreTap={() => {
          console.log('See all trips');
        }}>
        {
          pastTrips.map(trip => {
            const city = cities.find(city => city.id === trip.cityId);

            return (
              <BigListCard
                name={trip.name}
                subTitle={trip.getTripMonthString()}
                imageId={city ? city.photoUrl : ''}
                onPress={() => onTripSelected(trip)}
              />
            );
          })
        }
      </HorizontalScrollView >
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleViewStyle}>
          <Header title={'Your trips'} mapIcon={false} />
        </View>
        <View>
          <View style={styles.cardsContainerStyle}>
            <View style={[styles.cardStyle, Style.shadow, { height: '100%' }]}>
              {nextTripComponent}
              {futureTripsHorizontal}
              {pastTripsHorizontal}
              <View style={styles.listViewStyle}>
                <Text style={styles.subtitleStyle}>Suggestions</Text>
                <TopDestinations />
                <BeautifulCities />
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
    marginBottom: 20
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
