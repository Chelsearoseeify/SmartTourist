import {CITIES} from '../../data/dummy-data';
import {
  FETCH_SELECTED_CITY,
  FETCH_BEAUTIFUL_CITIES,
  FETCH_TOP_DESTINATIONS,
  SET_SELECTED_CITY,
  SET_QUERY_PREDICTIONS,
} from './../actions/cities';
import City from './../../models/City';

const initialState = {
  cities: [],
  top_destinations: [],
  beautiful_cities: [],
  selected_city: {
    geometry: {
      location: {lat: 50.0755381, lng: 14.4378005},
      viewport: {northeast: [Object], southwest: [Object]},
    },
    iconId: null,
    id: 'ChIJi3lwCZyTC0cRkEAWZg-vAAQ',
    imageUrl: '',
    name: 'Prague',
    photoReference: undefined,
  },
  queryPredictions: [],
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CITY: {
      console.log(action.city);
      return {
        ...state,
        selected_city: action.city,
      };
    }
    case SET_QUERY_PREDICTIONS: {
      return {
        ...state,
        queryPredictions: action.predictions,
      };
    }
    case FETCH_SELECTED_CITY: {
      console.log(action.city);
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
