import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HorizontalScrollView from '../components/HorizontalScrollView';
import SmallListCard from '../components/Cards/ListCardCitySmall';

import { fetchBeautifulCities } from '../store/actions/cities';

let cityIcons = new Map();
cityIcons.set('Barcelona', require('../assets/images/icons/Barcelona.png'));
cityIcons.set('Tokyo', require('../assets/images/icons/Tokyo.png'));
cityIcons.set('New York', require('../assets/images/icons/NewYork.png'));
cityIcons.set('Prague', require('../assets/images/icons/Prague.png'));
cityIcons.set('Rome', require('../assets/images/icons/Rome.png'));
cityIcons.set('Paris', require('../assets/images/icons/Paris.png'));

const onCitySelected = (city) => {
    console.log(`Selected city ${city.name}`);
}

const BeautifulCities = props => {
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
            onMoreTap={() => { console.log('See beautiful cities') }}
        >
            {beautifulCities.map(city => {
                return <SmallListCard
                    name={city.name}
                    imageId={cityIcons.get(city.name)}
                    onPress={() => onCitySelected(city)}
                />
            })}
        </HorizontalScrollView>
    );
}


export default BeautifulCities;
