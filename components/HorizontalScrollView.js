import React from 'react';

import SmallListCard from './ListCardCitySmall';
import BigListCard from './ListCardCityBig';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Colors from '../constants/Colors';
import ListHeader from './ListHeader';
import CardTypes from '../constants/CardTypes';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HorizontalScrolliew = ({name, cities, elemType, navigation}) => {
  return (
    <View style={{marginVertical: 5}}>
      <ListHeader name={name} />
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {cities.map(city => {
            if (elemType === CardTypes.LIST_CARD_SMALL)
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('GroupedPlaces', {});
                  }}>
                  <SmallListCard name={city.name} imageId={city.iconId} />
                </TouchableOpacity>
              );
            else if (elemType === CardTypes.LIST_CARD_BIG)
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('GroupedPlaces', {title: city.name});
                  }}>
                  <BigListCard
                    name={city.name}
                    imageId={city.imageId}
                    style={{height: 220}}
                  />
                </TouchableOpacity>
              );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HorizontalScrolliew;
