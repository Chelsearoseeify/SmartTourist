import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/Buttons/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import FavouritePlaceCard from './../components/Cards/FavouritePlaceCard';
import {
  toggleFavouriteCity,
  toggleFavouritePlace,
} from '../store/actions/favourite';
import {
  fetchFavouritePlaces,
  setFavouriteRequest,
} from './../store/actions/favourite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GroupedPlacesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {title, cityId} = route.params;
  const user = useSelector(state => state.user.data);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);
  const placeRequest = useSelector(state => state.favourites.place_request);
  const cityRequest = useSelector(state => state.favourites.city_request);
  const places = useSelector(
    state => state.favourites.selected_favourite_places,
  );

  //this run whenever the component is loaded
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        dispatch(fetchFavouritePlaces(user.uid, cityId));
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [dispatch, fetchFavouritePlaces, places]);

  useEffect(() => {
    const toggleFavs = async () => {
      if (Object.keys(cityRequest.city).length > 0) {
        dispatch(
          toggleFavouriteCity(
            user.uid,
            cityRequest.city,
            cityRequest.actionType,
          ),
        );
        dispatch(
          toggleFavouritePlace(
            user.uid,
            placeRequest.place,
            placeRequest.actionType,
          ),
        );
      }
    };
    toggleFavs();
  }, [dispatch, cityRequest]);

  const removePlace = place => {
    dispatch(setFavouriteRequest(place, title));
  };

  const renderGridItem = itemData => {
    return (
      <View style={{flex: 1, margin: Style.marginCard}}>
        {isDeleting ? (
          <View
            style={{
              padding: 0,
              alignItems: 'flex-end',
              marginHorizontal: -12,
              marginVertical: -5,
            }}>
            <Icon
              style={{
                fontSize: Style.iconSize,
                color: Colors.blueTitleColor,
              }}
              name="close"
              onPress={() => {
                removePlace(itemData.item);
              }}
            />
          </View>
        ) : null}

        <FavouritePlaceCard
          name={itemData.item.name}
          imageUrl={itemData.item.url}
          onSelect={() => {
            navigation.navigate('Place', {
              id: itemData.item.id,
              cityName: title,
            });
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton {...navigation} />
      <View />
      <View
        style={
          (styles.titleViewStyle,
          [{height: 150, width: '100%', flex: 1, position: 'absolute'}])
        }>
        <ImageBackground
          source={{
            uri:
              'https://www.bblamacaroma.it//wp-content/uploads/2015/05/roma-2.jpg',
          }}
          style={styles.imageBackgroundStyle}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardViewStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.iconViewStyle}>
              <Icon
                style={styles.icon}
                name="pencil"
                onPress={() => {
                  isDeleting ? setIsDeleting(false) : setIsDeleting(true);
                }}
              />
            </View>
            <View style={styles.contentStyle}>
              <Text
                style={{
                  color: Colors.blueTitleColor,
                  fontWeight: 'bold',
                  fontSize: Style.fontSize.h2,
                  marginLeft: Style.marginTopCardContainer,
                }}>
                {title}
              </Text>
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={places}
                numColumns={2}
                renderItem={renderGridItem}
                horizontal={false}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const topSpace = 100;

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
    paddingHorizontal: Style.paddingCard,
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
  iconViewStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    fontSize: Style.iconSize,
    paddingHorizontal: 24,
    color: Colors.blueTitleColor,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
});

export default GroupedPlacesScreen;
