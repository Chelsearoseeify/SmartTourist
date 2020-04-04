import React, {Component} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import PlaceCard from '../components/PlaceCard';
import {PLACES} from './../data/dummy-data';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MapIcon = style => (
  <Icon style={styles.iconStyle} {...style} name="map-signs" />
);

const MainPageScreen = ({navigation}) => {
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 12,
          marginVertical: 10,
        }}>
        <Button
          style={styles.button}
          appearance="ghost"
          status="danger"
          icon={MapIcon}
          onPress={() => navigation.navigate('Map')}
        />
        <Text
          category="h1"
          style={{color: Colors.blueTitleColor, fontWeight: 'bold'}}>
          Edinburgh
        </Text>
      </View>
      <View>
        <SearchBar />
      </View>
      <View>
        <Text style={styles.textStyle}>Things to do</Text>
      </View>
      <View>
        <FlatList
          data={PLACES}
          numColumns={2}
          renderItem={renderGridItem}></FlatList>
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
  },
});

export default MainPageScreen;
