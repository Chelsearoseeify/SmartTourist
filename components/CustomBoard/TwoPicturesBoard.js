import React from 'react';
import {View, StyleSheet} from 'react-native';
import Description from './Description';
import Picture from './Picture';

const Board = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Picture
        src={require('./../../assets/images/1.jpg')}
        imageStyle={{
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
        viewStyle={[styles.halfRow, {paddingRight: 2}]}
      />
      <Picture
        src={require('./../../assets/images/2.jpg')}
        imageStyle={{
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
        viewStyle={[styles.halfRow, {paddingRight: 2}]}
      />
    </View>
  );
};

const TwoPicturesBoard = () => {
  return (
    <View style={{marginHorizontal: 5, marginVertical: 15}}>
      <View style={{height: '90%'}}>
        <Board />
      </View>
      <View style={{height: '10%'}}>
        <Description />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  halfRow: {height: '100%', width: '50%'},
  halfColumn: {height: '50%', width: '100%'},
});

export default TwoPicturesBoard;
