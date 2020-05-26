import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/Buttons/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import Header from '../components/Header';
import FavouritePlaceCard from './../components/Cards/FavouritePlaceCard';
import {fetchFavouritePlaces} from './../store/actions/favourite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GroupedPlacesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {title, cityId} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);
  const places = useSelector(
    state => state.favourites.selected_favourite_places,
  );
  const user = useSelector(state => state.user.data);

  //this run whenever the component is loaded
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchFavouritePlaces(user.uid, cityId));
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [dispatch, fetchFavouritePlaces, places]);

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
              onPress={() => {}}
            />
          </View>
        ) : null}

        <FavouritePlaceCard
          name={itemData.item.name}
          imageUrl={itemData.item.url}
          onSelect={() => {
            navigation.navigate('Place', {
              id: itemData.item.placeId,
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
      <View style={styles.titleViewStyle}>
        <Header title={title} mapIcon={false} />
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
});

export default GroupedPlacesScreen;
