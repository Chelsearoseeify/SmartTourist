import React, {Component} from 'react';
import {Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const SearchBar = style => {
  const [value, setValue] = React.useState('');

  const renderIcon = () => <Icon style={styles.iconStyle} name="search" />;

  return (
    <View style={[style, {borderWidth: 1, marginHorizontal: 5, marginTop: 10}]}>
      <Input
        value={value}
        placeholder="What are you looking for?"
        icon={renderIcon}
        onChangeText={setValue}
        style={styles.inputStyle}
      />
    </View>
  );
};

let styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: Style.borderRadiusCardContainer,
    width: '100%',
    ...Style.shadow,
  },
  iconStyle: {
    color: Colors.blueTitleColor,
    fontSize: Style.inputIconSize,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default SearchBar;
