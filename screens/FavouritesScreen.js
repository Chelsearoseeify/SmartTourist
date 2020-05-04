import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Header from './../components/Header';
import Style from '../constants/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  selectFavouritePlaces,
  fetchFavourites,
  setCardStyle,
} from './../store/actions/favourite';
import CustomFloatingButton from './../components/Buttons/CustomFloatingButton';
import CardTypes from '../constants/CardTypes';

const FavouriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const favouriteCities = useSelector(
    state => state.favourites.favourite_cities,
  );
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.user.data);
  let Board = useSelector(state => state.favourites.style.board);
  let numColumns = useSelector(state => state.favourites.style.numColumns);
  let oneColumn = false;

  //this run whenever the component is loaded
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchFavourites(user.uid));
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

  const renderGridItem = itemData => {
    return (
      <Board
        name={itemData.item.cityName}
        places={itemData.item.imageQueue}
        onPress={() => {
          navigation.navigate('GroupedPlaces', {
            cityId: itemData.item.cityId,
            title: itemData.item.cityName,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 30,
          zIndex: 1,
          elevation: Style.elevation,
          borderRadius: Style.borderRadiusRoundButton,
        }}>
        <CustomFloatingButton onPress={addTripHandler} />
      </View>
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
                  oneColumn = false;
                }}
              />
              <Icon
                style={styles.icon}
                name="th-list"
                onPress={() => {
                  setCardStyleHandler(CardTypes.THREE_PICTURES);
                  oneColumn = true;
                }}
              />
              <Icon
                style={styles.icon}
                name="list"
                onPress={() => {
                  setCardStyleHandler(CardTypes.TWO_PICTURES);
                  oneColumn = false;
                }}
              />
            </View>
            {oneColumn && (
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={favouriteCities}
                numColumns={1}
                horizontal={false}
                renderItem={renderGridItem}
                scrollEnabled={false}
                keyExtractor={item => item.cityId}
              />
            )}
            {!oneColumn && (
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={favouriteCities}
                numColumns={2}
                horizontal={false}
                renderItem={renderGridItem}
                scrollEnabled={false}
                keyExtractor={item => item.cityId}
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
