import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {StyleSheet, Text, View, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../constants/Style';

const ButtonClickCheckFunction = () => {
  Alert.alert('Button Clicked');
};

const CustomFloatingButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.greenButtonColor,
        borderRadius: Style.borderRadiusRoundButton,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="plus" size={Style.iconSize} color={'white'} />
    </TouchableOpacity>
  );
};

export default CustomFloatingButton;
