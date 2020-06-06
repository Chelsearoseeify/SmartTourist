import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CustomButton = ({text, toggleList, active}) => {
  const [buttonColor, setButtonColor] = useState(
    active ? Colors.greenTitleColor : Colors.backgroundColor,
  );
  const [textColor, setTextColor] = useState(
    active ? Colors.backgroundColor : Colors.greenTitleColor,
  );

  return (
    <TouchableOpacity
      onPress={() => {
        toggleList();
        if (buttonColor === Colors.backgroundColor) {
          setTextColor(Colors.backgroundColor);
          setButtonColor(Colors.greenTitleColor);
          active = true;
        } else {
          setTextColor(Colors.greenTitleColor);
          setButtonColor(Colors.backgroundColor);
          active = false;
        }
      }}
      style={[
        {
          backgroundColor: buttonColor,
        },
        styles.buttonStyle,
      ]}>
      <Text style={{color: textColor, fontSize: Style.fontSize.h6}}>
        {text}
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
