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
import Style from '../constants/Style';

const CategoryCard = ({name, iconId, onSelect}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <View style={{flex: 1, padding: 10}}>
      <TouchableCmp onPress={onSelect}>
        <View style={styles.cardStyle}>
          <Icon name={iconId} style={styles.iconStyle} />
          <Text style={styles.textStyle}>{name}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    elevation: Style.elevation,
    borderRadius: 20,
    flex: 1,
    height: 130,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {fontSize: 60, color: Colors.greenTitleColor},
  textStyle: {fontSize: 20, color: Colors.blueTitleColor, marginTop: 15},
});

export default CategoryCard;
