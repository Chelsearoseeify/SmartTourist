import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {Text} from '@ui-kitten/components';

import {useSelector} from 'react-redux';

const NextTripCard = props => {
  const trips = useSelector(state => state.trips.userTrips);

  useEffect(() => {
    console.log(trips);
  }, [trips]);

  return (
    <View style={styles.cardStyle}>
      <ImageBackground
        source={require('./../assets/images/edinburgh.jpg')}
        style={styles.imageBackgroundStyle}
        imageStyle={{borderRadius: 20, opacity: 10}}
        resizeMode="cover">
        <View style={styles.filterStyle}>
          <View style={styles.dataStyle}>
            <Text style={styles.nameStyle}>
              {trips ? trips[0].name : 'Edinburgh'}
            </Text>
            <View style={styles.ratingStyle}>
              <Text style={{fontSize: 18, marginRight: 5, color: 'white'}}>
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
    fontSize: 28,
    fontWeight: 'bold',
    margin: 4,
    paddingTop: 10,
    color: 'white',
  },
  ratingStyle: {
    margin: 5,
    flexDirection: 'row',
  },
  cardStyle: {
    margin: 15,
    elevation: 6,
    borderRadius: 20,
    flex: 1,
    height: 240,
  },
  dataStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  filterStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  iconStyle: {alignItems: 'flex-end', margin: 10},
});

export default NextTripCard;
