import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {StyleSheet, Text, View, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CustomButton = ({text, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.greenButtonColor,
        borderRadius: Style.borderRadiusCard,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        borderColor: Colors.greenButtonColor,
        borderWidth: 0,
        height: 45,
      }}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 5,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.greenButtonColor,
    borderRadius: Style.borderRadiusCard,
    elevation: Style.elevation,
    height: 30,
    width: 30,
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: Style.fontSize.h6,
  },
});

export default CustomButton;