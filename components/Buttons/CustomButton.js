import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CustomButton = ({text, onPress, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
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
        elevation: 2,
        /* opacity: disabled? 0.5:1, */
      }}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CustomButton;
