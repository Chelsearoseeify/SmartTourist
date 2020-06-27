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
import {emptyBackground} from './../../data/dummy-data';

const Board = ({places}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Picture
        src={{
          uri: places[0] ? places[0] : emptyBackground,
        }}
        imageStyle={{
          borderTopLeftRadius: Style.borderRadiusCard,
          borderBottomLeftRadius: Style.borderRadiusCard,
        }}
        viewStyle={[styles.halfRow, {paddingRight: 1}]}
      />
      <Picture
        src={{
          uri: places[1] ? places[1] : emptyBackground,
        }}
        imageStyle={{
          borderTopRightRadius: Style.borderRadiusCard,
          borderBottomRightRadius: Style.borderRadiusCard,
        }}
        viewStyle={[styles.halfRow, {paddingRight: 1}]}
      />
    </View>
  );
};

const TwoPicturesBoard = ({name, places, onPress}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;
  console.log(places);
  return (
    <TouchableCmp onPress={onPress}>
      <View style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '60%'}}>
            <Board places={places} />
          </View>

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
    height: 100,
  },
});

export default TwoPicturesBoard;
