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
import Style from '../constants/Style';

const PlaceCard = ({name, imageUrl, onSelect}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <TouchableCmp onPress={onSelect}>
      <View style={styles.cardStyle}>
        <ImageBackground
          source={{
            uri: imageUrl,
          }}
          style={styles.imageBackgroundStyle}
          imageStyle={{borderRadius: Style.borderRadiusCard, opacity: 10}}
          resizeMode="cover">
          <View style={styles.filterStyle}>
            <View style={styles.iconStyle}>
              <Icon name="heart" size={Style.iconSize} color={'white'} />
            </View>
            <View style={styles.dataStyle}>
              <Text style={styles.nameStyle}>{name}</Text>
              <View style={styles.ratingStyle}>
                <Text
                  style={{
                    fontSize: Style.fontSize.h6,
                    marginRight: 5,
                    color: 'white',
                  }}>
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
    fontSize: Style.fontSize.h5,
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
  },
  ratingStyle: {
    padding: 5,
    flexDirection: 'row',
  },
  cardStyle: {
    margin: Style.marginCard,
    borderRadius: Style.borderRadiusCard,
    flex: 1,
    height: 220,
    elevation: Style.elevation,
  },
  dataStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: Style.paddingCard,
  },
  filterStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: Style.borderRadiusCard,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
    borderRadius: Style.borderRadiusCard,
  },
  iconStyle: {alignItems: 'flex-end', padding: 10},
});

export default PlaceCard;
