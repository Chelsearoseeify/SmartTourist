import React, {useState, useEffect} from 'react';
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
import CustomFloatingButton from '../components/Buttons/CustomFloatingButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Header from './../components/Header';
import Style from '../constants/Style';
import {fetchPlaces} from './../store/actions/places';
import {fetchFavourites} from '../store/actions/favourite';

const MainPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const selectedCity = useSelector(state => state.cities.selected_city);
  const filteredPlaces = useSelector(state => state.places.places);
  const favouriteCities = useSelector(
    state => state.favourites.favourite_cities,
  );
  const favouritePlaces = useSelector(
    state => state.favourites.favourite_places,
  );
  //console.log(favouritePlaces);
  const user = useSelector(state => state.user.data);
  //dispatch(createPlace('ciao', 'www.ghgoogog.it'));
  //
  //this run whenever the component is loaded

  useEffect(() => {
    const loadPlaces = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchFavourites(user.uid));
        await dispatch(fetchPlaces(selectedCity.id));
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
      setIsLoading(false);
    };
    loadPlaces();
  }, [dispatch, fetchFavourites, fetchPlaces]);

  const addTripHandler = () => {
    navigation.navigate('AddTrip');
  };

  const renderGridItem = itemData => {
    const index = favouritePlaces.findIndex(
      place => place.placeId === itemData.item.id,
    );
    return (
      <PlaceCard
        name={itemData.item.name}
        imageUrl={itemData.item.url}
        rating={itemData.item.rating}
        icon={index >= 0 ? 'heartbeat' : 'heart'}
        onSelect={() => {
          navigation.navigate('Place', {
            id: itemData.item.id,
            cityName: selectedCity.name,
          });
        }}
      />
    );
  };

  const headerComponent = () => {
    return <Text style={styles.textStyle}>Things to do</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
            zIndex: 1,
            elevation: Style.elevation,
          }}>
          <CustomFloatingButton onPress={addTripHandler} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Header title={selectedCity.name} navigation={navigation} />
            <SearchBar />
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
                  scrollEnabled={false}
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

export default MainPageScreen;

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
