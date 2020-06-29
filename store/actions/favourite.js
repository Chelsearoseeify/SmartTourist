import FavouriteCity from './../../models/FavouriteCity';
import database from '@react-native-firebase/database';
import FavouritePlace from './../../models/FavouritePlace';
import ActionType from '../../constants/ActionType';
export const SET_CARD_STYLE = 'SET_CARD_STYLE';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const TOGGLE_FAVOURITE_CITY = 'TOGGLE_FAVOURITE_CITY';
export const TOGGLE_FAVOURITE_PLACE = 'TOGGLE_FAVOURITE_PLACE';
export const FETCH_FAVOURITES = 'FETCH_FAVOURITES';
export const FETCH_FAVOURITE_PLACES = 'FETCH_FAVOURITE_PLACES';
export const SET_FAVOURITE_REQUEST = 'SET_FAVOURITE_REQUEST';

export const setFavouriteRequest = (place, cityName) => {
  return {type: SET_FAVOURITE_REQUEST, place, cityName};
};

export const setCardStyle = cardtype => {
  return {type: SET_CARD_STYLE, cardtype};
};

export const fetchFavouritePlaces = (userId, cityId) => {
  //console.log(cityId);
  return async dispatch => {
    try {
      let ref = database().ref(`/favourite_places/${userId}`);
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
            child.val().photoUrl,
          ),
        );
      });

      dispatch({type: FETCH_FAVOURITE_PLACES, selectedPlaces});
    } catch (error) {
      throw error;
    }
  };
};

export const fetchFavourites = userId => {
  //userId = 'D0aDtWpCmSgvIW8Y9EBxx2lSuBk2';
  return async dispatch => {
    try {
      let cities_ref = database().ref(`/favourite_cities/${userId}`);
      let cities_res = await cities_ref.once('value');
      //console.log(cities_res);
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
      let places_ref = database().ref(`/favourite_places/${userId}`);
      let places_res = await places_ref.once('value');
      //console.log(places_res);
      let favouritePlaces = [];
      places_res.forEach(child => {
        favouritePlaces.push(
          new FavouritePlace(
            child.val().cityId,
            child.key,
            child.val().name,
            child.val().photoUrl,
          ),
        );
      });
      dispatch({type: FETCH_FAVOURITES, favouriteCities, favouritePlaces});
    } catch (error) {
      throw error;
    }
  };
};

export const toggleFavourite = (place, cityName, userId) => {
  return async (dispatch, getState) => {
    const favouriteCities = getState().favourites.favourite_cities;
    const existingCity = favouriteCities.find(
      city => city.cityId === place.cityId,
    );
    let city = new FavouriteCity(place.cityId, cityName, [], []);
    let deleteCity = false;
    /*     console.log(place);
    console.log(existingCity); */
    if (existingCity) {
      city.placesIds = [...existingCity.placesIds];
      city.imageQueue = [...existingCity.imageQueue];
      console.log('THE CITY EXISTS');
      const placeIndex = city.placesIds.findIndex(id => id === place.id);
      if (placeIndex >= 0) {
        console.log('THE PLACE EXISTS');
        city.placesIds.splice(placeIndex, 1);
        city.imageQueue.splice(placeIndex, 1);
        //delete place
        database()
          .ref(`/favourite_places/${userId}/${place.id}`)
          .remove()
          .then(() => console.log('Place data removed.'));

        if (city.placesIds.length === 0) {
          //delete city
          database()
            .ref(`/favourite_cities/${userId}/${cityName}`)
            .remove()
            .then(() => console.log('City data removed.'));
          deleteCity = true;
        } else
          database()
            .ref(`/favourite_cities/${userId}`)
            .child(cityName)
            .update({
              cityId: place.cityId,
              imageQueue: city.imageQueue,
              placesIds: city.placesIds,
            })
            .then(() => console.log('Data updated.'));
      } else {
        console.log("THE PLACE DOESN'T EXIST");
        city.placesIds.unshift(place.id);
        city.imageQueue.unshift(place.photoUrl);
        database()
          .ref(`/favourite_places/${userId}`)
          .child(place.id)
          .set({
            cityId: place.cityId,
            name: place.name,
            photoUrl: place.photoUrl,
          })
          .then(() => console.log('Place data added.'));
        database()
          .ref(`/favourite_cities/${userId}`)
          .child(cityName)
          .update({
            cityId: place.cityId,
            imageQueue: city.imageQueue,
            placesIds: city.placesIds,
          })
          .then(() => console.log('Data updated.'));
        //icon = 'cards-heart';
      }
    } else {
      console.log("THE CITY DOESN'T EXIST");
      city.placesIds = [place.id];
      city.imageQueue = [place.photoUrl];
      database()
        .ref(`/favourite_cities/${userId}`)
        .child(cityName)
        .set({
          cityId: place.cityId,
          imageQueue: [place.photoUrl],
          placesIds: [place.id],
        })
        .then(() => console.log('City data set.'));
      database()
        .ref(`/favourite_places/${userId}`)
        .child(place.id)
        .set({
          cityId: place.cityId,
          name: place.name,
          photoUrl: place.photoUrl,
        })
        .then(() => console.log('Place data added.'));
      //icon = 'cards-heart';
    }

    dispatch({
      type: TOGGLE_FAVOURITE,
      newPlace: place,
      newCity: city,
      deleteCity,
    });
  };
};

/* export const toggleFavouritePlace = (userId, newPlace, actionType) => {
  console.log('place action type: ' + actionType);
  return async dispatch => {
    switch (actionType) {
      case ActionType.ADD_PLACE:
        database()
          .ref(`/favourite_places/${userId}`)
          .child(newPlace.id)
          .set({
            cityId: newPlace.cityId,
            name: newPlace.name,
            photoUrl: newPlace.photoUrl,
          })
          .then(() => console.log('Place data added.'));
        break;
      case ActionType.DELETE_PLACE:
        database()
          .ref(`/favourite_places/${userId}/${newPlace.id}`)
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

export const toggleFavouriteCity = (userId, newCity, actionType) => {
  console.log('city action type: ' + actionType);
  return async dispatch => {
    switch (actionType) {
      case ActionType.UPDATE_CITY:
        console.log(newCity.imageQueue);
        database()
          .ref(`/favourite_cities/${userId}`)
          .child(newCity.cityName)
          .update({
            cityId: newCity.cityId,
            imageQueue: newCity.imageQueue,
            placesIds: newCity.placesIds,
          })
          .then(() => console.log('Data updated.'));
        break;
      case ActionType.ADD_CITY:
        console.log(newCity.imageQueue);
        database()
          .ref(`/favourite_cities/${userId}`)
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
          .ref(`/favourite_cities/${userId}/${newCity.cityName}`)
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
}; */
