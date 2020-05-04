import FavouriteCity from './../../models/FavouriteCity';
import database from '@react-native-firebase/database';
import FavouritePlace from './../../models/FavouritePlace';
import ActionType from '../../constants/ActionType';
export const SET_CARD_STYLE = 'SET_CARD_STYLE';
export const TOGGLE_FAVOURITE_CITY = 'TOGGLE_FAVOURITE_CITY';
export const TOGGLE_FAVOURITE_PLACE = 'TOGGLE_FAVOURITE_PLACE';
export const FETCH_FAVOURITES = 'FETCH_FAVOURITES';
export const FETCH_FAVOURITE_PLACES = 'FETCH_FAVOURITE_PLACES';

export const setCardStyle = cardtype => {
  return {type: SET_CARD_STYLE, cardtype};
};

export const fetchFavouritePlaces = (uid, cityId) => {
  //console.log(cityId);
  return async dispatch => {
    try {
      let ref = database().ref(`/favourite_places/${uid}`);
      let res = await ref
        .orderByChild('cityId')
        .equalTo(cityId)
        .once('value');
      let selectedPlaces = [];
      res.forEach(child => {
        selectedPlaces.push(
          new FavouritePlace(
            child.val().cityId,
            child.key,
            child.val().name,
            child.val().url,
          ),
        );
      });

      dispatch({type: FETCH_FAVOURITE_PLACES, selectedPlaces});
    } catch (error) {
      throw error;
    }
  };
};

export const fetchFavourites = uid => {
  //console.log(uid);
  return async dispatch => {
    try {
      let cities_ref = database().ref(`/favourite_cities/${uid}`);
      let cities_res = await cities_ref.once('value');
      let favouriteCities = [];
      cities_res.forEach(child => {
        favouriteCities.push(
          new FavouriteCity(
            child.val().cityId,
            child.key,
            child.val().imageQueue,
            child.val().placesIds,
          ),
        );
      });
      let places_ref = database().ref(`/favourite_places/${uid}`);
      let places_res = await places_ref.once('value');
      let favouritePlaces = [];
      places_res.forEach(child => {
        favouritePlaces.push(
          new FavouritePlace(
            child.val().cityId,
            child.key,
            child.val().name,
            child.val().url,
          ),
        );
      });
      dispatch({type: FETCH_FAVOURITES, favouriteCities, favouritePlaces});
    } catch (error) {
      throw error;
    }
  };
};

export const toggleFavouritePlace = (uid, newPlace, actionType) => {
  console.log('place action type: ' + actionType);
  return async dispatch => {
    switch (actionType) {
      case ActionType.ADD_PLACE:
        database()
          .ref(`/favourite_places/${uid}`)
          .child(newPlace.placeId)
          .set({
            cityId: newPlace.cityId,
            name: newPlace.name,
            url: newPlace.url,
          })
          .then(() => console.log('Place data added.'));
        break;
      case ActionType.DELETE_PLACE:
        database()
          .ref(`/favourite_places/${uid}/${newPlace.placeId}`)
          .remove()
          .then(() => console.log('Place data removed.'));
        break;
      default:
        break;
    }

    dispatch({
      type: TOGGLE_FAVOURITE_PLACE,
      newPlace,
    });
  };
};

export const toggleFavouriteCity = (uid, newCity, actionType) => {
  console.log('city action type: ' + actionType);
  return async dispatch => {
    switch (actionType) {
      case ActionType.UPDATE_CITY:
        database()
          .ref(`/favourite_cities/${uid}`)
          .child(newCity.cityName)
          .update({
            cityId: newCity.cityId,
            imageQueue: newCity.imageQueue,
            placesIds: newCity.placesIds,
          })
          .then(() => console.log('Data updated.'));
        break;
      case ActionType.ADD_CITY:
        database()
          .ref(`/favourite_cities/${uid}`)
          .child(newCity.cityName)
          .set({
            cityId: newCity.cityId,
            imageQueue: newCity.imageQueue,
            placesIds: newCity.placesIds,
          })
          .then(() => console.log('City data set.'));
        break;
      case ActionType.DELETE_CITY:
        database()
          .ref(`/favourite_cities/${uid}/${newCity.cityName}`)
          .remove()
          .then(() => console.log('City data removed.'));
        break;
      default:
        break;
    }

    dispatch({
      type: TOGGLE_FAVOURITE_CITY,
      newCity,
      actionType,
    });
  };
};
