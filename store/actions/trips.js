export const CREATE_TRIP = 'CREATE_TRIP';
export const SET_TRIP_DATES = 'SET_TRIP_DATES';
export const SET_TRIP_CITY = 'SET_TRIP_CITY';
export const FETCH_TRIP_PLACES = 'FETCH_TRIP_PLACES';
export const FETCH_TRIPS = 'FETCH_TRIPS';
export const SET_TRIP_PLACES = 'SET_TRIP_PLACES';
export const ADD_PLACE_TO_TRIP = 'ADD_PLACE_TO_TRIP';
export const REMOVE_PLACE_FROM_TRIP = 'REMOVE_PLACE_FROM_TRIP';
import City from '../../models/City';
import Trip from '../../models/Trip';

import database from '@react-native-firebase/database';
import placeRequest from '../../utils/placeRequest';

export const createTrip = trip => {
  return async (dispatch, getState) => {
    const user = getState().user;

    const ref = database().ref(`/trips/${user.userId}`).push();

    const newTrip = new Trip(
      ref.key,
      trip.name,
      trip.cityId,
      trip.startDate,
      trip.endDate,
      [],
    );

    newTrip.setPlaceIds();

    console.log(newTrip);

    const res = await ref.set({
      name: trip.name,
      cityId: trip.cityId,
      startDate: trip.startDate,
      endDate: trip.endDate,
      placeIds: newTrip.placeIds
    })

    dispatch({ type: CREATE_TRIP, trip: newTrip });
  }
}

export const fetchTrips = () => {
  return async (dispatch, getState) => {
    const user = getState().user;

    const ref = database().ref(`/trips/${user.userId}`);

    const res = await ref.once('value');

    let userTrips = [];
    res.forEach(child => {
      const placeIds = child.val().placeIds ? JSON.parse(child.val().placeIds) : null;
      const newTrip = new Trip(
        child.key,
        child.val().name,
        child.val().cityId,
        child.val().startDate,
        child.val().endDate,
        placeIds ? placeIds.ids : []
      );

      if(!placeIds){
        newTrip.setPlaceIds();
      }
      userTrips.push(newTrip);
    });

    dispatch({ type: FETCH_TRIPS, userTrips });
  }
}

export const removePlaceFromTrip = (tripId, dayIndex, placeId) => {
  return async (dispatch, getState) => {
    const trips = getState().trips.userTrips;
    const user = getState().user;

    const trip = trips.find(t => t.id === tripId);

    if (trip) {
      const newPlaceIds = trip.placeIds.map((day, index) => {
        if (index === dayIndex) {
          return day.filter(place => place !== placeId);
        }else{
          return day;
        }
      })

      console.log(newPlaceIds);

      const ref = database().ref(`/trips/${user.userId}/${trip.id}`);

      const res = await ref.update({
        'placeIds': newPlaceIds
      })

      dispatch({ type: REMOVE_PLACE_FROM_TRIP, payload: { tripId, newPlaceIds } });
    }
  }
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
    const res = await placeRequest(cityId, token);
    const city = new City(cityId, res.name, '', null, res.geometry);
    try {
      // await database()
      //   .ref(`/cities/`)
      //   .child(cityId)
      //   .set({
      //     name: city.name,
      //     imageUrl: city.imageUrl,
      //     iconId: city.iconId,
      //     geometry: city.geometry,
      //     photoReference: city.photoRreference
      //   });

      dispatch({ type: SET_TRIP_CITY, cityId: cityId });
    } catch (err) {
      console.log(err);
    }
  }
}

export const addPlaceToTrip = (trip, placeId, selections) => {
  return async (dispatch, getState) => {
    const user = getState().user;

    const ref = database().ref(`/trips/${user.userId}/${trip.id}`);

    let updatedPlaceIds = [...trip.placeIds];

    selections.map((selected, index) => {
      if (selected) {
        updatedPlaceIds[index].push(placeId);
      }
    });

    const res = await ref.update({
      'placeIds': JSON.stringify({ids: updatedPlaceIds})
    })

    dispatch({ type: ADD_PLACE_TO_TRIP, payload: { trip: trip, updatedPlaceIds: updatedPlaceIds } })
  }

}