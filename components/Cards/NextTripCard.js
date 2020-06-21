import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import Style from '../../constants/Style';

const NextTripCard = props => {
  return (
    <TouchableOpacity style={styles.cardStyle} onPress={props.onPress}>
      <ImageBackground
        source={{
          uri:
            props.tripCity.photoUrl,
        }}
        style={styles.imageBackgroundStyle}
        imageStyle={{ borderRadius: Style.borderRadiusCard, opacity: .8 }}
        resizeMode="cover">
        <View style={styles.filterStyle}>
          <View style={styles.dataStyle}>
            <Text style={styles.nameStyle}>
              {props.tripName}
            </Text>
            <View style={styles.ratingStyle}>
              <Text
                style={{
                  fontSize: Style.fontSize.h6,
                  padding: 5,
                  color: 'white',
                }}>
                {props.dateString}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: Style.fontSize.h4,
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
  },
  cardStyle: {
    marginVertical: Style.marginCard,
    elevation: Style.elevation,
    borderRadius: Style.borderRadiusCard,
    height: 200
  },
  dataStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});

export default NextTripCard;
