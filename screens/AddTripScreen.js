import React, {Component} from 'react';
import {Layout, Text, Button, Input} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HorizontalScrollView from '../components/HorizontalScrollView';
import {CustomDatePicker} from './../components/DatePicker';
import CustomButton from '../components/CustomButton';
import CardTypes from '../constants/CardTypes';
import {CITIES} from '../data/dummy-data';
import BackButton from './../components/BackButton';
import {useSelector} from 'react-redux';

const NewTripView = () => {
  const [value, setValue] = React.useState('');
  return (
    <View style={styles.listViewStyle}>
      <View>
        <Text style={styles.subtitleStyle}>Create your trip</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          marginVertical: 10,
          width: '100%',
          alignContent: 'center',
        }}>
        <Input
          value={value}
          placeholder="Choose your trip name"
          onChangeText={nextValue => setValue(nextValue)}
          style={styles.inputStyle}
        />
        <Input
          value={value}
          placeholder="Choose your city"
          onChangeText={nextValue => setValue(nextValue)}
          style={styles.inputStyle}
        />
        <CustomDatePicker />
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          alignItems: 'flex-end',
        }}>
        <View style={{width: 150}}>
          <CustomButton text={'ADD'} />
        </View>
      </View>
    </View>
  );
};

const AddTripScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton {...props} />
      <View style={styles.titleViewStyle}>
        <Text category="h2" style={styles.titleStyle}>
          Your next trip
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainerStyle}>
            <View style={styles.cardStyle}>
              <NewTripView />
            </View>
            <View style={[styles.cardStyle, {height: '100%'}]}>
              <View style={styles.listViewStyle}>
                <View>
                  <Text style={styles.subtitleStyle}>Suggestions</Text>
                </View>
                <View style={{paddingLeft: 25, height: '100%'}}>
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
      </View>
    </SafeAreaView>
  );
};

const topSpace = 80;

let styles = StyleSheet.create({
  size: {height: 210, width: 200},
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  cardsContainerStyle: {
    marginTop: topSpace,
    marginBottom: 30,
  },
  cardStyle: {
    elevation: 10,
    borderRadius: 35,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  titleViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 25,
    paddingBottom: 10,
    height: topSpace,
    flex: 1,
    position: 'absolute',
  },
  titleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
  },
  listViewStyle: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 40,
  },
  inputStyle: {
    backgroundColor: Colors.inputBackgroundColor,
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: 20,
  },
  subtitleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
    fontSize: 28,
    paddingTop: 25,
    paddingStart: 5,
    marginHorizontal: 25,
    paddingBottom: 5,
  },
});

export default AddTripScreen;
