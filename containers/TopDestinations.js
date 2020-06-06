import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HorizontalScrollView from '../components/HorizontalScrollView';
import BigListCard from '../components/Cards/ListCardCityBig';

import {fetchTopDestinations} from '../store/actions/cities';

const onCitySelected = city => {
  console.log(`Selected city ${city.name}`);
};

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

  return (
    <HorizontalScrollView
      name={'Top destinations'}
      paddingLeft={20}
      onMoreTap={() => {
        console.log('See top destinations');
        navigation.navigate('GroupedCities', {title: 'Top destinations'});
      }}>
      {topDestinations.map(city => {
        return (
          <BigListCard
            name={city.name}
            imageId={city.imageUrl}
            onPress={() => onCitySelected(city)}
          />
        );
      })}
    </HorizontalScrollView>
  );
};

export default TopDestinations;
