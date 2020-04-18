import React, {Component} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {PLACES} from './../data/dummy-data';

import PlaceCard from '../components/PlaceCard';
import SearchBar from '../components/SearchBar';
import MapButton from '../components/MapButton';
import CustomButton from './../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';

const MainPageScreen = ({navigation}) => {
  const addTripHandler = () => {
    navigation.navigate('AddTrip');
  };

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
        <CustomButton onPress={addTripHandler} />
      </View>
      <ScrollView>
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
              Edinburgh
            </Text>
          </View>

          <View>
            <SearchBar />
          </View>
          <View style={styles.cardStyle}>
            <FlatList
              contentContainerStyle={styles.placesContainer}
              data={PLACES}
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
