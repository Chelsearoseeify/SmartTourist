import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Header from './../components/Header';
import Style from '../constants/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {fetchFavourites, setCardStyle} from './../store/actions/favourite';
import CardTypes from '../constants/CardTypes';
import FlatListBig from '../components/CustomBoard/FlatListBig';
import FlatListMedium from './../components/CustomBoard/FlatListMedium';

const FavouriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const favouriteCities = useSelector(
    state => state.favourites.favourite_cities,
  );
  const [oneColumn, setOneColumn] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.user);
  let Board = useSelector(state => state.favourites.style.board);

  //this run whenever the component is loaded
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchFavourites(user.userId));
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [dispatch]);

  const setCardStyleHandler = cardType => {
    dispatch(setCardStyle(cardType));
  };

  const addTripHandler = () => {
    navigation.navigate('AddTrip');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.titleViewStyle}>
          <Header title={'Favourites'} mapIcon={false} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.iconViewStyle}>
              <Icon
                style={styles.icon}
                name="th-large"
                onPress={() => {
                  setCardStyleHandler(CardTypes.FOUR_PICTURES);
                  setOneColumn(true);
                }}
              />
              <Icon
                style={styles.icon}
                name="th-list"
                onPress={() => {
                  setCardStyleHandler(CardTypes.THREE_PICTURES);
                  setOneColumn(false);
                }}
              />
              <Icon
                style={styles.icon}
                name="list"
                onPress={() => {
                  setCardStyleHandler(CardTypes.TWO_PICTURES);
                  setOneColumn(true);
                }}
              />
            </View>
            {oneColumn ? (
              <FlatListBig
                favouriteCities={favouriteCities}
                navigation={navigation}
              />
            ) : (
              <FlatListMedium
                favouriteCities={favouriteCities}
                navigation={navigation}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const topSpace = 70;

let styles = StyleSheet.create({
  cardViewStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  placesContainer: {
    marginHorizontal: 5,
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
    alignSelf: 'baseline',
    ...Style.shadow,
  },
  titleViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: topSpace,
    flex: 1,
    position: 'absolute',
  },
  contentViewStyle: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 20,
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

export default FavouriteScreen;
