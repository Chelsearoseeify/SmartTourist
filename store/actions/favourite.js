import FavouriteCity from './../../models/FavouriteCity';
import database from '@react-native-firebase/database';
export const SET_CARD_STYLE = 'SET_CARD_STYLE';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SELECT_FAV_PLACES = 'SELECT_FAV_PLACES';
export const FETCH_FAVOURITES = 'FETCH_FAVOURITES';

export const setCardStyle = cardtype => {
  return {type: SET_CARD_STYLE, cardtype};
};

export const selectFavouritePlaces = cityId => {
  return {type: SELECT_FAV_PLACES, cityId};
};

export const fetchFavourites = uid => {
  return async dispatch => {
    try {
      let ref = database().ref(`/favourite_cities/${uid}`);
      let res = await ref.once('value');
      const favourites = [];
      res.forEach(child => {
        favourites.push(
          new FavouriteCity(
            child.val().cityId,
            child.key,
            child.val().imageQueue,
            child.val().placesIds,
          ),
        );
      });
      console.log(favourites);
      dispatch({type: FETCH_FAVOURITES, favourites});
    } catch (error) {
      throw error;
    }
  };
};

export const addFavourite = (
  uid,
  placeId,
  cityId,
  cityName,
  placeImage,
  favourites,
) => {
  let favouriteCities = favourites;
  console.log(favouriteCities);
  console.log(cityId);
  return async dispatch => {
    const ref = database().ref(`/favourite_cities/${uid}`);
    let existingCity = favouriteCities.find(city => city.cityId === cityId);
    console.log(existingCity);
    let newCity = new FavouriteCity(cityId, cityName, [], []);

    if (existingCity) {
      console.log('THE CITY EXISTS');
      const placeIndex = existingCity.placesIds.findIndex(id => id === placeId);
      console.log(existingCity.placesIds, placeId, placeIndex);
      let placesIds = [...existingCity.placesIds];
      let imageQueue = [...existingCity.imageQueue];
      if (placeIndex >= 0) {
        console.log('THE PLACE EXISTS');
        placesIds.splice(placeIndex, 1);
        imageQueue.splice(placeIndex, 1);
      } else {
        console.log("THE PLACE DOESN'T EXIST");
        placesIds.unshift(placeId);
        imageQueue.unshift(placeImage);
      }
      ref
        .child(cityName)
        .update({
          placesIds: placesIds,
          imageQueue: imageQueue,
        })
        .then(() => console.log('Data updated.'));
      newCity.placesIds = placesIds;
      newCity.imageQueue = imageQueue;
    } else {
      console.log("THE CITY DOESN'T EXIST");
      newCity.placesIds = [placeId];
      newCity.imageQueue = [placeImage];
      ref
        .child(cityName)
        .set({cityId: cityId, imageQueue: [placeImage], placesIds: [placeId]})
        .then(() => console.log('Data set.'));
    }
    dispatch({
      type: TOGGLE_FAVOURITE,
      newCity,
    });
  };
};
