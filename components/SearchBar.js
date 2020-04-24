import React, {Component} from 'react';
import {Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const SearchBar = () => {
  const [value, setValue] = React.useState('');

  const renderIcon = () => <Icon style={styles.iconStyle} name="search" />;

  return (
    <Input
      value={value}
      placeholder="What are you looking for?"
      icon={renderIcon}
      onChangeText={setValue}
      style={styles.inputStyle}
    />
  );
};

let styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 0,
    elevation: Style.elevation,
    borderRadius: Style.borderRadiusCardContainer,
  },
  iconStyle: {
    color: Colors.blueTitleColor,
    fontSize: Style.inputIconSize,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default SearchBar;
