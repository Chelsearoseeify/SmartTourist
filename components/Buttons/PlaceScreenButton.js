import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
    borderRadius: 18,
    backgroundColor: 'white',
    elevation: Style.elevation,
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 20,
  },
  buttonIconStyle: {
    color: Colors.blueTitleColor,
    fontSize: Style.iconSize + 5,
    paddingVertical: 4,
  },
  textIconStyle: {color: Colors.blueTitleColor, fontSize: 15},
});

export default PlaceScreenButton;
