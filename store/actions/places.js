import CompletePlace from '../../models/CompletePlace';
export const CREATE_PLACE = 'CREATE_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const FETCH_PLACE = 'FETCH_PLACE';
export const EMPTY_PLACE = 'EMPTY_PLACE';
export const EMPTY_PLACES = 'EMPTY_PLACES';
export const SET_PLACE_TYPE = 'SET_TYPE';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const FETCH_PLACE_DESCRIPTION = 'FETCH_PLACE_DESCRIPTION';
export const ADD_PLACES_TO_LIST = 'ADD_PLACES_TO_LIST';
export const SET_QUERY_PREDICTIONS = 'SET_QUERY_PREDICTIONS';

import axios from 'axios';
import API_KEY from '../../constants/API_KEY';

import _ from 'lodash';
import SearchType from '../../constants/SearchType';

import placeRequest from '../../utils/placeRequest';
import autocompleteType from '../../constants/AutocompleteType';

export const emptyPlace = () => {
  return {type: EMPTY_PLACE};
};

export const emptyPlaces = () => {
  return {type: EMPTY_PLACES};
};

export const setSearchType = newType => {
  return {type: SET_SEARCH_TYPE, newType: newType};
};

export const setPlaceType = newType => {
  return {type: SET_PLACE_TYPE, newType: newType};
};

const getPhoto = async photo_reference => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photo_reference}&key=${API_KEY.API_KEY_PLACES}`;
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
      const result = await placeRequest(placeId);
      let place = new CompletePlace(
        result.place_id,
        result.name,
        cityId,
        result.types,
        result.photoUrl,
        result.rating,
        result.geometry,
        result.formatted_address,
        result.business_status,
        result.user_ratings_total,
        '',
      );

      //const place = await placeRequest(placeId);
      console.log(place);

      dispatch({type: ADD_PLACES_TO_LIST, places: [place]});
    } catch (error) {
      throw error;
    }
  };
};

export const fetchPlaceDescription = placeName => {
  var replacedPlaceName = placeName.split(' ').join('_');
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${replacedPlaceName}&redirects=true&exchars=800`;
  //const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${replacedPlaceName}&redirects=true`;
  console.log(url);
  return async dispatch => {
    const response = await axios.get(url);

    var page = Object.keys(response.data.query.pages);
    let description = response.data.query.pages[page].extract;
    //console.log(description);
    description = description.replace('<p class="mw-empty-elt">\n</p>', '');
    description = description.replace(/(\r\n|\n|\r)/gm, '');
    dispatch({type: FETCH_PLACE_DESCRIPTION, description});
  };
};

export const fetchPlacesFromGoogle = (
  city,
  searchType,
  placeType,
  pageToken,
) => {
  let url = `https://maps.googleapis.com/maps/api/place/`;
  const key = `&key=${API_KEY.API_KEY_PLACES}`;

  const textSearch = `textsearch/json?query=${
    city.name
  }+point+of+interest&location=${
    city.geometry.location.lat
  },${city.geometry.location.lng}&language=en`;

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
      console.log(res.data.results[0]);
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
      //console.log(loadedPlaces.length);
      dispatch({
        type: SET_PLACES,
        places: loadedPlaces,
        pageToken: res.data.next_page_token,
      });
      dispatch({
        type: ADD_PLACES_TO_LIST,
        places: loadedPlaces,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const getPlacesDetails = (placeIds, cityId, token = null) => {
  console.log(placeIds);
  console.log(cityId);
  return async dispatch => {
    try {
      const loadedPlaces = [];
      await Promise.all(
        placeIds.map(async placeId => {
          const place = await placeRequest(placeId, token);
          console.log(place);
          const completePlace = new CompletePlace(
            place.id,
            place.name,
            cityId,
            place.types,
            place.photoUrl,
            place.rating,
            place.geometry,
            place.formatted_address,
            '',
            place.user_ratings_total,
            '',
            place.international_phone_number,
            place.website
          )
          loadedPlaces.push(completePlace);
        }),
      );
      dispatch({type: ADD_PLACES_TO_LIST, places: loadedPlaces});
    } catch (error) {
      throw error;
    }
  };
};

export const queryAutocomplete = (token, queryString, searchType, location) => {
  return async dispatch => {
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${queryString}&key=${
      API_KEY.API_KEY_PLACES
    }&sessiontoken=${token}`;

    if(location){
      url += `&location=${location.lat},${location.lng}&radius=5000`;
    }

    if(searchType === autocompleteType.CITY){
      url += `&type=(cities)&language=en`;
    }

    const response = await axios.get(url);
    const predictions = response.data.predictions;

    dispatch({type: SET_QUERY_PREDICTIONS, predictions});
  };
};