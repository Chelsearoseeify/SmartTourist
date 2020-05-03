import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
} from 'react-native';
import Style from '../../constants/Style';

const FavouritePlaceCard = ({name, imageUrl, onSelect}) => {
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
            <View style={styles.dataStyle}>
              <Text style={styles.nameStyle}>{name}</Text>
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
    textAlign: 'center',
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
    height: 180,
    elevation: Style.elevation,
  },
  dataStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

export default FavouritePlaceCard;
