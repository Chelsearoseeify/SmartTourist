import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

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
          backgroundColor: 'rgba(123,228,149, 0.1)',
          borderRadius: Style.borderRadiusRoundButton,
          height: 40,
          width: 40,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            name="arrow-left"
            size={Style.iconSize}
            color={Colors.blueTitleColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
