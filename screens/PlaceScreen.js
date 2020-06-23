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
  toggleFavouriteCity,
  toggleFavouritePlace,
  setFavouriteRequest,
} from '../store/actions/favourite';
import {
  fetchPlaceDescription,
  fetchPlace,
  emptyPlace,
} from '../store/actions/places';

import {fetchCities} from '../store/actions/cities';

import Style from '../constants/Style';
import Detail from '../components/Detail';
import Colors from '../constants/Colors';

import HTML from 'react-native-render-html';

const PlaceScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [addToTrip, setAddToTrip] = useState(false);
  const user = useSelector(state => state.user);
  const selectedCity = useSelector(state => state.cities.selected_city);
  const {id, cityName, cityId, placeName} = route.params;
  const places = useSelector(state => state.places.places);
  const cities = useSelector(state => state.cities.cachedCities);
  const place =
    selectedCity.name === cityName
      ? places.filter(place => place.id === id)[0]
      : useSelector(state => state.places.place);
  const currentCity = cities.find(c => c.id === place.cityId);

  const placeRequest = useSelector(state => state.favourites.place_request);
  const cityRequest = useSelector(state => state.favourites.city_request);
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  const index = favouritePlaces.findIndex(place => place.id === id);
  const [icon, setIcon] = useState(
    index >= 0 ? 'cards-heart' : 'heart-outline',
  );

  useEffect(() => {
    const loadPlace = async () => {
      try {
        console.log(id, cityName);
        if (selectedCity.name !== cityName) dispatch(fetchPlace(id, cityId));
        dispatch(fetchPlaceDescription(placeName));
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadPlace();
  }, [dispatch]);

  useEffect(() => {
    const toggleFavs = async () => {
      if (Object.keys(cityRequest.city).length > 0) {
        setIcon(placeRequest.icon);
        dispatch(
          toggleFavouriteCity(
            user.userId,
            cityRequest.city,
            cityRequest.actionType,
          ),
        );
        dispatch(
          toggleFavouritePlace(
            user.userId,
            placeRequest.place,
            placeRequest.actionType,
          ),
        );
      }
    };
    toggleFavs();
  }, [dispatch, cityRequest]);

  const fetchCitiesData = useCallback(async () => {
    try {
      dispatch(fetchCities([place.cityId]));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (cities.find(c => c.id === place.cityId) === -1) {
      fetchCitiesData().then(() => {});
    }
  }, [fetchCitiesData, fetchCities]);

  const toggleFavouriteHandler = () => {
    dispatch(setFavouriteRequest(place, cityName));
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

  const htmlContent = `
    <p><b>Old Town Square</b> (Czech: <i lang="cs">Staroměstské náměstí</i> <small></small><span title="Representation in the International Phonetic Alphabet (IPA)">[ˈstaroˌmɲɛstskɛː ˈnaːmɲɛsciː]</span> or colloquially <i lang="cs" title="Czech language text">Staromák</i> <small></small><span title="Representation in the International Phonetic Alphabet (IPA)">[ˈstaromaːk]</span> <span>(<span><span><span></span>listen</span></span>)</span>) is an historic square in the Old Town quarter of Prague, the capital of the Czech Republic. It is located between Wenceslas Square and Charles Bridge. </p> <h2><span id="Buildings">Buildings</span></h2> <p>The square features buildings belonging to various architectural styles, including the Gothic Church of Our Lady before Týn, which has been the main church of this part of the city since the 14th century. Its characteristic towers are 80 m high. The Baroque St. Nicholas Church is another church located in the square. </p><p>Prague Orloj is a medieval astronomical clock mounted on the Old Town Hall. The clock was first installed in 1410, making it the third-oldest astronomical clock in the world and the oldest one still in operation. The tower of the Old Town Hall is open to the public and offers panoramic views of the Old Town. </p><p>An art museum of the Czech National Gallery is located in the Kinský Palace. </p> <h2><span id="Statues_and_memorials">Statues and memorials</span></h2> <p>The square's center is home to a statue of religious reformer Jan Hus, who was burned at the stake for his beliefs in Constance. This led to the Hussite Wars. The statue known as the Jan Hus Memorial was erected on 6 July 1915 to mark the 500th anniversary of his death. </p><p>In front of the Old Town Hall, there is also a memorial to martyrs (including Jan Jesenius and Maxmilián Hošťálek) beheaded on that spot during the Old Town Square execution by Habsburgs, after the Battle of White Mountain. Twenty-seven crosses mark the pavement in their honour. The crosses were installed during the repairs of the Old Town Hall after the WW2, while a nearby plaque which lists the names of all 27 victims dates from 1911. Orthodox Czechs do not trample these crosses because for respect. </p><p>On 3 November 1918, a Marian Column that had been erected in the square shortly after the Thirty Years' War was demolished in celebration of independence from the Habsburg empire. 2020 this columnn gets reerected. </p> <h2><span id="Markets">Markets</span></h2> <p>At Christmas and Easter, markets are held on the square; they resemble medieval markets. A tall decorated tree and a musical stage are set up. </p><p>The Christmas Markets in Old Town Square are the largest Christmas markets in the Czech Republic and are visited by hundreds of thousands of visitors from the Czech Republic and abroad, primarily Germans, Russians, Italians and Britons. In 2016, CNN ranked  Prague’s Christmas Markets among the 10 best ones worldwide.</p> <h2><span id="See_also">See also</span></h2> <ul><li>Old Town Square execution</li></ul><h2><span id="References">References</span></h2> <h2><span id="External_links">External links</span></h2> <ul><li>Photos of Old Town Square and Background Information</li> <li>Old Town Square Live WebCam</li></ul><p><span></span> </p>
`;

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
                  text={'3601 S Gaffey St, San Pedro'}
                  iconName="map-marker-alt"
                />
                <Detail text={'+1 223-548-7785'} iconName="phone" />
                <Detail text={'www.dinocoffee.com'} iconName="link" />
              </View>

              <View>
                <HTML html={htmlContent} />
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
    fontSize: Style.fontSize.h5,
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
});

export default PlaceScreen;
