import React, {useState, useEffect, useCallback} from 'react';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Style from '../constants/Style';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchBar2 from '../components/SearchBar2';
import PlaceCard from './../components/Cards/PlaceCard';
import SearchType from '../constants/SearchType';
import {fetchPlacesFromGoogle} from './../store/actions/places';
import {fetchFavourites} from './../store/actions/favourite';

const SearchedPlacesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const selectedCity = useSelector(state => state.cities.selected_city);
  const searchType = SearchType.NEARBY;
  const places = useSelector(state => state.places.places);
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  const user = useSelector(state => state.user.data);
  const pageToken = '';

  useEffect(() => {
    setIsLoading(true);
    try {
      console.log('ohi', selectedCity, searchType, route.params.type);
      dispatch(fetchFavourites(user.uid));
      //dispatch(fetchPlaces(selectedCity.id));
      dispatch(
        fetchPlacesFromGoogle(
          selectedCity,
          searchType,
          route.params.type,
          pageToken,
        ),
      );
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  const renderPlaceItem = (item, index) => {
    const ind = favouritePlaces.findIndex(place => place.id === item.id);
    return (
      <PlaceCard
        name={item.name}
        imageUrl={item.photoUrl}
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

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 0;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'space-between',
            }}
          >
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.pop();
                }}
              >
                <Icon
                  name="arrow-left"
                  size={Style.iconSize}
                  color={Colors.blueTitleColor}
                />
              </TouchableOpacity>
            </View>
            <SearchBar2
              style={{width: '90%'}}
              searchedValue={route.params.type}
            />
          </View>
          <View style={styles.cardStyle}>
            {isLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 600,
                }}
              >
                <ActivityIndicator
                  size="large"
                  color={Colors.greenTitleColor}
                />
              </View>
            ) : places.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 800, //540
                }}
              >
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: 350,
                    width: 160,
                  }}
                  source={require('./../assets/images/sadCloud.png')}
                />
              </View>
            ) : (
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={places}
                numColumns={2}
                renderItem={({item, index}) => renderPlaceItem(item, index)}
                horizontal={false}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  cardStyle: {
    marginTop: Style.marginTopCardContainer,
    padding: Style.paddingCardContainer,
    elevation: Style.elevation,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  placesContainer: {
    margin: 5,
  },
});

export default SearchedPlacesScreen;
