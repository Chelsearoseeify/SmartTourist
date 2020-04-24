export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SELECT_FAV_PLACES = 'SELECT_FAV_PLACES';

export const setSelectedCity = city => {
  return {type: SET_SELECTED_CITY, city: city};
};

export const selectFavouritePlaces = cityId => {
  return {type: SELECT_FAV_PLACES, cityId};
};

export const toggleFavourite = (placeId, cityId, cityName, placeImage) => {
  return {type: TOGGLE_FAVOURITE, placeId, cityId, cityName, placeImage};
};
