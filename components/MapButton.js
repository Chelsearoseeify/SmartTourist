import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Colors from '../constants/Colors';

const MapButton = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.pop();
      }}
      style={{margin: 10}}>
      <View>
        <Icon size={28} name="map-marker-alt" color={Colors.greenTitleColor} />
      </View>
    </TouchableOpacity>
  );
};

export default MapButton;
