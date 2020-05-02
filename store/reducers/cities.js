import {CITIES} from '../../data/dummy-data';
import {SET_SELECTED_CITY} from './../actions/cities';
import City from './../../models/City';

const initialState = {
  cities: CITIES,
  top_destinations: CITIES,
  beautiful_cities: CITIES,
  selected_city: new City(
    'ci7',
    'Prague',
    'https://lp-cms-production.imgix.net/features/2019/07/shutterstockRF_300856853-f8561259593d.jpg',
    require('./../../assets/images/icons/Prague.png'),
  ),
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CITY: {
      return {
        ...state,
        selected_city: action.city,
      };
    }
    default:
      return state;
  }
};

export default cityReducer;
