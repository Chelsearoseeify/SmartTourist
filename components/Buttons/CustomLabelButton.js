import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CustomButton = ({name, toggleType, buttonStyle}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        toggleType();
      }}
      style={[
        {
          backgroundColor: buttonStyle.buttonColor,
          ...Style.shadow,
        },
        styles.buttonStyle,
      ]}>
      <Text style={{color: buttonStyle.textColor, fontSize: Style.fontSize.h6}}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: Style.borderRadiusCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingBottom: 3,
    margin: 2,
    borderColor: Colors.greenTitleColor,
    borderWidth: 2,
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: Style.fontSize.h6,
  },
});

export default CustomButton;
