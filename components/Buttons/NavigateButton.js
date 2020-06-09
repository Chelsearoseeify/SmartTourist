import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

const NavigateButton = ({name, iconName, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        margin: 5,
        padding: 8,
        borderRadius: Style.borderRadiusRoundButton,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        <Icon
          name={iconName}
          size={Style.iconSize + 4}
          color={Colors.greenButtonColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NavigateButton;
