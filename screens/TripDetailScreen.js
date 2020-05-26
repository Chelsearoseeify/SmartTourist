import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { View, StyleSheet, SafeAreaView, Text, ScrollView, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import TripDay from '../containers/TripDay';

import Header from '../components/Header';
import Style from '../constants/Style';
import Colors from '../constants/Colors';

const renderTripDay = (places) => (
  <TripDay places={places}/>
);

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.greenSubTitleColor }}
    indicatorContainerStyle={{alignItems: 'center'}}
    style={{ backgroundColor: 'white' }}
    inactiveColor={Colors.inactiveTabColor}
    activeColor={Colors.activeTabColor}
    renderLabel={renderLabel}
  />
);

const renderLabel = ({ route, focused, color }) => (
  <Text style={{ color }}>
    {route.title}
  </Text>
);

const initialLayout = { width: Dimensions.get('window').width };

const TripsScreen = props => {
  const tripId = props.route.params.tripId;
  const trips = useSelector(state => state.trips.userTrips);
  const trip = trips.find(t => t.id === tripId);
  const dateString = trip.getTripDateString();
  const numberOfDays = trip.numberOfDays();
  let tabRouteData = [];
  let sceneMapData = {};

  for (let i = 0; i < numberOfDays; i++) {
    tabRouteData.push({key: `key${i}`, title: `Day ${i+1}`});
    sceneMapData[`key${i}`] = () => renderTripDay(trip.places[i]);
  }

  const [index, setIndex] = useState(0)
  const [routes] = useState(tabRouteData);

  const renderScene = SceneMap(sceneMapData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleViewStyle}>
          <Header title={'Your trip'} mapIcon={false} />
        </View>
        <View>
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
              <View style={{flex: 1}}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const topSpace = 70;

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
});

export default TripsScreen;
