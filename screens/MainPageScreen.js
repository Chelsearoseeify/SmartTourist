import React, {Component} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Text, Button} from '@ui-kitten/components';

import PlaceCard from '../components/PlaceCard';
import SearchBar from '../components/SearchBar';
import MapButton from '../components/MapButton';
import CustomFloatingButton from '../components/Buttons/CustomFloatingButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Header from './../components/Header';
import Style from '../constants/Style';

const MainPageScreen = ({navigation}) => {
  const currentCity = useSelector(state => state.user.selected_city);
  const filteredPlaces = useSelector(state => state.user.selected_places);

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
    <View style={styles.container}>
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
          <Header title={currentCity.name} />
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
