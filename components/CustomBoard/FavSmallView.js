import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import ThreePicturesBoard from './ThreePicturesBoard';

const FavSmallView = ({favouriteCities, navigation}) => {
  const renderGridItem = ({item}) => {
    return (
      <ThreePicturesBoard
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
        numColumns={2}
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

export default FavSmallView;
