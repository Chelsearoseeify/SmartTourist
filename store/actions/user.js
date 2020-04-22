export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';

export const setSelectedCity = city => {
  return {type: SET_SELECTED_CITY, city: city};
};

export const addToFavourites = (placeId, cityId, cityName, placeImage) => {
  return {type: ADD_TO_FAVOURITE, placeId, cityId, cityName, placeImage};
};
