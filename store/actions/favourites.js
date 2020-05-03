export const SET_CARD_STYLE = 'SET_CARD_STYLE';
export const TOGGLE_FAVOURITE_CITY = 'TOGGLE_FAVOURITE_CITY';
export const TOGGLE_FAVOURITE_PLACE = 'TOGGLE_FAVOURITE_PLACE';
export const SELECT_FAV_PLACES = 'SELECT_FAV_PLACES';
export const FETCH_FAVOURITES = 'FETCH_FAVOURITES';

export const setCardStyle = cardtype => {
  return {type: SET_CARD_STYLE, cardtype};
};

export const selectFavouritePlaces = uid => {
  return async dispatch => {
    try {
      let ref = database().ref(`/favourite_places/${uid}`);
      let res = await ref.once('value');
      console.log(res);
      const selectedPlaces = [];
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
      console.log(selectedPlaces);
      dispatch({type: SELECT_FAV_PLACES, selectedPlaces});
    } catch (error) {
      throw error;
    }
  };
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

      dispatch({type: FETCH_FAVOURITES, favourites});
    } catch (error) {
      throw error;
    }
  };
};

export const toggleFavouritePlace = (uid, newPlace, actionType) => {
  console.log('place action type: ' + actionType);
  return async dispatch => {
    switch (actionType) {
      case 'ADD':
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
      case 'DELETE':
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
    const ref = database().ref(`/favourite_cities/${uid}`);
    switch (actionType) {
      case 'UPDATE':
        ref
          .child(newCity.cityName)
          .update({
            imageQueue: newCity.imageQueue,
            placesIds: newCity.placesIds,
          })
          .then(() => console.log('Data updated.'));
        break;
      case 'SET':
        ref
          .child(newCity.cityName)
          .set({
            cityId: newCity.cityId,
            imageQueue: newCity.imageQueue,
            placesIds: newCity.placesIds,
          })
          .then(() => console.log('City data set.'));

        break;
      default:
        break;
    }

    dispatch({
      type: TOGGLE_FAVOURITE_CITY,
      newCity,
    });
  };
};
