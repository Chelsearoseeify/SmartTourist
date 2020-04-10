import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/Colors';
const CategoryCard = ({name, iconId, onSelect}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <TouchableCmp onPress={onSelect}>
      <View style={styles.cardStyle}>
        <Icon name={iconId} style={styles.iconStyle}></Icon>
        <Text style={styles.textStyle}>{name}</Text>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    margin: 20,
    elevation: 6,
    borderRadius: 20,
    flex: 1,
    height: 180,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {fontSize: 65, color: Colors.greenTitleColor, margin: 10},
  textStyle: {fontSize: 20, color: Colors.blueTitleColor, marginTop: 15},
});

export default CategoryCard;
