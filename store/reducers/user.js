import City from './../../models/City';
import {FAVOURITES_ID, PLACES} from './../../data/dummy-data';
import {SET_SELECTED_CITY} from './../actions/user';

const fetchNearestPlaces = cityId => {
  const places = PLACES;
  const filteredPlaces = places.filter(place => cityId === place.cityId);
  return filteredPlaces;
};

const initialState = {
  selectedCity: new City(
    'ci9',
    'Edinburgh',
    require('./../../assets/images/rome.jpg'),
    null,
  ),
  selectedPlaces: fetchNearestPlaces('ci9'), //fetch near places of the city the user is in
  favourites_id: FAVOURITES_ID, //local
  favourites: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CITY:
      const filteredPlaces = fetchNearestPlaces(action.city.id);
      return {
        ...state,
        selectedCity: action.city,
        selectedPlaces: filteredPlaces,
      };
    default:
      break;
  }
  return state;
};

export default userReducer;
