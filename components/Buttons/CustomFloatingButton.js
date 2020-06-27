import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {StyleSheet, Text, View, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../constants/Style';
import LinearGradient from 'react-native-linear-gradient';

const CustomFloatingButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{padding: 10}}>
      <LinearGradient
        colors={['transparent', Colors.greenTitleColor]}
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.3, y: 1.1}}
        locations={[0, 0.6]}
        style={{
          backgroundColor: Colors.greenButtonColor,
          borderRadius: Style.borderRadiusRoundButton,
          height: 60,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
          ...Style.shadow,
        }}>
        <Icon name="plus" size={Style.iconSize} color={'white'} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomFloatingButton;
