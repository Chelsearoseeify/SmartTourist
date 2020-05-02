import FavFolder from './../../models/FavFolder';
export const SET_CARD_STYLE = 'SET_CARD_STYLE';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SELECT_FAV_PLACES = 'SELECT_FAV_PLACES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';

export const setCardStyle = cardtype => {
  return {type: SET_CARD_STYLE, cardtype};
};

export const selectFavouritePlaces = cityId => {
  return {type: SELECT_FAV_PLACES, cityId};
};

export const toggleFavourite = (placeId, cityId, cityName, placeImage) => {
  return {type: TOGGLE_FAVOURITE, placeId, cityId, cityName, placeImage};
};

export const addFavourite = (uid, placeId, cityId, cityName, placeImage) => {
  return async dispatch => {
    const response = await fetch(
      `https://smarttourist-275307.firebaseio.com/favourite_folders/${uid}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cityId, cityName, imageQueue, placeIds, counter}),
      },
    );
    const folder = await response.json();
    console.log(folder);
    dispatch({
      type: ADD_FAVOURITE,
      folder,
    });
  };
};
