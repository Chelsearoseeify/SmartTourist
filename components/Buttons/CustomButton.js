import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CustomButton = ({text, onPress, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.buttonStyle}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.greenButtonColor,
    borderRadius: Style.borderRadiusCard,
    justifyContent: 'center',
    alignItems: 'center',
    ...Style.shadow,
    marginHorizontal: 15,
    borderColor: Colors.greenButtonColor,
    borderWidth: 0,
    height: 40,
    /* opacity: disabled? 0.5:1, */
  },
});

export default CustomButton;
