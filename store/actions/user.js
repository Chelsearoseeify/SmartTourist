import CompletePlace from '../../models/CompletePlace';
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

//no identifier, I will never dispatch this as an action
export const fetchPlaces = (cityId, cityName) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://smarttourist-275307.firebaseio.com/places.json`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const loadedPlaces = [];
      for (const key in data) {
        if (data[key].cityId === cityId) {
          loadedPlaces.push(
            new CompletePlace(
              data[key].name,
              data[key].cityId,
              data[key].types,
              data[key].url,
              data[key].rating,
              data[key].geometry,
              data[key].address,
              data[key].business_status,
              data[key].user_ratings_total,
              '',
            ),
          );
        }
      }
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
    console.log(resData);
    dispatch({
      type: CREATE_PLACE,
    });
  };
};
