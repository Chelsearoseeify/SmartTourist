/*This is an Example of Grid View in React Native*/
import React, {Component} from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
//import all the components we will need
import {LONDON} from './../data/dummy-data';

const GridView = () => {
  const renderGridItem = ({item}) => (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{margin: 2}}>
        <ImageBackground
          source={item}
          style={styles.imageThumbnail}
          resizeMode="cover"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <FlatList
        data={LONDON}
        renderItem={renderGridItem}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    width: '80%',
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default GridView;
