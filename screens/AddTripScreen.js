import React from 'react';
import {useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import AddTrip from '../components/AddTrip';
import Style from '../constants/Style';
import moment from 'moment';

import TopDestinations from '../containers/TopDestinations';
import BeautifulCities from '../containers/BeautifulCities';
import {setSelectedCity} from './../store/actions/cities';
import {v4 as uuidv4} from 'react-native-uuid';

const AddTripScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
        <View>
          <View
            style={{
              ...styles.cardStyle,
              paddingHorizontal: 20,
              marginVertical: 10,
            }}>
            <AddTrip navigation={props.navigation} />
            {/* {trips && trips.map((trip) => {
              return <View>
                <Text>{trip.city}</Text>
                <Text>{trip.name}</Text>
                <Text>{moment.unix(trip.startDate).format('LL')}</Text>
                <Text>{moment.unix(trip.endDate).format('LL')}</Text>
              </View>
            })} */}
          </View>
          <View style={{...styles.cardStyle, height: '100%'}}>
            <View style={styles.listViewStyle}>
              <View>
                <Text style={styles.subtitleStyle}>Suggestions</Text>
              </View>
              <View style={{height: '100%'}}>
                <TopDestinations {...props.navigation} />
                <BeautifulCities
                  {...props.navigation}
                  onCitySelected={city => {
                    dispatch(setSelectedCity(city.id, uuidv4()));
                    props.navigation.navigate('Travel', city);
                  }}
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  cardStyle: {
    borderRadius: Style.borderRadiusCardContainer,
    backgroundColor: 'white',
    paddingVertical: 30,
    ...Style.shadow,
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
    marginBottom: 5,
    paddingStart: 5,
    marginHorizontal: 15,
    paddingBottom: 5,
  },
});

export default AddTripScreen;
