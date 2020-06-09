import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const FlatListBig = ({favouriteCities, navigation}) => {
  let Board = useSelector(state => state.favourites.style.board);

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
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        contentContainerStyle={styles.placesContainer}
        data={favouriteCities}
        numColumns={1}
        horizontal={false}
        renderItem={renderGridItem}
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

export default FlatListBig;
