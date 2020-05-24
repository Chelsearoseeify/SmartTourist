import React from 'react';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Header from '../components/Header';
import Style from '../constants/Style';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const TripsScreen = props => {
  const tripId = props.route.params.tripId;
  const trips = useSelector(state => state.trips.userTrips);
  const trip = trips.find(t => t.id === tripId);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleViewStyle}>
          <Header title={'Your trip'} mapIcon={false} />
        </View>
        <View>
          <View style={styles.cardsContainerStyle}>
            <View style={[styles.cardStyle, { height: '100%' }]}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={styles.tripNameStyle}>
                  {trip.name}
                </Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text style={styles.tripDatesStyle}>
                  May 16 - 18 2019
                </Text>
              </View>
              <View style={{flex: 1}}>
                <TabView
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
