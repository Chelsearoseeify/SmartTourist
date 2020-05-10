import React from 'react';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import HorizontalScrollView from '../components/HorizontalScrollView';
import CardTypes from '../constants/CardTypes';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import AddTrip from '../components/AddTrip';
import Style from '../constants/Style';
import moment from 'moment';

const AddTripScreen = props => {
  const trips = useSelector(state => state.trips.userTrips);
  console.log(trips.length);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View>
          <View style={styles.cardStyle}>
            <AddTrip />
            {trips && trips.map((trip) => {
              return <View>
                <Text>{trip.city}</Text>
                <Text>{trip.name}</Text>
                <Text>{moment.unix(trip.startDate).format('LL')}</Text>
                <Text>{moment.unix(trip.endDate).format('LL')}</Text>
              </View>
            })}
          </View>
          <View style={[styles.cardStyle, { height: '100%' }]}>
            <View style={styles.listViewStyle}>
              <View>
                <Text style={styles.subtitleStyle}>Suggestions</Text>
              </View>
              <View style={{ paddingLeft: 25, height: '100%' }}>
                <HorizontalScrollView
                  name={'Top destinations'}
                  cities={useSelector(state => state.cities.top_destinations)}
                  elemType={CardTypes.LIST_CARD_BIG}
                  navigation={props.navigation}
                />
                <HorizontalScrollView
                  name={'Beautiful cities'}
                  cities={useSelector(state => state.cities.beautiful_cities)}
                  elemType={CardTypes.LIST_CARD_SMALL}
                  navigation={props.navigation}
                />
              </View>
            </View>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20
  },
  cardStyle: {
    elevation: Style.elevation,
    borderRadius: Style.borderRadiusCardContainer,
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 50
  },
  titleViewStyle: {
    flex: 1,
  },
  titleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
  },
  listViewStyle: {
    marginTop: 10,
    marginBottom: 20,
  },
  inputStyle: {
    backgroundColor: Colors.inputBackgroundColor,
    marginVertical: 5,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: 20,
  },
  subtitleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    marginBottom: 5,
    paddingStart: 5,
    marginHorizontal: 25,
    paddingBottom: 5,
  }
});

export default AddTripScreen;
