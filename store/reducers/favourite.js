import {FAVOURITES, FAV_FOLDERS} from './../../data/dummy-data';
import FourPicturesBoard from '../../components/CustomBoard/FourPicturesBoard';
import {SET_CARD_STYLE} from '../actions/favourite';
import CardTypes from '../../constants/CardTypes';
import TwoPicturesBoard from './../../components/CustomBoard/TwoPicturesBoard';
import ThreePicturesBoard from './../../components/CustomBoard/ThreePicturesBoard';
import {TOGGLE_FAVOURITE, SELECT_FAV_PLACES} from './../actions/user';
import FavouriteCity from './../../models/FavouriteCity';
import FavFolder from './../../models/FavFolder';

const initialState = {
  favourites: FAVOURITES,
  favourite_folders: FAV_FOLDERS,
  selected_favourite_places: [],
  style: {
    board: FourPicturesBoard,
    numColumns: 2,
  },
};

const getPlaceFromId = placeId => {
  return PLACES.find(place => place.id === placeId);
};

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARD_STYLE:
      console.log('im in');
      let newStyle = {
        board: null,
        numColumns: 2,
      };
      switch (action.cardtype) {
        case CardTypes.TWO_PICTURES:
          newStyle.board = TwoPicturesBoard;
          return {...state, style: newStyle};
        case CardTypes.THREE_PICTURES:
          newStyle.board = ThreePicturesBoard;
          return {...state, style: newStyle};
        case CardTypes.FOUR_PICTURES:
          newStyle.board = FourPicturesBoard;
          return {...state, style: newStyle};

        default:
          break;
      }
    case TOGGLE_FAVOURITE: {
      //console.log(action.placeId, action.cityId, action.placeImage);
      const existingFolder = state.favourite_folders.find(
        city => city.cityId === action.cityId,
      );
      if (existingFolder) {
        //there is already at least one fav place
        const placeIndex = existingFolder.placesIds.findIndex(
          place => place === action.placeId,
        );
        console.log(existingFolder);
        if (placeIndex >= 0) {
          existingFolder.placesIds.splice(placeIndex, 1);
          existingFolder.imageQueue.splice(placeIndex, 1);
          existingFolder.counter--;
          console.log('removd');
        } else {
          existingFolder.placesIds.unshift(action.placeId);
          existingFolder.imageQueue.unshift(action.placeImage);
          existingFolder.counter++;
          console.log('added');
        }
        console.log(existingFolder);
      } else {
        const newFolder = new FavFolder(
          action.cityId,
          action.cityName,
          [action.placeImage],
          [action.placeId],
          1,
        );
        console.log('NEW FOLDER');
        const newState = {
          ...state,
          favourite_folders: [...state.favourite_folders, newFolder],
        };
        console.log(newState.favourite_folders);
        return newState;
      }
    }
    case SELECT_FAV_PLACES: {
      let selectFavouritePlaces = [];
      const placesIds = state.favourite_folders.find(
        city => city.cityId === action.cityId,
      ).placesIds;
      placesIds.map(id => selectFavouritePlaces.push(getPlaceFromId(id)));
      console.log(selectFavouritePlaces);
      return {...state, selected_favourite_places: selectFavouritePlaces};
    }

    default:
      return state;
  }
};

export default favouritesReducer;
