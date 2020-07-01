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
//import RNColorThief from 'react-native-color-thief';

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
    console.log(places.length);
    if (places.length === 0) navigation.pop();
  });

  useEffect(() => {
    const stealColor = async () => {
      //let colors = await RNColorThief.getColor(favCity.photoUrl, 500, true);
      //setBackgroundColor(`rgb(${colors.r}, ${colors.g}, ${colors.b})`);
    };
    stealColor();
  });

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        dispatch(fetchFavouritePlaces(user.userId, cityId));
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadPlaces();
  }, [dispatch, fetchFavouritePlaces]);

  const removePlace = place => {
    dispatch(toggleFavourite(place, title, user.userId));
  };

  const renderGridItem = itemData => {
    return (
      <View style={{flex: 1, margin: Style.marginCard}}>
        {isDeleting ? (
          <View style={styles.deleteIconContainer}>
            <Icon
              style={styles.deleteIcon}
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
      <View style={styles.titleViewStyle}>
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
            <View style={styles.titleContainerStyle}>
              <Text style={styles.titleStyle}>{title}</Text>
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

const topSpace = 180;
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
    height: 200,
    width: '100%',
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
  deleteIconContainer: {
    padding: 0,
    alignItems: 'flex-end',
    marginHorizontal: -12,
    marginVertical: -5,
  },
  deleteIcon: {
    fontSize: Style.iconSize,
    color: Colors.blueTitleColor,
  },
  titleContainerStyle: {
    height: 180,
    flexDirection: 'column-reverse',
    paddingStart: Style.paddingCard,
    paddingBottom: Style.paddingCard,
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Style.fontSize.h2,
    marginLeft: Style.marginTopCardContainer,
  },
});

export default GroupedPlacesScreen;
