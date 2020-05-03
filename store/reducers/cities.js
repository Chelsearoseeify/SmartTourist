import {CITIES} from '../../data/dummy-data';
import {SET_SELECTED_CITY} from './../actions/cities';
import City from './../../models/City';

const initialState = {
  cities: CITIES,
  top_destinations: CITIES,
  beautiful_cities: CITIES,
  selected_city: new City(
    'ci6',
    'Paris',
    'https://lp-cms-production.imgix.net/image_browser/Effiel%20Tower%20-%20Paris%20Highlights.jpg?format=auto',
    require('./../../assets/images/icons/Paris.png'),
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
