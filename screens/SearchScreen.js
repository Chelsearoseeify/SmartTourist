import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import SearchBar from '../components/SearchBar';
import {CATEGORIES} from './../data/dummy-data';
import CategoryCard from './../components/CategoryCard';
import MapButton from '../components/MapButton';
import Header from '../components/Header';

export default class SearchScreen extends Component {
  renderGridItem = itemData => {
    return (
      <CategoryCard
        name={itemData.item.name}
        iconId={itemData.item.iconId}
        onSelect={() => {}}
      />
    );
  };

  headerComponent = () => {
    return (
      <View>
        <Header title={'Search'} />
        <SearchBar />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={CATEGORIES}
          numColumns={2}
          renderItem={this.renderGridItem}
          ListHeaderComponent={this.headerComponent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'column',
  },
});
