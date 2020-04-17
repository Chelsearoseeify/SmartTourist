import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PlaceCard = ({name, imageUrl, onSelect}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <TouchableCmp onPress={onSelect}>
      <View style={styles.cardStyle}>
        <ImageBackground
          source={imageUrl}
          style={styles.imageBackgroundStyle}
          imageStyle={{borderRadius: 15, opacity: 10}}
          resizeMode="cover">
          <View style={styles.filterStyle}>
            <View style={styles.iconStyle}>
              <Icon name="heart" size={20} color={'white'} />
            </View>
            <View style={styles.dataStyle}>
              <Text style={styles.nameStyle}>{name}</Text>
              <View style={styles.ratingStyle}>
                <Text style={{fontSize: 18, marginRight: 5, color: 'white'}}>
                  4.6
                </Text>
                <Icon name="star" style={{marginTop: 3, color: 'white'}} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 8,
    color: 'white',
  },
  ratingStyle: {
    margin: 10,
    flexDirection: 'row',
  },
  cardStyle: {
    margin: 10,
    width: '80%',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 15,
    flex: 1,
    height: 220,
  },
  dataStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  filterStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  iconStyle: {alignItems: 'flex-end', margin: 10},
});

export default PlaceCard;
