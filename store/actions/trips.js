export const CREATE_TRIP = 'CREATE_TRIP';
export const SET_TRIP_DATES = 'SET_TRIP_DATES';
export const SET_TRIP_CITY = 'SET_TRIP_CITY';

import API_KEY from '../../constants/API_KEY';

export const createTrip = trip => {
  return { type: CREATE_TRIP, trip: trip }
}

export const setTripDates = dates => {
  return { type: SET_TRIP_DATES, dates: dates }
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

      return { type: SET_TRIP_CITY, cityId: cityId }
    } catch (err) {
      console.log(err);
    }
  }
}