import React, {Component} from 'react';
import {Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, View, TextInput} from 'react-native';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const SearchBar2 = ({style = {width: '100%'}, searchedValue}) => {
  const [value, setValue] = React.useState(searchedValue ? searchedValue : '');

  return (
    <View style={[style, {padding: Style.paddingTextInput}]}>
      <View style={styles.searchSection}>
        <TextInput
          value={value}
          style={styles.input}
          placeholder="What are you looking for?"
          onChangeText={value => {
            setValue(value);
          }}
        />
        <Icon style={styles.iconStyle} name="search" />
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: Style.borderRadiusCardContainer,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Style.paddingTextInputContent,
    height: 45,
    ...Style.shadow,
  },
  iconStyle: {
    color: Colors.blueTitleColor,
    fontSize: Style.inputIconSize,
    fontWeight: 'bold',
  },
});

export default SearchBar2;
