import React, {useState, useEffect, useCallback} from 'react';
import Colors from '../constants/Colors';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PlaceCard from '../components/Cards/PlaceCard';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import {fetchFavourites} from '../store/actions/favourite';
import {fetchPlacesFromGoogle} from './../store/actions/places';
import _ from 'lodash';
import NoResult from '../components/NoResult';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchTrips} from './../store/actions/trips';
import SearchBar2 from './../components/SearchBar2';
import SearchType from '../constants/SearchType';

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

  const loadPlaces = async () => {
    setIsLoading(true);
    await dispatch(fetchFavourites(user.userId));
    await dispatch(
      fetchPlacesFromGoogle(
        selectedCity,
        SearchType.NEARBY,
        route.params.type,
        pageToken,
      ),
    );
    setIsLoading(false);
  };
  useEffect(() => {
    loadPlaces();
  }, [dispatch, selectedCity, searchType, selectedType]);

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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'space-between',
        }}>
        <View
          style={{justifyContent: 'center', marginHorizontal: 5, height: 55}}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Icon
              name="arrow-left"
              size={Style.iconSize}
              color={Colors.blueTitleColor}
            />
          </TouchableOpacity>
        </View>
        <SearchBar2 style={{width: '90%'}} searchedValue={route.params.type} />
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
            onEndReached={() => {
              dispatch(fetchFavourites(user.userId));
              dispatch(
                fetchPlacesFromGoogle(
                  selectedCity,
                  searchType,
                  selectedType,
                  pageToken,
                ),
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
