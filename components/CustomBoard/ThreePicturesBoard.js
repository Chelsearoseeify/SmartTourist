import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Description from './Description';
import Picture from './Picture';
import Style from '../../constants/Style';

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
          borderTopLeftRadius: Style.borderRadiusCard,
          borderBottomLeftRadius: Style.borderRadiusCard,
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
          imageStyle={{borderTopRightRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingLeft: 2, paddingBottom: 2}]}
        />
        <Picture
          src={{
            uri: places
              ? places[2]
              : 'https://i.etsystatic.com/15374903/r/il/003f77/1722369502/il_570xN.1722369502_ka03.jpg',
          }}
          imageStyle={{borderBottomRightRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingLeft: 2, paddingTop: 2}]}
        />
      </View>
    </View>
  );
};

const ThreePicturesBoard = ({name, places, counter, onPress}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <TouchableCmp onPress={onPress}>
      <View style={styles.cardStyle}>
        <View style={{height: '80%'}}>
          <Board places={places} />
        </View>
        <View style={{height: '20%'}}>
          <Description name={name} counter={counter} />
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  Row60: {height: '100%', width: '60%'},
  Row40: {height: '100%', width: '40%'},
  halfColumn: {height: '50%', width: '100%'},
  cardStyle: {
    margin: Style.marginCard,
    borderRadius: Style.borderRadiusCard,
    flex: 1,
    height: 220,
  },
});

export default ThreePicturesBoard;
