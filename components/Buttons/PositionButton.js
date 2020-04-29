import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Style from '../../constants/Style';
import Colors from './../../constants/Colors';

const PositionButton = ({onPress}) => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 2,
        bottom: 220,
        end: 0,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: 'rgba(123,228,149, 0.1)',
          borderRadius: Style.borderRadiusRoundButton,
          height: 50,
          width: 50,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Icon name="crosshairs" size={30} color={Colors.blueTitleColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PositionButton;
