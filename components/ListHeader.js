import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/Colors';

const ListHeader = ({name}) => {
  return (
    <View style={styles.subTitleViewStyle}>
      <Text style={styles.subtitleStyle}>{name}</Text>
      <Text style={styles.subSubtitleStyle}>See all</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
    paddingEnd: 20,
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 10,
    paddingStart: 5,
  },
  subSubtitleStyle: {
    color: Colors.greenButtonColor,
    fontSize: 20,
    paddingTop: 10,
    paddingStart: 5,
  },
});

export default ListHeader;
