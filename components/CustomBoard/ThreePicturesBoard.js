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
        viewStyle={[styles.Row60, {paddingRight: 1}]}
      />
      <View style={styles.Row40}>
        <Picture
          src={{
            uri: places[1] ? places[1] : emptyBackground,
          }}
          imageStyle={{borderTopRightRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingLeft: 1, paddingBottom: 1}]}
        />
        <Picture
          src={{
            uri: places[2] ? places[2] : emptyBackground,
          }}
          imageStyle={{borderBottomRightRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingLeft: 1, paddingTop: 1}]}
        />
      </View>
    </View>
  );
};

const ThreePicturesBoard = ({name, places, onPress}) => {
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
