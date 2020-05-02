import React, {Component} from 'react';
import Colors from '../constants/Colors';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import BackButton from '../components/Buttons/BackButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {PLACES, description} from './../data/dummy-data';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavourite, addFavourite} from '../store/actions/favourite';
import Style from '../constants/Style';
import Detail from '../components/Detail';
import CustomButton from '../components/Buttons/CustomButton';
import PlaceScreenButton from '../components/Buttons/PlaceScreenButton';
import StarsRating from '../components/StarsRating';

const PlaceScreen = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const favouriteCities = useSelector(
    state => state.favourites.favourite_cities,
  );
  const {place, cityName} = props.route.params;

  const addToFavoriteHandler = () => {
    dispatch(
      addFavourite(
        user.uid,
        place.id,
        place.cityId,
        cityName,
        place.url,
        favouriteCities,
      ),
    );
    //dispatch(toggleFavourite(place.id, place.cityId, cityName, place.url));
  };

  const pressHandlers = () => {
    console.log('PRESSED');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 200, width: '100%', flex: 1, position: 'absolute'}}>
        <ImageBackground
          source={{uri: place.url}}
          style={styles.imageBackgroundStyle}
          resizeMode="cover"
        />
      </View>
      <BackButton {...props} />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.titleViewStyle}>
                <Text style={styles.placeNameStyle}>{place.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <StarsRating
                    rating={place.rating}
                    size={24}
                    fullStarColor={Colors.greenTitleColor}
                    emptyStarColor={Colors.greenSubTitleColor}
                  />
                  <Text style={styles.reviewStyle}>
                    {place.user_ratings_total} Reviews
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <PlaceScreenButton
                  name={'Navigate'}
                  iconName={'directions'}
                  onPress={pressHandlers}
                />
                <PlaceScreenButton
                  name={'Favourite'}
                  iconName={'heart'}
                  onPress={addToFavoriteHandler}
                />
                <PlaceScreenButton
                  name={'Add to trip'}
                  iconName={'calendar-alt'}
                  onPress={pressHandlers}
                />
              </View>

              <View style={styles.detailViewStyle}>
                <Text style={styles.detailStyle}>Details</Text>
                <Detail
                  text={'3601 S Gaffey St, San Pedro'}
                  iconName="map-marker-alt"
                />
                <Detail text={'+1 223-548-7785'} iconName="phone" />
                <Detail text={'www.dinocoffee.com'} iconName="link" />
              </View>

              <Text
                style={{
                  fontSize: Style.fontSize.h6,
                  color: Colors.blueTitleColor,
                }}>
                {description}
              </Text>
            </View>
          </View>
        </ScrollView>
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
    marginTop: 150,
    padding: Style.paddingCardContainer,
    elevation: Style.elevation,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.backgroundColor,
  },
  placeNameStyle: {
    fontSize: Style.fontSize.h1,
    color: Colors.blueTitleColor,
    paddingBottom: Style.paddingCard,
  },
  cardContentStyle: {
    padding: Style.paddingCardContainer,
  },
  reviewIconStyle: {
    color: Colors.greenButtonColor,
    fontSize: Style.inputIconSize,
  },
  reviewStyle: {
    color: Colors.blueTitleColor,
    paddingLeft: 10,
    fontSize: Style.fontSize.h7,
  },
  detailStyle: {
    fontWeight: 'bold',
    fontSize: Style.fontSize.h5,
    color: Colors.blueTitleColor,
  },
  detailViewStyle: {
    margin: 10,
  },
  titleViewStyle: {
    margin: 10,
  },
});

export default PlaceScreen;
