import React from 'react';

import SmallListCard from './Cards/ListCardCitySmall';
import BigListCard from './Cards/ListCardCityBig';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import ListHeader from './ListHeader';
import CardTypes from '../constants/CardTypes';
import {useDispatch} from 'react-redux';
import {fetchSelectedCity} from '../store/actions/cities';

let cityIcons = new Map();
cityIcons.set('Barcelona', require('./../assets/images/icons/Barcelona.png'));
cityIcons.set('Tokyo', require('./../assets/images/icons/Tokyo.png'));
cityIcons.set('New York', require('./../assets/images/icons/NewYork.png'));
cityIcons.set('Prague', require('./../assets/images/icons/Prague.png'));
cityIcons.set('Rome', require('./../assets/images/icons/Rome.png'));
cityIcons.set('Paris', require('./../assets/images/icons/Paris.png'));

const HorizontalScrolliew = ({name, cities, elemType, navigation}) => {
  const dispatch = useDispatch();

  const onPressHandler = city => {
    console.log(city);
    dispatch(fetchSelectedCity(city.id));
    navigation.navigate('Travel', {});
  };

  return (
    <View>
      <ListHeader name={name} />
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {cities.map(city => {
            switch (elemType) {
              case CardTypes.LIST_CARD_SMALL:
                return (
                  <SmallListCard
                    name={city.name}
                    imageId={cityIcons.get(city.name)}
                    onPress={() => onPressHandler(city)}
                  />
                );
              case CardTypes.LIST_CARD_BIG:
                return (
                  <BigListCard
                    name={city.name}
                    imageId={city.imageId}
                    onPress={() => onPressHandler(city)}
                  />
                );
              default:
                break;
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HorizontalScrolliew;
