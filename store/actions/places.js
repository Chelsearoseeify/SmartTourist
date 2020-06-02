import CompletePlace from '../../models/CompletePlace';
import database from '@react-native-firebase/database';
export const CREATE_PLACE = 'CREATE_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const FETCH_PLACE = 'FETCH_PLACE';
export const SET_PLACE_TYPES = 'SET_TYPES';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const FETCH_PLACE_DESCRIPTION = 'FETCH_PLACE_DESCRIPTION';
const API_KEY = 'AIzaSyBZnXD0YlNLMtcDswoLpkUTu_cBYP3Ud0w';
import axios from 'axios';
import _ from 'lodash';
import SearchType from '../../constants/SearchType';

export const setSearchType = type => {
  return {type: SET_SEARCH_TYPE, type: type};
};

export const setPlaceTypes = newType => {
  return {type: SET_PLACE_TYPES, newType: newType};
};

const getPictures = async photo_reference => {
  /* const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photo_reference}&key=${API_KEY}`,
  ); */
  const response = {
    url:
      'https://www.wanderlustitalia.it/wp-content/uploads/2014/09/Copertina-Cattedrale-1280x720.jpg',
  };
  return response.url;
};

/* https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=50.0755381,14.4378005&radius=3000&type=church&key=AIzaSyBZnXD0YlNLMtcDswoLpkUTu_cBYP3Ud0w
 */
export const fetchPlace = placeId => {
  return async dispatch => {
    try {
      let ref = database().ref(`places/${placeId}`);
      let res = await ref.once('value');
      let place = new CompletePlace(
        res.key,
        res.val().name,
        res.val().cityId,
        res.val().types,
        res.val().url,
        res.val().rating,
        res.val().geometry,
        res.val().address,
        res.val().business_status,
        res.val().user_ratings_total,
        '',
      );

      dispatch({type: FETCH_PLACE, place});
    } catch (error) {
      throw error;
    }
  };
};

export const fetchPlaceDescription = placeName => {
  return async dispatch => {
    const response = await axios.get(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=Clementinum&redirects=true`,
    );
    console.log(response.query);
    dispatch({type: FETCH_PLACE_DESCRIPTION, response});
  };
};

export const fetchPlacesFromGoogle = (city, type, searchType) => {
  let url = `https://maps.googleapis.com/maps/api/place/`;
  const key = `&key=${API_KEY}`;
  const textSearch = `textsearch/json?query=${
    city.name
  }+point+of+interest&language=en`;
  const nearbySearch = `nearbysearch/json?location=${
    city.geometry.location.lat
  },${city.geometry.location.lng}&radius=3000&type=${type}`;

  switch (searchType) {
    case SearchType.NEARBY:
      url = url.concat(nearbySearch, key);
      break;
    case searchType.TEXT:
      url = url.concat(textSearch, key);
      break;
    default:
      break;
  }
  console.log(url);
  return async dispatch => {
    try {
      const res = await axios.get(url);
      const loadedPlaces = [];
      res.forEach(child => {
        loadedPlaces.push(
          new CompletePlace(
            child.key,
            child.val().name,
            child.val().cityId,
            child.val().types,
            'https://cdn.civitatis.com/belgica/bruselas/guia/grand-place.jpg',
            child.val().rating,
            child.val().geometry,
            child.val().address,
            child.val().business_status,
            child.val().user_ratings_total,
            '',
          ),
        );
      });
      dispatch({type: SET_PLACES, places: loadedPlaces});
    } catch (error) {
      throw error;
    }
  };
};

export const fetchPlaces = cityId => {
  return async dispatch => {
    try {
      let ref = database().ref('places');
      let res = await ref
        .orderByChild('cityId')
        .equalTo(cityId)
        .once('value');
      const loadedPlaces = [];
      res.forEach(child => {
        loadedPlaces.push(
          new CompletePlace(
            child.key,
            child.val().name,
            child.val().cityId,
            child.val().types,
            child.val().url,
            child.val().rating,
            child.val().geometry,
            child.val().address,
            child.val().business_status,
            child.val().user_ratings_total,
            '',
          ),
        );
      });
      dispatch({type: SET_PLACES, places: loadedPlaces});
    } catch (error) {
      throw error;
    }
  };
};

export const createPlace = (
  placeId,
  name,
  cityId,
  types,
  url,
  rating,
  geometry,
  address,
  business_status,
  user_ratings_total,
) => {
  console.log(placeId);
  return async dispatch => {
    database()
      .ref(`places/${placeId}`)
      .set({
        name: name,
        cityId: cityId,
        types: types,
        url: url,
        rating: rating,
        geometry: geometry,
        address: address,
        business_status: business_status,
        user_ratings_total: user_ratings_total,
      });
    dispatch({
      type: CREATE_PLACE,
    });
  };
};
