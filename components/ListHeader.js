import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

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
    alignItems: 'center',
    width: '100%',
    paddingEnd: 20,
    paddingTop: 8,
    paddingStart: 5,
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h5,
  },
  subSubtitleStyle: {
    color: Colors.greenButtonColor,
    fontSize: Style.fontSize.h6,
  },
});

export default ListHeader;
