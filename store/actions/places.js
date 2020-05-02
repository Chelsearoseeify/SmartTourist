import CompletePlace from '../../models/CompletePlace';
import database from '@react-native-firebase/database';
export const CREATE_PLACE = 'CREATE_PLACE';
export const SET_PLACES = 'SET_PLACES';
const API_KEY = 'AIzaSyBZnXD0YlNLMtcDswoLpkUTu_cBYP3Ud0w';

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
  return async dispatch => {
    const response = await fetch(
      'https://smarttourist-275307.firebaseio.com/places.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          cityId,
          types,
          url,
          rating,
          geometry,
          address,
          business_status,
          user_ratings_total,
        }),
      },
    );
    const resData = await response.json();
    dispatch({
      type: CREATE_PLACE,
    });
  };
};
