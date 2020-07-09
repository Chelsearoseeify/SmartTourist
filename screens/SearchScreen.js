import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LABELS } from './../data/dummy-data';
import CategoryCard from './../components/Cards/CategoryCard';
import Style from '../constants/Style';
import TopDestinations from '../containers/TopDestinations';
import { useSelector, useDispatch } from 'react-redux';
import BeautifulCities from './../containers/BeautifulCities';
import PlaceSearch from '../components/Inputs/PlaceSearch';

import { getPlacesDetails } from '../store/actions/places';

import autocompleteType from '../constants/AutocompleteType';

const SearchScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(state => state.cities.selected_city);

  const querySelectedHandler = async (id, t) => {
    await dispatch(getPlacesDetails([id], selectedCity.id, t));
    navigation.navigate('Place', {
      id: id,
      placeName: selectedCity.name,
      cityName: selectedCity.name,
      cityId: selectedCity.id,
    });
  }

  const renderGridItem = itemData => {
    return (
      <View style={{ flex: 1, margin: Style.marginSmallCard }}>
        <CategoryCard
          name={itemData.item.name}
          imageUrl={itemData.item.url}
          onSelect={() => {
            navigation.navigate('SearchedPlaces', {
              type: itemData.item.type,
            });
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 15 }}>
            <PlaceSearch
              onQuerySelected={(cityName, cityId, token) => {
                querySelectedHandler(cityId, token);
              }}
              searchType={autocompleteType.PLACE}
              iconName="magnify"
              placeholder="Type a place name"
              location={selectedCity.geometry.location}
              inputPlaceholder="Search for a place"
            />
          </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.cardStyle}>
            <View style={{ marginEnd: -5, marginTop: 20 }}>
              <TopDestinations {...navigation} />
            </View>
            <View style={{ marginEnd: -5, marginTop: 10 }}>
              <BeautifulCities {...navigation} />
            </View>

            <Text style={styles.subtitleStyle}>Categories</Text>
            <View style={{ paddingBottom: 20 }}>
              <FlatList
                data={LABELS}
                numColumns={2}
                renderItem={renderGridItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  cardStyle: {
    marginTop: Style.marginTopCardContainer,
    padding: Style.paddingCardContainer,
    ...Style.shadow,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h5,
    marginStart: 20,
    marginVertical: 10,
  },
});

export default SearchScreen;
