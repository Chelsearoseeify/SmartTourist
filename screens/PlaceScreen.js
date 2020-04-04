import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {View, ImageBackground, StyleSheet} from 'react-native';
import BackButton from '../components/BackButton';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PlaceScreen = props => {
  let stars = [1, 2, 3, 4, 5];
  return (
    <View style={{flex: 1, backgroundColor: Colors.backgroudColor}}>
      <View style={{height: '35%'}}>
        <ImageBackground
          source={require('./../assets/images/edinburgh_castle.jpg')}
          style={styles.imageBackgroundStyle}
          resizeMode="cover">
          <View>
            <BackButton {...props} />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.cardStyle}>
        <View style={styles.cardContentStyle}>
          <Text category="h1">Edinburgh's Castle</Text>

          <View style={{marginLeft: 10, marginTop: 5, flexDirection: 'row'}}>
            {stars.map(star => (
              <Icon name="star" style={styles.reviewIconStyle} />
            ))}
            <Text style={styles.reviewStyle}>24 Reviews</Text>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={styles.buttonStyle}>
              <Icon name="directions" style={styles.buttonIconStyle}></Icon>
              <Text style={styles.textIconStyle}>Navigate</Text>
            </View>
            <View style={styles.buttonStyle}>
              <Icon name="heart" style={styles.buttonIconStyle}></Icon>
              <Text style={styles.textIconStyle}>Favourite</Text>
            </View>
            <View style={styles.buttonStyle}>
              <Icon name="calendar-alt" style={styles.buttonIconStyle}></Icon>
              <Text style={styles.textIconStyle}>Add to trip</Text>
            </View>
          </View>

          <View style={{marginLeft: 10, marginTop: 15}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 19,
                color: Colors.blueTitleColor,
                marginTop: 10,
              }}>
              Details
            </Text>
            <View style={styles.detailsStyle}>
              <Icon
                name="map-marker-alt"
                style={styles.detailsIconStyle}></Icon>
              <Text style={styles.detailsTextStyle}>
                3601 S Gaffey St, San Pedro
              </Text>
            </View>
            <View style={styles.detailsStyle}>
              <Icon name="phone" style={styles.detailsIconStyle}></Icon>
              <Text style={styles.detailsTextStyle}>+1 223-548-7785</Text>
            </View>
            <View style={styles.detailsStyle}>
              <Icon name="link" style={styles.detailsIconStyle}></Icon>
              <Text style={styles.detailsTextStyle}>www.dinocoffee.com</Text>
            </View>
          </View>

          <Text
            style={{
              margin: 10,
              marginTop: 20,
              fontSize: 17,
              color: Colors.blueTitleColor,
            }}>
            Edinburgh Castle is a historic fortress which dominates the skyline
            of Edinburgh, the capital city of Scotland, from its position on the
            Castle Rock.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    marginTop: -60,
    elevation: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    height: 240,
    backgroundColor: Colors.backgroudColor,
  },
  cardContentStyle: {
    margin: 20,
  },
  reviewIconStyle: {
    color: Colors.greenButtonColor,
    fontSize: 18,
  },
  reviewStyle: {
    color: Colors.blueTitleColor,
    marginLeft: 10,
  },
  buttonStyle: {
    borderRadius: 18,
    backgroundColor: 'white',
    elevation: 6,
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    paddingHorizontal: 28,
  },
  buttonIconStyle: {
    color: Colors.blueTitleColor,
    fontSize: 40,
    paddingVertical: 4,
  },
  textIconStyle: {color: Colors.blueTitleColor, fontSize: 15},
  detailsIconStyle: {
    color: Colors.greenTitleColor,
    marginTop: 2,
    marginRight: 10,
    fontSize: 15,
  },
  detailsTextStyle: {color: Colors.blueTitleColor, fontSize: 17},
  detailsStyle: {flexDirection: 'row', marginVertical: 8},
});

export default PlaceScreen;
