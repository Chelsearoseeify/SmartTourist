import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({ text, onPress, disabled }) => {
  const buttonContent = disabled
    ? <View style={[styles.buttonStyle, styles.disabledStyle]}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
        {text}
      </Text>
    </View>
    : <LinearGradient
      colors={['transparent', Colors.greenTitleColor]}
      start={{ x: 0.2, y: 0.6 }}
      end={{ x: 0.7, y: 1 }}
      locations={[0, 0.6]}
      style={styles.buttonStyle}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
        {text}
      </Text>
    </LinearGradient>

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      {buttonContent}
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
    borderColor: Colors.greenButtonColor,
    borderWidth: 0,
    height: 40,
  },
  disabledStyle: {
    backgroundColor: Colors.inactiveTabColor
  }
});

export default CustomButton;
