import React from 'react';

import SmallListCard from './ListCardCitySmall';
import BigListCard from './ListCardCityBig';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import ListHeader from './ListHeader';
import CardTypes from '../constants/CardTypes';
import {useDispatch} from 'react-redux';
import {setSelectedCity} from '../store/actions/user';

const HorizontalScrolliew = ({name, cities, elemType, navigation}) => {
  const dispatch = useDispatch();

  const onPressHandler = city => {
    dispatch(setSelectedCity(city));
    navigation.navigate('MainPage', {});
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
                    imageId={city.iconId}
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
