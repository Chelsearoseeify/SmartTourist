export const SET_SELECTED_CITY = 'TOGGLE_FAVORITE';

export const setSelectedCity = city => {
  return {type: SET_SELECTED_CITY, city: city};
};
