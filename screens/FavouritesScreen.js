import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import GridView from './../components/GridView';
import {View, StyleSheet} from 'react-native';
import HorizontalScrolliew from '../components/HorizontalScrollView';
import {CITIES} from '../data/dummy-data';

const FavouriteScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 12,
          marginVertical: 10,
        }}>
        <Text
          category="h1"
          style={{color: Colors.blueTitleColor, fontWeight: 'bold'}}>
          Favourites
        </Text>
      </View>
      <View style={{margin: 10}}>
        <HorizontalScrolliew name={'Edinburgh'} cities={CITIES} />
        <HorizontalScrolliew name={'London'} cities={CITIES} />
        <HorizontalScrolliew name={'New York'} cities={CITIES} />
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroudColor,
    flex: 1,
    flexDirection: 'column',
  },
});

export default FavouriteScreen;
