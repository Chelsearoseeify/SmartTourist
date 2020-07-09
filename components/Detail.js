import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const Detail = ({text, iconName}) => {
  return (
    <View style={styles.detailsStyle}>
      <Icon name={iconName} style={styles.detailsIconStyle} />
      <Text style={styles.detailsTextStyle}>{text ? text : '-'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsIconStyle: {
    color: Colors.greenTitleColor,
    marginTop: 2,
    marginRight: 10,
    fontSize: Style.inputIconSize,
  },
  detailsTextStyle: {color: Colors.blueTitleColor, fontSize: Style.fontSize.h6},
  detailsStyle: {flexDirection: 'row', marginVertical: 5},
});

export default Detail;
