import React from 'react';
import {View, StyleSheet} from 'react-native';
import Description from './Description';
import Picture from './Picture';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Board = ({places}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Picture
        src={{
          uri: places
            ? places[0]
            : 'https://i.etsystatic.com/15374903/r/il/003f77/1722369502/il_570xN.1722369502_ka03.jpg',
        }}
        imageStyle={{
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
        viewStyle={[styles.Row60, {paddingRight: 2}]}
      />
      <View style={styles.Row40}>
        <Picture
          src={{
            uri: places
              ? places[1]
              : 'https://i.etsystatic.com/15374903/r/il/003f77/1722369502/il_570xN.1722369502_ka03.jpg',
          }}
          imageStyle={{borderTopRightRadius: 20}}
          viewStyle={[styles.halfColumn, {paddingLeft: 2, paddingBottom: 2}]}
        />
        <Picture
          src={{
            uri: places
              ? places[2]
              : 'https://i.etsystatic.com/15374903/r/il/003f77/1722369502/il_570xN.1722369502_ka03.jpg',
          }}
          imageStyle={{borderBottomRightRadius: 20}}
          viewStyle={[styles.halfColumn, {paddingLeft: 2, paddingTop: 2}]}
        />
      </View>
    </View>
  );
};

const ThreePicturesBoard = ({name, places, counter, onPress}) => {
  return (
    <TouchableOpacity style={styles.size} onPress={onPress}>
      <View style={{marginHorizontal: 5, marginVertical: 15}}>
        <View style={{height: '80%'}}>
          <Board places={places} />
        </View>
        <View style={{height: '20%'}}>
          <Description name={name} counter={counter} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  size: {height: 210, width: 200},
  Row60: {height: '100%', width: '60%'},
  Row40: {height: '100%', width: '40%'},
  halfColumn: {height: '50%', width: '100%'},
});

export default ThreePicturesBoard;
