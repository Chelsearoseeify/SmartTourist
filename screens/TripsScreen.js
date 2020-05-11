import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import HorizontalScrollView from '../components/HorizontalScrollView';
import CardTypes from '../constants/CardTypes';
import NextTripCard from '../components/Cards/NextTripCard';

import {
  fetchBeautifulCities,
  fetchTopDestinations,
} from '../store/actions/cities';

import Header from '../components/Header';
import Style from '../constants/Style';

const TripsScreen = props => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const trips = useSelector(state => state.trips.userTrips);
  const topDestinations = useSelector(state => state.cities.top_destinations);
  const beautifulCities = useSelector(state => state.cities.beautiful_cities);

  useEffect(() => {
    const loadBeautifulCities = async () => {
      try {
        await dispatch(fetchBeautifulCities());
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadBeautifulCities();
  }, [dispatch, fetchBeautifulCities]);

  useEffect(() => {
    const loadTopDestinations = async () => {
      try {
        await dispatch(fetchTopDestinations());
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadTopDestinations();
  }, [dispatch, fetchTopDestinations]);

  return (
    <SafeAreaView style={styles.container}>
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
            <View style={{marginVertical: 10}}>
              <HorizontalScrollView
                name={'All Trips'}
                cities={trips}
                elemType={CardTypes.LIST_CARD_BIG}
                navigation={props.navigation}
                paddingLeft={20}
                action={()=>{console.log('See all trips')}}
              />
            </View>
            <View style={styles.listViewStyle}>
              <View>
                <Text style={styles.subtitleStyle}>Suggestions</Text>
              </View>
              <View>
                <HorizontalScrollView
                  name={'Top destinations'}
                  cities={topDestinations}
                  elemType={CardTypes.LIST_CARD_BIG}
                  navigation={props.navigation}
                  paddingLeft={20}
                />
                <HorizontalScrollView
                  name={'Beautiful cities'}
                  cities={beautifulCities}
                  elemType={CardTypes.LIST_CARD_SMALL}
                  navigation={props.navigation}
                  paddingLeft={20}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
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
  titleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
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
