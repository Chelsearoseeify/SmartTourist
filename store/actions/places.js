import CompletePlace from '../../models/CompletePlace';
import database from '@react-native-firebase/database';
export const CREATE_PLACE = 'CREATE_PLACE';
export const UPDATE_PLACE = 'UPDATE_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const FETCH_PLACE = 'FETCH_PLACE';
export const EMPTY_PLACE = 'EMPTY_PLACE';
export const SET_PLACE_TYPE = 'SET_TYPE';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const FETCH_PLACE_DESCRIPTION = 'FETCH_PLACE_DESCRIPTION';
export const ADD_PLACES_TO_LIST = 'ADD_PLACES_TO_LIST';

const API_KEY = 'AIzaSyBZnXD0YlNLMtcDswoLpkUTu_cBYP3Ud0w';
import axios from 'axios';
import _ from 'lodash';
import SearchType from '../../constants/SearchType';

import placeRequest from '../../utils/placeRequest';
export const emptyPlace = () => {
  return {type: EMPTY_PLACE};
};

export const setSearchType = newType => {
  return {type: SET_SEARCH_TYPE, newType: newType};
};

export const setPlaceType = newType => {
  return {type: SET_PLACE_TYPE, newType: newType};
};

const getPhoto = async photo_reference => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photo_reference}&key=${API_KEY}`;
  try {
    const response = await axios.get(url, {responseType: 'blob'});
    return response.request.responseURL;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchPlace = (placeId, cityId) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=&key=${API_KEY}`,
      );
      const result = res.data.result;
      const photoUrl = await getPhoto(result.photos[0].photo_reference);
      let place = new CompletePlace(
        result.place_id,
        result.name,
        cityId,
        result.types,
        photoUrl,
        result.rating,
        result.geometry,
        result.formatted_address,
        result.business_status,
        result.user_ratings_total,
        '',
      );

      //const place = await placeRequest(placeId);
      console.log(place);

      dispatch({type: FETCH_PLACE, place});
    } catch (error) {
      throw error;
    }
  };
};

export const fetchPhoto = place => {
  return async dispatch => {
    const photoUrl = await getPhoto(place.photo_reference);
    newPlace = {...place, photoUrl: photoUrl};
    dispatch({type: UPDATE_PLACE, place: newPlace});
  };
};

export const fetchPlaceDescription = placeName => {
  return async dispatch => {
    const response = await axios.get(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=Clementinum&redirects=true`,
    );
    //console.log(response.query);
    dispatch({type: FETCH_PLACE_DESCRIPTION, response});
  };
};

export const fetchPlacesFromGoogle = (
  city,
  searchType,
  placeType,
  pageToken,
) => {
  let url = `https://maps.googleapis.com/maps/api/place/`;
  const key = `&key=${API_KEY}`;

  const textSearch = `textsearch/json?query=${
    city.name
  }+point+of+interest&language=en`;

  const nearbySearch = `nearbysearch/json?location=${
    city.geometry.location.lat
  },${city.geometry.location.lng}&radius=3000&type=${placeType}`;

  switch (searchType) {
    case SearchType.NEARBY:
      url = url.concat(nearbySearch, key);
      break;
    case SearchType.TEXT:
      url = url.concat(textSearch, key);
      break;
    default:
      break;
  }
  if (pageToken !== '') {
    url = url.concat(`&pagetoken=${pageToken}`);
  }

  console.log(url);

  return async dispatch => {
    try {
      const res = await axios.get(url);
      const loadedPlaces = [];
      await Promise.all(
        res.data.results.map(async place => {
          let photoUrl = '';
          try {
            photoUrl = await getPhoto(place.photos[0].photo_reference);
          } catch (error) {
            console.log(error);
          }

          loadedPlaces.push(
            new CompletePlace(
              place.place_id,
              place.name,
              city.id,
              place.types,
              photoUrl,
              place.rating,
              place.geometry,
              place.formatted_address,
              place.business_status,
              place.user_ratings_total,
              '',
            ),
          );
        }),
      );
      console.log(loadedPlaces.length);
      dispatch({
        type: SET_PLACES,
        places: loadedPlaces,
        pageToken: res.data.next_page_token,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updatePlace = place => {
  return {type: UPDATE_PLACE, place: place};
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

export const fetchMultiplePlaces = placeIds => {
  return async dispatch => {
    try {
      const loadedPlaces = [];
      await Promise.all(
        placeIds.map(async placeId => {
          const place = await placeRequest(placeId);
          loadedPlaces.push(place);
        }),
      );
      dispatch({type: ADD_PLACES_TO_LIST, places: loadedPlaces});
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
  //console.log(placeId);
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
