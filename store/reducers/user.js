import City from './../../models/City';
import {FAVOURITES_ID, PLACES, FAV_FOLDERS} from './../../data/dummy-data';
import {
  SET_SELECTED_CITY,
  TOGGLE_FAVOURITE,
  SELECT_FAV_PLACES,
} from './../actions/user';
import FavouriteCity from './../../models/FavouriteCity';
import FavFolder from './../../models/FavFolder';

const fetchNearestPlaces = cityId => {
  //temporary
  const places = PLACES;
  const filteredPlaces = places.filter(place => cityId === place.cityId);
  return filteredPlaces;
};

const getPlaceFromId = placeId => {
  return PLACES.find(place => place.id === placeId);
};

const initialState = {
  data: {
    username: 'Chelsearoseeify',
    icon:
      'https://i.pinimg.com/originals/7b/08/f7/7b08f7217d51c631ed430e1743f11565.jpg',
  },
  selected_city: new City(
    'ci9',
    'Edinburgh',
    require('./../../assets/images/rome.jpg'),
    null,
  ),
  selected_places: fetchNearestPlaces('ci9'), //fetch near places of the city the user is in
  favourites_id: FAVOURITES_ID, //local
  favourite_folders: FAV_FOLDERS,
  selected_favourite_places: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CITY: {
      const filteredPlaces = fetchNearestPlaces(action.city.id);
      return {
        ...state,
        selected_city: action.city,
        selected_places: filteredPlaces,
      };
    }
    case TOGGLE_FAVOURITE: {
      //console.log(action.placeId, action.cityId, action.placeImage);
      const existingCity = state.favourites_id.find(
        city => city.id === action.cityId,
      );
      const existingFolder = state.favourite_folders.find(
        city => city.cityId === action.cityId,
      );
      if (existingCity) {
        //there is already at least one fav place
        const placeIndex = existingCity.placesIds.findIndex(
          place => place === action.placeId,
        );
        console.log(existingCity);
        console.log(existingFolder);
        if (placeIndex >= 0) {
          existingCity.placesIds.splice(placeIndex, 1);
          existingFolder.imageQueue.splice(placeIndex, 1);
          existingFolder.counter--;
          console.log('removd');
        } else {
          existingCity.placesIds.unshift(action.placeId);
          existingFolder.imageQueue.unshift(action.placeImage);
          existingFolder.counter++;
          console.log('added');
        }
        console.log(existingCity);
        console.log(existingFolder);
      } else {
        const newCity = new FavouriteCity(action.cityId, [action.placeId]);
        const newFolder = new FavFolder(
          action.cityId,
          action.cityName,
          [action.placeImage],
          1,
        );
        console.log('NEW FOLDER');
        const newState = {
          ...state,
          favourites_id: [...state.favourites_id, newCity],
          favourite_folders: [...state.favourite_folders, newFolder],
        };
        console.log(newState.favourite_folders);
        return newState;
      }

      break;
    }
    case SELECT_FAV_PLACES: {
      let selectFavouritePlaces = [];
      const placesIds = state.favourites_id.find(
        city => city.id === action.cityId,
      ).placesIds;
      placesIds.map(id => selectFavouritePlaces.push(getPlaceFromId(id)));
      console.log(selectFavouritePlaces);
      return {...state, selected_favourite_places: selectFavouritePlaces};
    }
    default:
      break;
  }
  return state;
};

export default userReducer;
