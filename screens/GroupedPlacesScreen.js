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
  toggleFavourite,
} from '../store/actions/favourite';
import {
  fetchFavouritePlaces,
  setFavouriteRequest,
} from './../store/actions/favourite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNColorThief from 'react-native-color-thief';

const GroupedPlacesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {title, cityId} = route.params;
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [error, setError] = useState(false);
  /* const placeRequest = useSelector(state => state.favourites.place_request);
  const cityRequest = useSelector(state => state.favourites.city_request); */
  const cities = useSelector(state => state.cities.cachedCities);
  const favCity = cities.find(c => c.id === cityId);
  const places = useSelector(
    state => state.favourites.selected_favourite_places,
  );

  useEffect(() => {
    const stealColor = async () => {
      let colors = await RNColorThief.getColor(favCity.photoUrl, 500, true);
      setBackgroundColor(`rgb(${colors.r}, ${colors.g}, ${colors.b})`);
    };
    stealColor();
  });

  const loadProduct = async () => {
    setIsLoading(true);
    await dispatch(fetchFavouritePlaces(user.userId, cityId));
    setIsLoading(false);
  };

  useEffect(() => {
    loadProduct();
  }, [dispatch, places]);

  /* 
  useEffect(() => {
    const toggleFavs = async () => {
      if (Object.keys(cityRequest.city).length > 0) {
        dispatch(
          toggleFavouriteCity(
            user.userId,
            cityRequest.city,
            cityRequest.actionType,
          ),
        );
        dispatch(
          toggleFavouritePlace(
            user.userId,
            placeRequest.place,
            placeRequest.actionType,
          ),
        );
      }
    };
    toggleFavs();
  }, [dispatch, cityRequest]); */

  const removePlace = place => {
    dispatch(toggleFavourite(place, title, user.userId));
    //dispatch(setFavouriteRequest(place, title));
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
          imageUrl={itemData.item.photoUrl}
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
      <BackButton navigation={navigation} />
      <View />
      <View
        style={
          (styles.titleViewStyle,
          [{height: 200, width: '100%', flex: 1, position: 'absolute'}])
        }>
        <ImageBackground
          source={{
            uri: favCity.photoUrl,
          }}
          style={styles.imageBackgroundStyle}
          resizeMode="cover">
          <LinearGradient
            colors={['transparent', backgroundColor]}
            start={{x: 0.8, y: 0.4}}
            end={{x: 0.72, y: 1.0}}
            locations={[0.1, 0.8]}
            style={{height: '100%'}}>
            <View
              style={{
                height: 160,
                flexDirection: 'column-reverse',
                paddingStart: Style.paddingCard,
                paddingBottom: Style.paddingCard,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: Style.fontSize.h2,
                  marginLeft: Style.marginTopCardContainer,
                }}>
                {title}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
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

const topSpace = 160;

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
    ...Style.shadow,
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
