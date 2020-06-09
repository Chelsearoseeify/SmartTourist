import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

const PlaceScreenButton = ({name, iconName, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Icon name={iconName} style={styles.buttonIconStyle} />
      <Text style={styles.textIconStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    width: 180,
  },
  buttonIconStyle: {
    color: Colors.blueTitleColor,
    fontSize: Style.iconSize + 10,
    paddingVertical: 10,
    paddingRight: 10,
  },
  textIconStyle: {color: Colors.blueTitleColor, fontSize: 15},
});

export default PlaceScreenButton;
