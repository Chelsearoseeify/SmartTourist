import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import HorizontalScrollView from '../components/HorizontalScrollView';
import NextTripCard from '../components/Cards/NextTripCard';
import BigListCard from '../components/Cards/ListCardCityBig';

import TopDestinations from '../containers/TopDestinations';
import BeautifulCities from '../containers/BeautifulCities';

import Header from '../components/Header';
import Style from '../constants/Style';

const TripsScreen = props => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const trips = useSelector(state => state.trips.userTrips);
  console.log(trips);

  const onTripSelected = (trip) =>{
    console.log(`Selected trip ${trip.name}`);
    props.navigation.navigate('TripDetailScreen', {
      tripId: trip.id
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleViewStyle}>
          <Header title={'Your trips'} mapIcon={false} />
        </View>
        <View>
          <View style={styles.cardsContainerStyle}>
            <View style={[styles.cardStyle, { height: '100%' }]}>
              <View style={{ padding: 20 }}>
                <Text style={{
                  color: Colors.greenTitleColor,
                  fontWeight: 'bold',
                  fontSize: Style.fontSize.h4,
                }}
                >
                  Your next trip
                </Text>
                <NextTripCard />
              </View>
              <View style={{ marginVertical: 10 }}>
                <HorizontalScrollView
                  name={'All Trips'}
                  paddingLeft={20}
                  onMoreTap={() => { console.log('See all trips') }}
                >
                  {trips.map(trip => {
                    return <BigListCard
                      name={trip.name}
                      onPress={() => onTripSelected(trip)}
                    />
                  })}
                </HorizontalScrollView>
              </View>
              <View style={styles.listViewStyle}>
                <View>
                  <Text style={styles.subtitleStyle}>Suggestions</Text>
                </View>
                <View>
                  <TopDestinations/>
                  <BeautifulCities/>
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
    elevation: Style.elevation,
    borderRadius: Style.borderRadiusCardContainer,
    backgroundColor: 'white',
    marginVertical: 5
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
    paddingLeft: 20
  }
});

export default TripsScreen;
