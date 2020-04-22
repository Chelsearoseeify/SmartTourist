import React, {Component} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Text, Button} from '@ui-kitten/components';

import PlaceCard from '../components/PlaceCard';
import SearchBar from '../components/SearchBar';
import MapButton from '../components/MapButton';
import CustomFloatingButton from './../components/CustomFloatingButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {addToFavourites} from '../store/actions/user';
import {PLACES_URL} from './../data/dummy-data';

const MainPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const currentCity = useSelector(state => state.user.selectedCity);
  const filteredPlaces = useSelector(state => state.user.selectedPlaces);

  const addTripHandler = () => {
    navigation.navigate('AddTrip');
  };

  const renderGridItem = itemData => {
    return (
      <PlaceCard
        name={itemData.item.name}
        imageUrl={itemData.item.imageUrl}
        onSelect={() => {
          console.log(itemData.item.cityId);
          dispatch(
            addToFavourites(
              itemData.item.id,
              itemData.item.cityId,
              currentCity.name,
              itemData.item.imageUrl,
            ),
          );
          navigation.navigate('Place', {
            placeId: itemData.item.id,
          });
        }}
      />
    );
  };

  const headerComponent = () => {
    return <Text style={styles.textStyle}>Things to do</Text>;
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
          elevation: 6,
        }}>
        <CustomFloatingButton onPress={addTripHandler} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 12,
              marginVertical: 10,
            }}>
            <MapButton />
            <Text
              category="h1"
              style={{color: Colors.blueTitleColor, fontWeight: 'bold'}}>
              {currentCity.name}
            </Text>
          </View>

          <View>
            <SearchBar />
          </View>
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
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    flexDirection: 'column',
  },
  textStyle: {
    color: Colors.blueTitleColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  iconStyle: {
    fontSize: 20,
    color: Colors.greenTitleColor,
  },
  button: {
    margin: 0,
    borderWidth: 1,
  },
  placesContainer: {
    marginHorizontal: 20,
  },
  cardStyle: {
    marginTop: 10,
    paddingTop: 20,
    marginBottom: 30,
    elevation: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});

export default MainPageScreen;
