import React, {useState, useEffect, useCallback} from 'react';
import Colors from '../constants/Colors';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Text, Button} from '@ui-kitten/components';

import PlaceCard from '../components/Cards/PlaceCard';
import SearchBar from '../components/SearchBar';
import CustomLabelButton from '../components/Buttons/CustomLabelButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../components/Header';
import Style from '../constants/Style';
import {fetchFavourites} from '../store/actions/favourite';
import {
  setPlaceTypes,
  fetchPlacesFromGoogle,
  fetchPlaces,
} from './../store/actions/places';
import _ from 'lodash';
import SearchType from '../constants/SearchType';

const TravelScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const selectedCity = useSelector(state => state.cities.selected_city);
  const filteredPlaces = useSelector(state => state.places.filtered_places);
  const [types, setTypes] = useState(useSelector(state => state.places.types));
  const [searchType, setSearchType] = useState(SearchType.TEXT);
  const [allTypes, setAllTypes] = useState(
    useSelector(state => state.places.all_types),
  );
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  const user = useSelector(state => state.user.data);

  const loadPlaces = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(fetchFavourites(user.uid));
      //dispatch(fetchPlaces(selectedCity.id));
      dispatch(fetchPlacesFromGoogle(selectedCity, searchType));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, selectedCity, types]);

  useEffect(() => {
    setIsLoading(true);
    loadPlaces().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPlaces]);

  const mapHandler = () => {
    navigation.navigate('Mapf', {
      lat: selectedCity.geometry.location.lat,
      lng: selectedCity.geometry.location.lng,
    });
  };
  /* 
  const addPlaces = () => {
    filteredPlaces.map(place => {
      dispatch(
        createPlace(
          place.id,
          place.name,
          selectedCity.id,
          place.types,
          place.url,
          place.rating,
          place.geometry,
          place.address,
          place.business_status,
          place.user_ratings_total,
        ),
      );
    });
  }; */

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
          });
        }}
      />
    );
  };

  const renderTypeItem = item => {
    return (
      <CustomLabelButton
        text={item.name}
        toggleList={() => toggleType(item.type)}
        active={item.selected}
      />
    );
  };

  const toggleType = newType => {
    setTypes(_.xor(types, [newType]));
    dispatch(setPlaceTypes(newType));
  };

  const headerComponent = () => {
    return <Text style={styles.textStyle}>Things to do</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={selectedCity.name}
          navigation={navigation}
          onMapPress={mapHandler}
        />
        <View style={{flex: 1, paddingLeft: 10}}>
          <FlatList
            data={allTypes}
            renderItem={({item, index}) => renderTypeItem(item, index)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.cardStyle}>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 600,
              }}>
              <ActivityIndicator size="large" color={Colors.greenTitleColor} />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={styles.placesContainer}
              data={filteredPlaces}
              numColumns={2}
              renderItem={({item, index}) => renderPlaceItem(item, index)}
              horizontal={false}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
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
});

export default TravelScreen;

/*
  const sendData = () => {
    filteredPlaces.map(place => {
      dispatch(
        createPlace(
          place.name,
          'ci9',
          place.types,
          place.url,
          place.rating,
          place.geometry,
          place.address,
          place.business_status,
          place.user_ratings_total,
        ),
      );
    });
  }; */
