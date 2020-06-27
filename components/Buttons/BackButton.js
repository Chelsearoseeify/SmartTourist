import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

const BackButton = ({navigation, onPress = () => {}}) => {
  return (
    <View
      style={{
        position: 'absolute',
        start: 5,
        zIndex: 2,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
          onPress();
        }}
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: 'rgba(32,80,114, 0.7)',
          borderRadius: Style.borderRadiusRoundButton,
          height: 40,
          width: 40,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Icon name="chevron-left" size={Style.iconSize} color={'white'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
