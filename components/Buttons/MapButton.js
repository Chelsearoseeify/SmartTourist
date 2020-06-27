import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const MapButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Icon
          size={Style.iconSize}
          name="near-me"
          color={Colors.greenTitleColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MapButton;
