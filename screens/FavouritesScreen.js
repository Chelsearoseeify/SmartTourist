import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import GridView from './../components/GridView';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ThreePicturesBoard from './../components/CustomBoard/ThreePicturesBoard';
import {FAVOURITES} from './../data/dummy-data';
import {useSelector, useDispatch} from 'react-redux';
import Header from './../components/Header';
import {setFavourites} from '../store/actions/user';
import Style from '../constants/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {selectFavouritePlaces} from './../store/actions/user';
import CustomFloatingButton from './../components/Buttons/CustomFloatingButton';
import FourPicturesBoard from '../components/CustomBoard/FourPicturesBoard';
import TwoPicturesBoard from './../components/CustomBoard/TwoPicturesBoard';
import {setCardStyle} from '../store/actions/favourite';
import CardTypes from '../constants/CardTypes';

const FavouriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const favouriteFolders = useSelector(state => state.user.favourite_folders);
  let Board = useSelector(state => state.favourites.style.board);
  let numColumns = useSelector(state => state.favourites.style.numColumns);
  let oneColumn = false;

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
        counter={itemData.item.counter}
        onPress={() => {
          dispatch(selectFavouritePlaces(itemData.item.cityId));
          navigation.navigate('GroupedPlaces', {
            cityId: itemData.item.cityId,
            title: itemData.item.cityName,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
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
              data={favouriteFolders}
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
              data={favouriteFolders}
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
