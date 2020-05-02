import {PLACES} from './../../data/dummy-data';
import {SET_PLACES, CREATE_PLACE} from './../actions/places';

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES: {
      return {...state, places: action.places};
    }
    case CREATE_PLACE: {
      console.log('Done');
    }

    default:
      return state;
  }
};

export default placesReducer;
