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
      <View style={styles.halfRow}>
        <Picture
          src={{
            uri: places[0] ? places[0] : emptyBackground,
          }}
          imageStyle={{borderTopLeftRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingRight: 1, paddingBottom: 1}]}
        />
        <Picture
          src={{
            uri: places[1] ? places[1] : emptyBackground,
          }}
          imageStyle={{borderBottomLeftRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingRight: 1, paddingTop: 1}]}
        />
      </View>
      <View style={styles.halfRow}>
        <Picture
          src={{
            uri: places[2] ? places[2] : emptyBackground,
          }}
          imageStyle={{borderTopRightRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingLeft: 1, paddingBottom: 1}]}
        />
        <Picture
          src={{
            uri: places[3] ? places[3] : emptyBackground,
          }}
          imageStyle={{borderBottomRightRadius: Style.borderRadiusCard}}
          viewStyle={[styles.halfColumn, {paddingLeft: 1, paddingTop: 1}]}
        />
      </View>
    </View>
  );
};

const FourPicturesBoard = ({name, places, onPress}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <View>
      {places ? (
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
      ) : (
        <View />
      )}
    </View>
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

export default FourPicturesBoard;
