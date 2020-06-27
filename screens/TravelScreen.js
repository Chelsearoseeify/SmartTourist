import React, {useState, useEffect, useCallback} from 'react';
import Colors from '../constants/Colors';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import PlaceCard from '../components/Cards/PlaceCard';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../components/Header';
import Style from '../constants/Style';
import {fetchFavourites} from '../store/actions/favourite';
import {fetchPlacesFromGoogle, fetchPlaces} from './../store/actions/places';
import _ from 'lodash';
import LabelButtonsList from '../components/LabelButtonsList';
import NoResult from '../components/NoResult';
import MapButton from './../components/Buttons/MapButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CitySearchModal from './../components/Cards/CitySearchModal';
import {v4 as uuidv4} from 'react-native-uuid';
import {setSelectedCity} from './../store/actions/cities';

//full height

const TravelScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const selectedCity = useSelector(state => state.cities.selected_city);
  const places = useSelector(state => state.places.places);
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  const user = useSelector(state => state.user);
  const selectedType = useSelector(state => state.places.type);
  const searchType = useSelector(state => state.places.search);
  const [pageToken, setPageToken] = useState(
    useSelector(state => state.places.pageToken),
  );
  const [token, setToken] = useState('');
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const onCitySelected = cityId => {
    dispatch(setSelectedCity(cityId, token));
    setPageToken('');
  };

  const onModalClose = () => {
    setCityModalVisible(false);
  };

  const openCityModal = () => {
    setToken(uuidv4());
    setCityModalVisible(true);
  };

  const loadPlaces = async () => {
    await dispatch(fetchFavourites(user.userId));
    await dispatch(
      fetchPlacesFromGoogle(selectedCity, searchType, selectedType, pageToken),
    );
  };
  useEffect(() => {
    setIsLoading(true);
    loadPlaces();
    setIsLoading(false);
  }, [dispatch, selectedCity, searchType, selectedType]);

  const mapHandler = () => {
    navigation.navigate('Mapf', {
      lat: selectedCity.geometry.location.lat,
      lng: selectedCity.geometry.location.lng,
    });
  };

  const renderPlaceItem = (item, index) => {
    const ind = favouritePlaces.findIndex(place => place.id === item.id);
    return (
      <PlaceCard
        name={item.name}
        imageUrl={
          item.photoUrl === ''
            ? 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
            : item.photoUrl
        }
        rating={item.rating}
        icon={ind >= 0 ? 'heart' : 'heart-outline'}
        onSelect={() => {
          navigation.navigate('Place', {
            id: item.id,
            placeName: item.name,
            cityName: selectedCity.name,
            cityId: selectedCity.id,
          });
        }}
      />
    );
  };

  const footerComponent = () => {
    if (isLoading)
      return <ActivityIndicator size="large" color={Colors.greenTitleColor} />;
    return <View />;
  };

  const headerComponent = () => {
    return (
      <View>
        <Text style={styles.subtitleStyle}>Things to do</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CitySearchModal
        visible={cityModalVisible}
        closeModal={onModalClose}
        token={token}
        onCitySelected={cityId => onCitySelected(cityId)}
      />
      <View
        style={{
          height: 105,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 8,
            paddingHorizontal: 15,
            width: '100%',
          }}>
          <MapButton onPress={mapHandler} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Icon
              size={Style.iconSize}
              name="pencil"
              color={Colors.greenTitleColor}
              style={{paddingHorizontal: 10}}
              onPress={openCityModal}
            />
            <Text
              style={{
                color: Colors.blueTitleColor,
                fontWeight: 'bold',
                fontSize: Style.fontSize.h1,
              }}>
              {selectedCity.name}
            </Text>
          </View>
        </View>
        <LabelButtonsList />
        <View
          style={{
            marginHorizontal: 15,
            borderBottomColor: '#DBE5EE',
            borderBottomWidth: 2,
          }}
        />
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.greenTitleColor} />
        </View>
      ) : places.length === 0 ? (
        <NoResult />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={styles.placesContainer}
            data={places}
            numColumns={2}
            renderItem={({item, index}) => renderPlaceItem(item, index)}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={footerComponent}
            ListHeaderComponent={headerComponent}
            onEndReached={loadPlaces}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    height: '100%',
  },
  textStyle: {
    color: Colors.blueTitleColor,
    fontSize: Style.fontSize.h4,
    fontWeight: 'bold',
    padding: Style.paddingCardContainer,
    marginHorizontal: 20,
    marginTop: 20,
  },
  iconStyle: {
    fontSize: Style.iconSize,
    color: Colors.greenTitleColor,
  },
  button: {
    margin: 0,
    borderWidth: 1,
  },
  placesContainer: {
    margin: 5,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h4,
    marginStart: 20,
    marginBottom: 10,
  },
});

export default TravelScreen;
