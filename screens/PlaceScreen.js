import React, {Component} from 'react';
import Colors from '../constants/Colors';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import BackButton from '../components/Buttons/BackButton';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {PLACES, description} from './../data/dummy-data';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import Detail from '../components/Detail';
import PlaceScreenButton from '../components/Buttons/PlaceScreenButton';
import StarsRating from '../components/StarsRating';
import FavouriteCity from './../models/FavouriteCity';
import actionType from '../constants/actionType';
import {
  toggleFavouritePlace,
  toggleFavouriteCity,
} from '../store/actions/favourites';
import FavouritePlace from '../models/FavouritePlace';

const PlaceScreen = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const favouriteCities = useSelector(
    state => state.favourites.favourite_cities,
  );
  const {place, cityName} = props.route.params;
  const addToFavoriteHandler = () => {
    const existingCity = favouriteCities.find(
      city => city.cityId === place.cityId,
    );
    let newCity = new FavouriteCity(place.cityId, cityName, [], []);
    let cityActionType = '';
    let placeActionType = '';
    if (existingCity) {
      console.log('THE CITY EXISTS');
      const placeIndex = existingCity.placesIds.findIndex(
        id => id === place.id,
      );
      let placesIds = [...existingCity.placesIds];
      let imageQueue = [...existingCity.imageQueue];
      if (placeIndex >= 0) {
        console.log('THE PLACE EXISTS');
        placeActionType = actionType.DELETE;
        placesIds.splice(placeIndex, 1);
        imageQueue.splice(placeIndex, 1);
      } else {
        console.log("THE PLACE DOESN'T EXIST");
        placeActionType = actionType.ADD;
        placesIds.unshift(place.id);
        imageQueue.unshift(place.url);
      }
      cityActionType = actionType.UPDATE;
      newCity.placesIds = placesIds;
      newCity.imageQueue = imageQueue;
    } else {
      console.log("THE CITY DOESN'T EXIST");
      newCity.placesIds = [place.id];
      newCity.imageQueue = [place.url];
      cityActionType = actionType.SET;
      placeActionType = actionType.ADD;
    }
    dispatch(toggleFavouriteCity(user.uid, newCity, cityActionType));
    dispatch(
      toggleFavouritePlace(
        user.uid,
        new FavouritePlace(place.cityId, place.id, place.name, place.url),
        placeActionType,
      ),
    );
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
