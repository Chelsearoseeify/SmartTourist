import React, {Component} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Button style={{radius: 4}} title={'EHI'}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
    paddingTop: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

export default MainScreen;
