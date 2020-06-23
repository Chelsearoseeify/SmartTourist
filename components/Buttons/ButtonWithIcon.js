import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const ButtonWithIcon = props => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <View style={styles.buttonInnerStyle}>
        <Icon name={props.icon} style={styles.iconStyle} />
        <View style={{paddingLeft: '10%'}}>
          <Text style={{color: Colors.greenTitleColor}}>{props.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 15,
    ...Style.shadow,
  },
  buttonInnerStyle: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  iconStyle: {
    fontSize: Style.iconSize,
  },
});

export default ButtonWithIcon;
