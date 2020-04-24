import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {Text} from '@ui-kitten/components';

import {useSelector} from 'react-redux';
import Style from '../constants/Style';

const NextTripCard = props => {
  const trips = useSelector(state => state.trips.userTrips);

  useEffect(() => {
    console.log(trips);
  }, [trips]);

  return (
    <View style={styles.cardStyle}>
      <ImageBackground
        source={{
          uri:
            'https://static.brusselsairlines.com/_img/destinationPage2/UK/Edinburgh/Edinburgh-view.jpg',
        }}
        style={styles.imageBackgroundStyle}
        imageStyle={{borderRadius: Style.borderRadiusCard, opacity: 10}}
        resizeMode="cover">
        <View style={styles.filterStyle}>
          <View style={styles.dataStyle}>
            <Text style={styles.nameStyle}>
              {trips ? trips[0].name : 'Edinburgh'}
            </Text>
            <View style={styles.ratingStyle}>
              <Text
                style={{
                  fontSize: Style.fontSize.h6,
                  padding: 5,
                  color: 'white',
                }}>
                Fri 13 - Mon 16 March
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    margin: Style.marginCard,
    elevation: Style.elevation,
    borderRadius: Style.borderRadiusCard,
    flex: 1,
    height: 220,
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
