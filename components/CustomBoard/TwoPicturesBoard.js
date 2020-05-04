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
        viewStyle={[styles.halfRow, {paddingRight: 2}]}
      />
      <Picture
        src={{
          uri: places
            ? places[1]
            : 'https://i.etsystatic.com/15374903/r/il/003f77/1722369502/il_570xN.1722369502_ka03.jpg',
        }}
        imageStyle={{
          borderTopRightRadius: Style.borderRadiusCard,
          borderBottomRightRadius: Style.borderRadiusCard,
        }}
        viewStyle={[styles.halfRow, {paddingRight: 2}]}
      />
    </View>
  );
};

const TwoPicturesBoard = ({name, places, onPress}) => {
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
          <Description name={name} counter={places.length} />
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  halfRow: {height: '100%', width: '50%'},
  halfColumn: {height: '50%', width: '100%'},
  cardStyle: {
    margin: Style.marginCard,
    borderRadius: Style.borderRadiusCard,
    flex: 1,
    height: 220,
  },
});

export default TwoPicturesBoard;
