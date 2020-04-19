import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import GridView from './../components/GridView';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import HorizontalScrolliew from '../components/HorizontalScrollView';
import {ScrollView} from 'react-native-gesture-handler';
import ThreePicturesBoard from './../components/CustomBoard/ThreePicturesBoard';
import {FAVOURITES} from './../data/dummy-data';

const FavouriteScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleViewStyle}>
        <Text category="h2" style={styles.titleStyle}>
          Favourites
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
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
                data={FAVOURITES}
                numColumns={2}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.size}
                    onPress={() => {
                      navigation.navigate('GroupedPlaces', {});
                    }}>
                    <ThreePicturesBoard
                      name={item.city.name}
                      places={item.places}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.city.id}
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
});

export default FavouriteScreen;
