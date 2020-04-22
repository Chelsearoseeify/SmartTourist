import City from './../../models/City';
import {FAVOURITES_ID, PLACES, FAV_FOLDERS} from './../../data/dummy-data';
import {SET_SELECTED_CITY, ADD_TO_FAVOURITE} from './../actions/user';
import FavouriteCity from './../../models/FavouriteCity';
import FavFolder from './../../models/FavFolder';

const fetchNearestPlaces = cityId => {
  //temporary
  const places = PLACES;
  const filteredPlaces = places.filter(place => cityId === place.cityId);
  return filteredPlaces;
};

const initialState = {
  selectedCity: new City(
    'ci9',
    'Edinburgh',
    require('./../../assets/images/rome.jpg'),
    null,
  ),
  selectedPlaces: fetchNearestPlaces('ci9'), //fetch near places of the city the user is in
  favourites_id: FAVOURITES_ID, //local
  favouriteFolders: FAV_FOLDERS,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CITY: {
      const filteredPlaces = fetchNearestPlaces(action.city.id);
      return {
        ...state,
        selectedCity: action.city,
        selectedPlaces: filteredPlaces,
      };
    }
    case ADD_TO_FAVOURITE: {
      //console.log(action.placeId, action.cityId, action.placeImage);
      const existingCity = state.favourites_id.find(
        city => city.id === action.cityId,
      );
      const existingFolder = state.favouriteFolders.find(
        city => city.cityId === action.cityId,
      );
      if (existingCity) {
        //there is already at least one fav place
        const placeIndex = existingCity.placesIds.findIndex(
          place => place === action.placeId,
        );
        if (placeIndex >= 0) {
          //selected place is already in fav
          console.log('Already liked');
        } else {
          existingCity.placesIds.unshift(action.placeId);
          existingFolder.imageQueue.unshift(action.placeImage);
          existingFolder.counter++;
        }
      } else {
        const newCity = new FavouriteCity(action.cityId, [action.placeId]);
        const newFolder = new FavFolder(
          action.cityId,
          action.cityName,
          [
            action.placeImage,
            'https://i.etsystatic.com/15374903/r/il/003f77/1722369502/il_570xN.1722369502_ka03.jpg',
            'https://i.etsystatic.com/15374903/r/il/003f77/1722369502/il_570xN.1722369502_ka03.jpg',
          ],
          1,
        );
        console.log('NEW FOLDER');
        const newState = {
          ...state,
          favourites_id: [...state.favourites_id, newCity],
          favouriteFolders: [...state.favouriteFolders, newFolder],
        };
        console.log(newState.favouriteFolders);
        return newState;
      }

      break;
    }
    default:
      break;
  }
  return state;
};

export default userReducer;
