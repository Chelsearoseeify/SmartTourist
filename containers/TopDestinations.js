import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalScrollView from '../components/HorizontalScrollView';
import BigListCard from '../components/Cards/ListCardCityBig';
import { setSelectedCity } from '../store/actions/cities';
import { fetchTopDestinations } from '../store/actions/cities';
import { v4 as uuidv4 } from 'react-native-uuid';
import { View } from 'react-native';

const TopDestinations = navigation => {
  const dispatch = useDispatch();
  const topDestinations = useSelector(state => state.cities.top_destinations);

  useEffect(() => {
    const loadTopDestinations = async () => {
      try {
        await dispatch(fetchTopDestinations());
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadTopDestinations();
  }, [dispatch, fetchTopDestinations]);

  const onCitySelected = city => {
    console.log(`Selected city ${city.name}`);
    dispatch(setSelectedCity(city.id, uuidv4()));
    navigation.navigate('Travel', city);
  };

  return (
    <HorizontalScrollView
      name={'Top destinations'}
      paddingLeft={20}
      onMoreTap={() => {
        navigation.navigate('GroupedCities', { title: 'Top destinations' });
      }}
      height={210}>
      {topDestinations ? (
        topDestinations.map(city => {
          return (
            <BigListCard
              name={city.name}
              imageId={city.photoUrl}
              onPress={() => onCitySelected(city)}
            />
          );
        })
      ) : (
          <View>
            <BigListCard name={''} imageId={''} onPress={() => { }} />
            <BigListCard name={''} imageId={''} onPress={() => { }} />
            <BigListCard name={''} imageId={''} onPress={() => { }} />
          </View>
        )}
    </HorizontalScrollView>
  );
};

export default TopDestinations;
