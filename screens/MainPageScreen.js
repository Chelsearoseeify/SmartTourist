import React, {useEffect} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import {Text, Button} from '@ui-kitten/components';

import PlaceCard from '../components/PlaceCard';
import SearchBar from '../components/SearchBar';
import CustomFloatingButton from '../components/Buttons/CustomFloatingButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Header from './../components/Header';
import Style from '../constants/Style';
import {createPlace, fetchPlaces} from './../store/actions/user';

const MainPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const currentCity = useSelector(state => state.user.selected_city);
  const filteredPlaces = useSelector(state => state.user.set_places);
  //dispatch(createPlace('ciao', 'www.ghgoogog.it'));

  //this run whenever the component is loaded
  useEffect(() => {
    dispatch(fetchPlaces(currentCity.id, currentCity.name));
  }, [dispatch]);

  const addTripHandler = () => {
    navigation.navigate('AddTrip');
  };

  const renderGridItem = itemData => {
    return (
      <PlaceCard
        name={itemData.item.name}
        imageUrl={itemData.item.url}
        rating={itemData.item.rating}
        onSelect={() => {
          navigation.navigate('Place', {
            place: itemData.item,
            cityName: currentCity.name,
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
            <Header title={currentCity.name} navigation={navigation} />
            <SearchBar />
            <View style={styles.cardStyle}>
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={filteredPlaces}
                numColumns={2}
                renderItem={renderGridItem}
                horizontal={false}
                ListHeaderComponent={headerComponent}
                scrollEnabled={false}
              />
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
