import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/Buttons/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import Header from '../components/Header';
import {selectFavouritePlaces} from '../store/actions/favourites';
import FavouritePlaceCard from '../components/Cards/FavouritePlaceCard';

const GroupedPlacesScreen = props => {
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const {title, cityId} = route.params;
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const places = useSelector(
    state => state.favourites.selected_favourite_places,
  );
  //const cities = useSelector(state => state.places.favourite_cities);
  //const city = cities.find(city => city.cityId === props.route.params.cityId);
  const user = useSelector(state => state.user.data);
  //console.log(places);

  //this run whenever the component is loaded
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        await dispatch(selectFavouritePlaces(user.uid));
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [dispatch]);

  const renderGridItem = itemData => {
    console.log(itemData.item);
    return (
      <FavouritePlaceCard
        name={itemData.item.name}
        imageUrl={itemData.item.url}
        onSelect={() => {
          navigation.navigate('Place', {
            placeId: itemData.item.id,
            cityName: title,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton {...props} />
      <View style={styles.titleViewStyle}>
        <Header title={title} mapIcon={false} />
      </View>
      <View style={styles.cardViewStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.contentStyle}>
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={places}
                numColumns={2}
                renderItem={renderGridItem}
                horizontal={false}
                scrollEnabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const topSpace = 80;

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  cardViewStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentStyle: {
    padding: Style.paddingCard,
  },
  cardStyle: {
    marginTop: topSpace,
    padding: Style.paddingCardContainer,
    elevation: Style.elevation,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  titleViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: topSpace,
    flex: 1,
    position: 'absolute',
  },
});

export default GroupedPlacesScreen;
