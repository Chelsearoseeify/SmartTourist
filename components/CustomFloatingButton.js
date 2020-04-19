import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {StyleSheet, Text, View, Alert} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ButtonClickCheckFunction = () => {
  Alert.alert('Button Clicked');
};

const CustomFloatingButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.greenButtonColor,
        borderRadius: 35,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="plus" size={25} color={'white'} />
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
    borderRadius: 20,
    elevation: 10,
    height: 30,
    width: 30,
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CustomFloatingButton;
