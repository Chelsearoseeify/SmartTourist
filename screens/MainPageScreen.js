import React, { Component } from 'react';
import Colors from '../constants/Colors';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { PLACES } from './../data/dummy-data';

import PlaceCard from '../components/PlaceCard';
import SearchBar from '../components/SearchBar';
import MapButton from '../components/MapButton';
import CustomButton from './../components/CustomButton';

const MainPageScreen = ({ navigation }) => {

  const addTripHandler = () => {
    navigation.navigate('AddTrip')
  }

  const renderGridItem = itemData => {
    return (
      <PlaceCard
        name={itemData.item.name}
        imageUrl={itemData.item.imageUrl}
        onSelect={() => {
          navigation.navigate('Place', {
            placeId: itemData.item.id,
          });
        }}
      />
    );
  };

  const headerComponent = () => {
    return (
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
            style={{ color: Colors.blueTitleColor, fontWeight: 'bold' }}>
            Edinburgh
        </Text>
        </View>
        <View>
          <SearchBar />
        </View>
        <View>
          <CustomButton onPress={addTripHandler}/>
        </View>
        <View>
          <Text style={styles.textStyle}>Things to do</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.placesContainer}
        data={PLACES}
        numColumns={2}
        renderItem={renderGridItem}
        horizontal={false} 
        ListHeaderComponent={headerComponent}
        />
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroudColor,
    flex: 1,
    flexDirection: 'column',
  },
  textStyle: {
    color: Colors.blueTitleColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10,
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
    marginHorizontal: 20
  }
});

export default MainPageScreen;
