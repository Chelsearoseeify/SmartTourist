import React, {useState, useEffect, useCallback} from 'react';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Style from '../constants/Style';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchBar2 from '../components/SearchBar2';
import SearchType from '../constants/SearchType';
import PlaceCard from './../components/Cards/PlaceCard';

const SearchedPlacesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState(SearchType.TEXT);
  const [error, setError] = useState();
  const selectedCity = useSelector(state => state.cities.selected_city);
  const filteredPlaces = useSelector(state => state.places.filtered_places);
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    try {
      console.log(filteredPlaces[0].name);
      dispatch(fetchFavourites(user.uid));
      dispatch(fetchPlaces('ChIJD7fiBh9u5kcRYJSMaMOCCwQ'));
      //dispatch(fetchPlacesFromGoogle(selectedCity, searchType));
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, filteredPlaces]);

  const renderPlaceItem = itemData => {
    const index = favouritePlaces.findIndex(
      place => place.id === itemData.item.id,
    );
    return (
      <PlaceCard
        name={itemData.item.name}
        imageUrl={itemData.item.url}
        rating={itemData.item.rating}
        icon={index >= 0 ? 'heart' : 'heart-outline'}
        onSelect={() => {
          navigation.navigate('Place', {
            id: itemData.item.id,
            placeName: itemData.item.name,
            cityName: selectedCity.name,
          });
        }}
      />
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
            }}>
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
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
            <SearchBar2
              style={{width: '90%'}}
              searchedValue={route.params.value}
            />
          </View>
          <View style={styles.cardStyle}>
            <FlatList
              contentContainerStyle={styles.placesContainer}
              data={filteredPlaces}
              numColumns={2}
              renderItem={renderPlaceItem}
              horizontal={false}
            />
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
