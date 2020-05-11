import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const ListHeader = ({ name, padding, action }) => {
  return (
    <View style={{ ...styles.subTitleViewStyle, paddingLeft: padding }}>
      <Text style={styles.subtitleStyle}>{name}</Text>
      <Button
        style={styles.actionButtonStyle}
        color={Colors.greenButtonColor}
        title="See all"
        onPress={action}
        />
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
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h5,
  },
  actionButtonStyle: {
    color: Colors.greenButtonColor,
    fontSize: Style.fontSize.h6,
    backgroundColor: "transparent"
  },
});

export default ListHeader;
