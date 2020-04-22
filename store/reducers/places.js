import {PLACES, FAVOURITES_ID} from './../../data/dummy-data';
import {TOGGLE_FAVORITE} from '../actions/cities';
import FavFolder from '../../models/FavFolder';

const initialState = {
  places: PLACES,
  filteredPlaces: PLACES,
  favouritePlaces: FAVOURITES_ID,
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:

    default:
      return state;
  }
};

export default placesReducer;
