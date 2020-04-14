import React from 'react';

import ListCard from '../components/ListCard';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const HorizontalScrolliew = ({name, cities}) => {
  return (
    <View>
      <View style={styles.subTitleViewStyle}>
        <Text style={styles.subtitleStyle}>{name}</Text>
        <Text style={styles.subSubtitleStyle}>See all</Text>
      </View>
      <View style={{height: 150, marginTop: 10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {cities.map(city => (
            <ListCard name={city.name} imageId={city.imageId} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 10,
    paddingStart: 5,
  },
  subSubtitleStyle: {
    color: Colors.greenButtonColor,
    fontSize: 20,
    paddingTop: 10,
    paddingStart: 5,
  },
});

export default HorizontalScrolliew;
