import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {View} from 'react-native';
import BackButton from '../components/BackButton';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const MapScreen = props => {
  return (
    <View style={{flex: 1}}>
      <View>
        <BackButton {...props} />
      </View>
      <MapView
        style={{height: '100%'}}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}
      />
    </View>
  );
};

export default MapScreen;
