import database from '@react-native-firebase/database';
import City from './../../models/City';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const FETCH_SELECTED_CITY = 'FETCH_SELECTED_CITY';
export const FETCH_BEAUTIFUL_CITIES = 'FETCH_BEAUTIFUL_CITIES';
export const FETCH_TOP_DESTINATIONS = 'FETCH_TOP_DESTINATIONS';
export const ADD_CITY = 'ADD_CITY';

export const fetchSelectedCity = cityId => {
  return async dispatch => {
    const res = await database()
      .ref(`cities/${cityId}`)
      .once('value');
    console.log(res);
    const city = new City(res.key, res.val().name);
    dispatch({type: FETCH_SELECTED_CITY, city});
  };
};

export const fetchTopDestinations = () => {
  return async dispatch => {
    try {
      let res = await database()
        .ref('/top_destinations')
        .once('value');
      let topDestinations = [];
      res.forEach(child => {
        topDestinations.push(
          new City(child.key, child.val().name, child.val().url),
        );
      });
      dispatch({type: FETCH_TOP_DESTINATIONS, topDestinations});
    } catch (error) {
      throw error;
    }
  };
};

export const fetchBeautifulCities = () => {
  return async dispatch => {
    try {
      let res = await database()
        .ref('/beautiful_cities')
        .once('value');
      let beautifulCities = [];
      res.forEach(child => {
        beautifulCities.push(new City(child.key, child.val().name));
      });
      dispatch({type: FETCH_BEAUTIFUL_CITIES, beautifulCities});
    } catch (error) {
      throw error;
    }
  };
};

export const addCity = () => {
  id = 'ChIJIyaYpQC4h0gRJxfnfHsU8mQ';
  return async dispatch => {
    database()
      .ref(`/top_destinations/`)
      .child(id)
      .set({
        name: 'Edinburgh',
        url:
          'https://static.brusselsairlines.com/_img/destinationPage2/UK/Edinburgh/Edinburgh-view.jpg',
      })
      .then(() => console.log('City added.'));

    dispatch({
      type: ADD_CITY,
    });
  };
};
