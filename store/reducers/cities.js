import {CITIES} from '../../data/dummy-data';

const initialState = {
  cities: CITIES,
  top_destinations: CITIES,
  beautiful_cities: CITIES,
};

const cityReducer = (state = initialState, action) => {
  return state;
};

export default cityReducer;
