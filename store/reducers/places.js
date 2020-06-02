import _ from 'lodash';
import {
  SET_PLACES,
  CREATE_PLACE,
  FETCH_PLACE,
  SET_PLACE_TYPES,
  SET_SEARCH_TYPE,
} from './../actions/places';
import SearchType from '../../constants/SearchType';

const initialState = {
  places: [],
  filtered_places: [],
  search: SearchType.TEXT,
  type: '',
  place: {},
  types: [
    /* 'tourist_attraction', 'point_of_interest' */
  ],
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
    case CREATE_PLACE: {
      console.log('DONE');
      break;
    }
    case SET_PLACES: {
      let filters = {};
      if (state.types.length > 0) {
        filters = {
          types: types => state.types.find(x => types.includes(x)),
        };
      }
      const filteredPlaces = filterArray(action.places, filters);
      //filteredPlaces.map(place => console.log(place.name, place.types));
      return {...state, places: action.places, filtered_places: filteredPlaces};
    }
    case CREATE_PLACE: {
      console.log('Done');
    }
    case FETCH_PLACE: {
      return {...state, place: action.place};
    }
    case SET_PLACE_TYPES: {
      const types = _.xor(state.types, [action.newType]);
      console.log(types);
      return {...state, types: types};
    }
    case SET_SEARCH_TYPE: {
      return {...state, search: action.type};
    }
    default:
      return state;
  }
};

export default placesReducer;
