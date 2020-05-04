import {CITIES} from '../../data/dummy-data';
import {SET_SELECTED_CITY} from './../actions/cities';
import City from './../../models/City';

const initialState = {
  cities: CITIES,
  top_destinations: CITIES,
  beautiful_cities: CITIES,
  selected_city: new City(
    'ci8',
    'Rome',
    'https://www.bblamacaroma.it//wp-content/uploads/2015/05/roma-2.jpg',
    require('./../../assets/images/icons/Rome.png'),
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
