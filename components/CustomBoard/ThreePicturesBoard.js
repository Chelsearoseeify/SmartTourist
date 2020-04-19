import React from 'react';
import {View, StyleSheet} from 'react-native';
import Description from './Description';
import Picture from './Picture';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Board = ({places}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Picture
        src={places[0].imageUrl}
        imageStyle={{
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
        viewStyle={[styles.Row60, {paddingRight: 2}]}
      />
      <View style={styles.Row40}>
        <Picture
          src={places[1].imageUrl}
          imageStyle={{borderTopRightRadius: 20}}
          viewStyle={[styles.halfColumn, {paddingLeft: 2, paddingBottom: 2}]}
        />
        <Picture
          src={places[2].imageUrl}
          imageStyle={{borderBottomRightRadius: 20}}
          viewStyle={[styles.halfColumn, {paddingLeft: 2, paddingTop: 2}]}
        />
      </View>
    </View>
  );
};

const ThreePicturesBoard = ({name, places}) => {
  return (
    <View style={{marginHorizontal: 5, marginVertical: 15}}>
      <View style={{height: '80%'}}>
        <Board places={places} />
      </View>
      <View style={{height: '20%'}}>
        <Description name={name} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Row60: {height: '100%', width: '60%'},
  Row40: {height: '100%', width: '40%'},
  halfColumn: {height: '50%', width: '100%'},
});

export default ThreePicturesBoard;
