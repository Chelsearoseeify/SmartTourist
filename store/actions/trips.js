export const CREATE_TRIP = 'CREATE_TRIP';
export const SET_TRIP_DATES = 'SET_TRIP_DATES';
export const SET_TRIP_CITY = 'SET_TRIP_CITY';
export const FETCH_TRIP_PLACES = 'FETCH_TRIP_PLACES';
export const SET_TRIP_PLACES = 'SET_TRIP_PLACES';
export const ADD_PLACE_TO_TRIP = 'ADD_PLACE_TO_TRIP';

import API_KEY from '../../constants/API_KEY';

import placeRequest from '../../utils/placeRequest';

export const createTrip = trip => {
  return { type: CREATE_TRIP, trip: trip }
}

export const setTripDates = dates => {
  return { type: SET_TRIP_DATES, dates: dates }
}

export const fetchTripPlaces = places => {
  return async dispatch => {
    let loadedPlaces = [];
    await Promise.all(places.map(async p => {
      loadedPlaces.push(await placeRequest(p));
    }))
    dispatch({ type: SET_TRIP_PLACES, places: loadedPlaces });
  }
}

export const setTripCity = (cityId, token) => {
  return async dispatch => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${cityId}&fields=name,geometry,photo&key=${API_KEY.API_KEY_PLACES}&sessiontoken=${token}`)
    const cityData = res.data.result;
    const city = new City(cityId, cityData.name, '', null, cityData.geometry);
    try {
      await database()
        .ref(`/cities/`)
        .child(cityId)
        .set({
          name: city.name,
          imageUrl: city.imageUrl,
          iconId: city.iconId,
          geometry: city.geometry,
          photoReference: city.photoRreference
        });

      dispatch({ type: SET_TRIP_CITY, cityId: cityId });
    } catch (err) {
      console.log(err);
    }
  }
}

export const addPlaceToTrip = (tripId, placeId, selections) => {
  return { type: ADD_PLACE_TO_TRIP, payload: {tripId: tripId, placeId: placeId, selections: selections } } 
}