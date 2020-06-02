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
import {fetchPlaces, createPlace} from '../store/actions/places';
import {fetchFavourites} from '../store/actions/favourite';
import {LABELS} from '../data/dummy-data';
import {setPlaceTypes} from './../store/actions/places';

const TravelScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const selectedCity = useSelector(state => state.cities.selected_city);
  const filteredPlaces = useSelector(state => state.places.filtered_places);
  const [types, setTypes] = useState(useSelector(state => state.places.types));
  const searchType = useSelector(state => state.places.search);
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  const user = useSelector(state => state.user.data);

  const loadPlaces = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(fetchFavourites(user.uid));
      dispatch(fetchPlaces(selectedCity.id));
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

  const renderGridItem = itemData => {
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

  const toggleType = newType => {
    const newTypeList = [...types];
    const index = types.findIndex(type => type === newType);
    if (index >= 0) newTypeList.splice(index, 1);
    else newTypeList.push(newType);
    setTypes(newTypeList);
    dispatch(setPlaceTypes(newType));
  };

  const headerComponent = () => {
    return <Text style={styles.textStyle}>Things to do</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Header
              title={selectedCity.name}
              navigation={navigation}
              onMapPress={mapHandler}
            />
            {/* <SearchBar /> */}
            <View style={{marginVertical: 10, marginHorizontal: 20}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {LABELS.map(label => (
                  <CustomLabelButton
                    text={label.name}
                    toggleList={() => toggleType(label.type)}
                    active={
                      types.findIndex(t => t === label.type) >= 0 ? true : false
                    }
                  />
                ))}
              </ScrollView>
            </View>
            {/*  */}
            <View style={styles.cardStyle}>
              {isLoading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 600,
                  }}>
                  <ActivityIndicator
                    size="large"
                    color={Colors.greenTitleColor}
                  />
                </View>
              ) : (
                <FlatList
                  contentContainerStyle={styles.placesContainer}
                  data={filteredPlaces}
                  numColumns={2}
                  renderItem={renderGridItem}
                  horizontal={false}
                  ListHeaderComponent={headerComponent}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
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
    marginHorizontal: 5,
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
