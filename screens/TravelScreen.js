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
import {Dimensions} from 'react-native';

//full height

const TravelScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const cachedCities = useSelector(state => state.cities.cachedCities);
  const selectedCity = useSelector(state => state.cities.selected_city);
  const places = useSelector(state => state.places.places);
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  const user = useSelector(state => state.user);
  const selectedType = useSelector(state => state.places.type);
  const searchType = useSelector(state => state.places.search);
  const pageToken = useSelector(state => state.places.pageToken);
  const height =
    places.length > 6 ? '100%' : Dimensions.get('window').height * (1 - 0.24);
  //console.log('pageToken ' + pageToken);
  /*  console.log(selectedType === '' ? 'no type' : selectedType, searchType);
   */
  const loadPlaces = async () => {
    setIsLoading(true);
    await dispatch(fetchFavourites(user.userId));
    await dispatch(
      fetchPlacesFromGoogle(selectedCity, searchType, selectedType, pageToken),
    );
    setIsLoading(false);
  };
  useEffect(() => {
    loadPlaces();
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
      <View
        style={{
          height: 105,
        }}>
        <Header
          title={selectedCity.name}
          navigation={navigation}
          onMapPress={mapHandler}
        />
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
