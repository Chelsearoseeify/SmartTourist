import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import GridView from '../components/GridView';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import HorizontalScrolliew from '../components/HorizontalScrollView';
import {ScrollView} from 'react-native-gesture-handler';
import ThreePicturesBoard from '../components/CustomBoard/ThreePicturesBoard';
import {PLACES} from '../data/dummy-data';
import BackButton from '../components/BackButton';
import PlaceCard from '../components/PlaceCard';

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

const GroupedPlacesScreen = props => {
  const {title} = props.route.params;
  const places = PLACES;
  return (
    <SafeAreaView style={styles.container}>
      <BackButton {...props} />
      <View style={styles.titleViewStyle}>
        <Text category="h2" style={styles.titleStyle}>
          {title}
        </Text>
      </View>
      <View style={styles.cardViewStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.contentStyle}>
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={places}
                numColumns={2}
                renderItem={renderGridItem}
                horizontal={false}
                scrollEnabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const topSpace = 80;

let styles = StyleSheet.create({
  cardViewStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentStyle: {
    marginVertical: 20,
  },
  size: {height: 210, width: 200},
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  cardStyle: {
    marginTop: topSpace,
    marginBottom: 30,
    elevation: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: '100%',
    backgroundColor: 'white',
  },
  titleViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 25,
    paddingBottom: 10,
    height: topSpace,
    flex: 1,
    position: 'absolute',
  },
  titleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
  },
  placesContainer: {
    marginHorizontal: 20,
  },
});

export default GroupedPlacesScreen;
