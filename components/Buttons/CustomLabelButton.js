import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CustomButton = ({text, toggleList}) => {
  const [buttonColor, setButtonColor] = useState('white');
  const [textColor, setTextColor] = useState(Colors.greenTitleColor);

  return (
    <TouchableOpacity
      onPress={() => {
        toggleList();
        if (buttonColor === 'white') {
          setTextColor('white');
          setButtonColor(Colors.greenTitleColor);
        } else {
          setTextColor(Colors.greenTitleColor);
          setButtonColor('white');
        }
      }}
      style={[
        {
          backgroundColor: buttonColor,
        },
        styles.buttonStyle,
      ]}>
      <Text style={{color: textColor, fontSize: 18}}>{text}</Text>
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
