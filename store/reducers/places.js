import _ from 'lodash';
import {
  SET_PLACES,
  SET_PLACE_TYPE,
  SET_SEARCH_TYPE,
  ADD_PLACES_TO_LIST,
  EMPTY_PLACE,
  EMPTY_PLACES,
  FETCH_PLACE_DESCRIPTION,
  SET_QUERY_PREDICTIONS
} from './../actions/places';
import SearchType from '../../constants/SearchType';
import {LABELS} from '../../data/dummy-data';

const initialState = {
  places: [],
  cachedPlaces: [],
  search: SearchType.TEXT,
  type: '',
  description: '',
  place: {},
  pageToken: '',
  all_types: LABELS,
  types: [
    /* 'tourist_attraction', 'point_of_interest' */
  ],
  queryPredictions: [],
};

function filterArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES: {
      /* let filters = {};
      if (state.types.length > 0) {
        filters = {
          types: types => state.types.find(x => types.includes(x)),
        };
      } */
      //const places = filterArray(action.places, filters);
      //ChIJi3lwCZyTC0cRkEAWZg-vAAQ
      let places = [];
      if (action.places.length > 0) {
        const currentCityId = action.places[0].cityId;
        /* state.places.map((place, index) => console.log(index, place.name));
        action.places.map((place, index) => console.log(index, place.name)); */
        places = [...state.places, ...action.places];
        places = places.filter(place => place.cityId === currentCityId);
        /* places.map((place, index) => console.log(index, place.name)); */
      } else places = state.places;
      return {
        ...state,
        places: places,
        pageToken: action.pageToken,
      };
    }
    case EMPTY_PLACES: {
      return {...state, places: [], pageToken: ''};
    }
    case FETCH_PLACE_DESCRIPTION: {
      return {...state, description: action.description};
    }
    case EMPTY_PLACE: {
      return {...state, place: {}};
    }
    case SET_PLACE_TYPE: {
      let type = '';
      if (state.type !== action.newType) type = action.newType;
      return {
        ...state,
        type: type,
        pageToken: '',
        places: [],
      };
    }
    case SET_SEARCH_TYPE: {
      return {
        ...state,
        search: action.newType,
        pageToken: '',
        places: [],
      };
    }
    case SET_QUERY_PREDICTIONS: {
      return {
        ...state,
        queryPredictions: action.predictions,
      };
    }
    case ADD_PLACES_TO_LIST: {
      let updatedPlaces = [...state.cachedPlaces];
      action.places.map(actionPlace => {
        const foundIndex = updatedPlaces.findIndex(
          p => p.id === actionPlace.id,
        );
        if (foundIndex === -1) {
          updatedPlaces.push(actionPlace);
        }else{
          updatedPlaces[foundIndex] = actionPlace;
        }
      });
      //console.log(`updated places length: ${updatedPlaces.length}`);
      return {...state, cachedPlaces: updatedPlaces};
    }
    default:
      return state;
  }
};

export default placesReducer;
