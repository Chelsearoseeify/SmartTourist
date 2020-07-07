import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { View } from 'react-native';

import HorizontalScrollView from '../components/HorizontalScrollView';
import SmallListCard from '../components/Cards/ListCardCitySmall';

import { fetchBeautifulCities } from '../store/actions/cities';

let cityIcons = new Map();
cityIcons.set('Barcelona', require('../assets/images/icons/barcelonaIcon.png'));
cityIcons.set('New York', require('../assets/images/icons/newYorkIcon.png'));
cityIcons.set('Rome', require('../assets/images/icons/romeIcon.png'));
cityIcons.set('Paris', require('../assets/images/icons/parisIcon.png'));
cityIcons.set('London', require('../assets/images/icons/londonIcon.png'));

const BeautifulCities = ({ onCitySelected }) => {
  const dispatch = useDispatch();
  const beautifulCities = useSelector(state => state.cities.beautiful_cities);

  useEffect(() => {
    const loadBeautifulCities = async () => {
      try {
        await dispatch(fetchBeautifulCities());
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadBeautifulCities();
  }, [dispatch, fetchBeautifulCities]);

  return (
    <HorizontalScrollView
      name={'Beautiful cities'}
      paddingLeft={20}
      onMoreTap={() => {
        console.log('See beautiful cities');
      }}
      height={170}
      isThereMore={false}>
      {beautifulCities.map(city => {
        return (
          <SmallListCard
            name={city.name}
            imageId={cityIcons.get(city.name)}
            onPress={() => onCitySelected(city)}
          />
        );
      })}
    </HorizontalScrollView>
  );
};

export default BeautifulCities;
