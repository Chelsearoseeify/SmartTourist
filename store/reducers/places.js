import {PLACES} from './../../data/dummy-data';
import {SET_PLACES, CREATE_PLACE, FETCH_PLACE} from './../actions/places';

const initialState = {
  places: [],
  place: {},
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES: {
      return {...state, places: action.places};
    }
    case CREATE_PLACE: {
      console.log('Done');
    }
    case FETCH_PLACE: {
      return {...state, place: action.place};
    }

    default:
      return state;
  }
};

export default placesReducer;
