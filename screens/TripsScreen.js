import React from 'react';
import Colors from '../constants/Colors';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import HorizontalScrollView from '../components/HorizontalScrollView';
import CardTypes from '../constants/CardTypes';
import NavigationBackButton from './../components/Buttons/NavigationBackButton';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Style from '../constants/Style';

const TripsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationBackButton {...props} />
      <View style={styles.titleViewStyle}>
        <Header title={'Your next trip'} mapIcon={false} />
      </View>
      <View>
        <View style={styles.cardsContainerStyle}>
          <View style={styles.cardStyle}>
            <NewTripView />
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
  titleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
  },
  listViewStyle: {
    flex: 1,
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

export default TripsScreen;
