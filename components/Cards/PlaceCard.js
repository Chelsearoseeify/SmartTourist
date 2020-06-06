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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from '../../constants/Style';
import StarsRating from '../StarsRating';

const PlaceCard = ({name, imageUrl, rating, icon, onSelect}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <TouchableCmp style={{flex: 1}} onPress={onSelect}>
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
              <Icon name={icon} size={Style.iconSize} color={'white'} />
            </View>
            <View style={styles.dataStyle}>
              <Text style={styles.nameStyle}>{name}</Text>
              <View style={styles.ratingStyle}>
                <StarsRating
                  rating={rating}
                  size={17}
                  fullStarColor={'white'}
                  emptyStarColor={'white'}
                />
                <Text
                  style={{
                    fontSize: Style.fontSize.h6,
                    color: 'white',
                  }}>
                  {rating}
                </Text>
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
    fontSize: Style.fontSize.h6,
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
  },
  ratingStyle: {
    padding: 5,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    margin: Style.marginCard,
    borderRadius: Style.borderRadiusCard,
    flex: 1,
    height: 200,
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
    backgroundColor: 'rgba(10,10,20, 0.3)',
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
