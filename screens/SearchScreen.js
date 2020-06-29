import React from 'react';
import {Text} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import {LABELS} from './../data/dummy-data';
import CategoryCard from './../components/Cards/CategoryCard';
import Style from '../constants/Style';
import TopDestinations from '../containers/TopDestinations';
import {useDispatch} from 'react-redux';
import {resetPlaceTypes, setSearchType} from './../store/actions/places';
import SearchBar2 from './../components/SearchBar2';
import SearchType from '../constants/SearchType';
import BeautifulCities from './../containers/BeautifulCities';

const SearchScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const renderGridItem = itemData => {
    return (
      <View style={{flex: 1, margin: Style.marginSmallCard}}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <SearchBar2 />

          <View style={styles.cardStyle}>
            <View style={{marginEnd: -5, marginTop: 10}}>
              <TopDestinations {...navigation} />
            </View>
            <View style={{marginEnd: -5, marginTop: 10}}>
              <BeautifulCities {...navigation} />
            </View>

            <Text style={styles.subtitleStyle}>Categories</Text>
            <FlatList
              data={LABELS}
              numColumns={2}
              renderItem={renderGridItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
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
