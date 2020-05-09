import {CITIES} from '../../data/dummy-data';
import {
  FETCH_SELECTED_CITY,
  FETCH_BEAUTIFUL_CITIES,
  FETCH_TOP_DESTINATIONS,
} from './../actions/cities';
import City from './../../models/City';

const initialState = {
  cities: [],
  top_destinations: [],
  beautiful_cities: [],
  selected_city: {},
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELECTED_CITY: {
      return {
        ...state,
        selected_city: action.city,
      };
    }
    case FETCH_BEAUTIFUL_CITIES: {
      return {
        ...state,
        beautiful_cities: action.beautifulCities,
      };
    }
    case FETCH_TOP_DESTINATIONS: {
      return {
        ...state,
        top_destinations: action.topDestinations,
      };
    }
    default:
      return state;
  }
};

export default cityReducer;
