import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import ThreePicturesBoard from './ThreePicturesBoard';
import FourPicturesBoard from './FourPicturesBoard';

const FavBigView = ({favouriteCities, navigation}) => {
  const renderGridItem = ({item}) => {
    return (
      <FourPicturesBoard
        name={item.cityName}
        places={item.imageQueue}
        onPress={() => {
          navigation.navigate('GroupedPlaces', {
            cityId: item.cityId,
            title: item.cityName,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        contentContainerStyle={styles.placesContainer}
        data={favouriteCities}
        numColumns={1}
        horizontal={false}
        renderItem={item => renderGridItem(item)}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  placesContainer: {
    marginHorizontal: 5,
  },
});

export default FavBigView;
