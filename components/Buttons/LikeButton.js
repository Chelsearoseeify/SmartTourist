import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

const LikeButton = ({name, iconName, onPress}) => {
  return (
    <View
      style={{
        position: 'absolute',
        end: 5,
        zIndex: 2,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          margin: 10,
          padding: 8,
          backgroundColor: 'rgba(50, 120, 120, 0.5)',
          borderRadius: Style.borderRadiusRoundButton,
          height: 40,
          width: 40,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Icon name={iconName} size={Style.iconSize} color={'white'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LikeButton;
