import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CustomButton = ({
  text,
  color: activeColor = Colors.greenTitleColor,
  disabledColor = Colors.greenSubTitleColor,
  toggleList,
}) => {
  const [color, setColor] = useState(activeColor);
  return (
    <TouchableOpacity
      onPress={() => {
        toggleList();
        if (color === activeColor) setColor(disabledColor);
        else setColor(activeColor);
      }}
      style={[
        {
          backgroundColor: color,
          borderColor: color,
        },
        styles.buttonStyle,
      ]}>
      <Text style={{color: 'white', fontSize: 18}}>{text}</Text>
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
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: Style.fontSize.h6,
  },
});

export default CustomButton;
