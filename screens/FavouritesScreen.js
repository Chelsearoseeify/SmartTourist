import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import GridView from './../components/GridView';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ThreePicturesBoard from './../components/CustomBoard/ThreePicturesBoard';
import {FAVOURITES} from './../data/dummy-data';
import {useSelector, useDispatch} from 'react-redux';
import {setFavourites} from '../store/actions/user';

const FavouriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const favouriteFolders = useSelector(state => state.user.favouriteFolders);

  const renderGridItem = itemData => {
    console.log(itemData.item.cityName);
    console.log(itemData.item.counter);
    console.log(itemData.item.imageQueue);
    return (
      <ThreePicturesBoard
        name={itemData.item.cityName}
        places={itemData.item.imageQueue}
        counter={itemData.item.counter}
        onPress={() => {
          navigation.navigate('GroupedPlaces', {});
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleViewStyle}>
        <Text category="h2" style={styles.titleStyle}>
          Favourites
        </Text>
      </View>
      <View style={styles.cardViewStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                height: 900,
                alignItems: 'center',
              }}>
              <FlatList
                data={favouriteFolders}
                numColumns={2}
                renderItem={renderGridItem}
                keyExtractor={item => item.cityId}
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
});

export default FavouriteScreen;
