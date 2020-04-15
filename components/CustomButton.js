import React, {Component} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Colors from '../constants/Colors';

const ButtonClickCheckFunction = () => {
  Alert.alert('Button Clicked');
};

const CustomButton = props => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={props.onPress}>
        <Text style={styles.TextStyle}> Add a new trip </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.greenButtonColor,
    borderRadius: 20,
    elevation: 6,
    width: '50%',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CustomButton;
