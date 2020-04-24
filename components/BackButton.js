import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Style from '../constants/Style';

const BackButton = ({navigation}) => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 2,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: Style.borderRadiusRoundButton,
          height: 40,
          width: 40,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Icon name="arrow-left" size={Style.iconSize} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
