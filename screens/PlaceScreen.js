import React, {useState, useEffect, useCallback} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import BackButton from '../components/Buttons/BackButton';
import NavigateButton from '../components/Buttons/NavigateButton';
import PlaceScreenButton from '../components/Buttons/PlaceScreenButton';
import StarsRating from '../components/StarsRating';
import TripModal from '../components/Cards/TripModal';

import {
  toggleFavourite,
} from '../store/actions/favourite';
import {
  fetchPlaceDescription,
  getPlacesDetails,
  emptyPlace,
} from '../store/actions/places';

import {fetchCities} from '../store/actions/cities';

import Style from '../constants/Style';
import Detail from '../components/Detail';
import Colors from '../constants/Colors';

import HTMLView from 'react-native-htmlview';

const PlaceScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [addToTrip, setAddToTrip] = useState(false);
  const user = useSelector(state => state.user);
  const {id, cityName, cityId, placeName} = route.params;
  const places = useSelector(state => state.places.cachedPlaces);
  const cities = useSelector(state => state.cities.cachedCities);
  const place = places.find(place => place.id === id)
  
  const description = useSelector(state => state.places.description);
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  let index = favouritePlaces.findIndex(place => place.id === id);
  const [icon, setIcon] = useState(
    index >= 0 ? 'cards-heart' : 'heart-outline',
  );

  useEffect(() => {
    index = favouritePlaces.findIndex(place => place.id === id);
    setIcon(index >= 0 ? 'cards-heart' : 'heart-outline');
  }, [favouritePlaces]);

  useEffect(() => {
    const loadPlace = async () => {
      try {
        if (!place.international_phone_number){
          dispatch(getPlacesDetails([id], cityId));
          dispatch(fetchPlaceDescription(placeName));
        }
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadPlace();
  }, [dispatch]);

  const fetchCitiesData = useCallback(async () => {
    try {
      dispatch(fetchCities([place.cityId]));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (cities.findIndex(c => c.id === place.cityId) === -1) {
      fetchCitiesData().then(() => {});
    }
  }, [fetchCitiesData, fetchCities]);

  const toggleFavouriteHandler = () => {
    dispatch(toggleFavourite(place, cityName, user.userId));
  };

  const pressHandlers = () => {
    setAddToTrip(true);
  };

  const mapHandler = () => {
    navigation.navigate('Mapf', {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    });
  };

  return (
    <View style={{flex: 1}}>
      <TripModal
        place={place}
        visible={addToTrip}
        onCloseModal={() => setAddToTrip(false)}
        navigation={navigation}
      />
      <View style={{height: 400, width: '100%', flex: 1, position: 'absolute'}}>
        <ImageBackground
          source={{uri: place.photoUrl}}
          style={styles.imageBackgroundStyle}
          resizeMode="cover"
        />
      </View>
      <BackButton
        navigation={navigation}
        onPress={() => dispatch(emptyPlace())}
      />

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View
              style={[
                styles.avatarView,
                {
                  top: -30,
                  right: 30,
                },
              ]}>
              <NavigateButton
                name={'Favourite'}
                iconName={'near-me'}
                onPress={mapHandler}
              />
            </View>
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
                  {/* <Text style={styles.reviewStyle}>
                    {place.user_ratings_total} Reviews
                  </Text> */}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <PlaceScreenButton
                  name={'Favourite'}
                  iconName={icon}
                  onPress={toggleFavouriteHandler}
                />
                <PlaceScreenButton
                  name={'Add to trip'}
                  iconName={'calendar-plus'}
                  onPress={pressHandlers}
                />
              </View>

              <View style={styles.detailViewStyle}>
                <Text style={styles.detailStyle}>Details</Text>
                <Detail
                  text={place.address}
                  iconName="map-marker-alt"
                />
                <Detail text={'+1 223-548-7785'} iconName="phone" />
                <Detail text={'www.dinocoffee.com'} iconName="link" />
              </View>

              <View style={styles.detailViewStyle}>
                <Text style={styles.detailStyle}>Description</Text>
                {description ? (
                  <HTMLView value={description} stylesheet={HTMLstyles} />
                ) : (
                  <View style={{padding: 40, flex: 1}}>
                    <Text style={styles.noDescriptionContainer}>
                      There is no available description for this place, sorry,
                      but it's probably Google's fault
                    </Text>
                  </View>
                )}

                {/* <Text style={{color: Colors.blueTitleColor}}>
                  {description}
                </Text> */}
              </View>
              {/* <Text
                style={{
                  fontSize: Style.fontSize.h6,
                  color: Colors.blueTitleColor,
                }}>
                
              </Text> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const HTMLstyles = StyleSheet.create({
  p: {
    color: Colors.blueTitleColor,
    /* marginTop: -20,
    marginBottom: -10, */
  },
  i: {
    fontStyle: 'italic',
  },
  span: {
    color: Colors.greenTitleColor,
  },
  b: {
    fontWeight: 'bold',
  },
  h2: {
    fontSize: Style.fontSize.h5,
    fontWeight: 'bold',
    marginVertical: -15,
  },
  h3: {
    fontSize: Style.fontSize.h6,
    fontWeight: '800',
    marginVertical: -10,
  },
  ul: {
    color: Colors.blueTitleColor,
    /* marginBottom: 30,
    marginTop: -20, */
  },
  li: {
    color: Colors.blueTitleColor,
  },

  /* b: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h5,
    marginStart: 10,
    marginVertical: 5,
  }, */
});

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    marginTop: 350,
    padding: Style.paddingCardContainer,
    ...Style.shadow,
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
    fontSize: Style.fontSize.h4,
    color: Colors.blueTitleColor,
  },
  detailViewStyle: {
    margin: 10,
  },
  titleViewStyle: {
    margin: 10,
  },
  avatarView: {
    ...Style.shadow,
    borderRadius: 45,
    height: 55,
    width: 55,
    position: 'absolute',
    backgroundColor: Colors.backgroundColor,
  },
  noDescriptionContainer: {
    flex: 1,
    textAlign: 'center',
    color: Colors.blueTitleColor,
  },
});

export default PlaceScreen;
