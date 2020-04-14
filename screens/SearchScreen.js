import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {StyleSheet, View, FlatList} from 'react-native';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CATEGORIES} from './../data/dummy-data';
import CategoryCard from './../components/CategoryCard';
import MapButton from '../components/MapButton';

const MapIcon = style => (
  <Icon style={styles.iconStyle} {...style} name="map-signs" />
);

const SearchScreen = () => {
  const renderGridItem = itemData => {
    return (
      <CategoryCard
        name={itemData.item.name}
        iconId={itemData.item.iconId}
        onSelect={() => {}}
      />
    );
  };

  return (
    <View style={styles.container}>
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
          Search
        </Text>
      </View>
      <View>
        <SearchBar />
      </View>
      <View>
        <FlatList
          data={CATEGORIES}
          numColumns={2}
          renderItem={renderGridItem}
        />
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroudColor,
    flex: 1,
    flexDirection: 'column',
  },

  iconStyle: {
    fontSize: 20,
    color: Colors.greenTitleColor,
  },
});

export default SearchScreen;
