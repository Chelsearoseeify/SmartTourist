import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {View} from 'react-native';
import BackButton from '../components/BackButton';

const MapScreen = props => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
      <View>
        <BackButton {...props} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text category="h1">Map</Text>
      </View>
    </View>
  );
};

export default MapScreen;
