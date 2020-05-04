import {
  SET_CARD_STYLE,
  FETCH_FAVOURITES,
  TOGGLE_FAVOURITE_CITY,
  TOGGLE_FAVOURITE_PLACE,
} from '../actions/favourite';
import CardTypes from '../../constants/CardTypes';
import TwoPicturesBoard from './../../components/CustomBoard/TwoPicturesBoard';
import ThreePicturesBoard from './../../components/CustomBoard/ThreePicturesBoard';
import FourPicturesBoard from '../../components/CustomBoard/FourPicturesBoard';
import {FETCH_FAVOURITE_PLACES} from './../actions/favourite';

const initialState = {
  favourite_cities: [],
  favourite_places: [],
  selected_favourite_places: [],
  style: {
    board: FourPicturesBoard,
    numColumns: 2,
  },
};

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARD_STYLE:
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
          return state;
      }
    case TOGGLE_FAVOURITE_CITY: {
      const favouriteCities = [...state.favourite_cities];
      const index = state.favourite_cities.findIndex(
        city => city.cityId === action.newCity.cityId,
      );
      if (index >= 0) favouriteCities.splice(index, 1);
      favouriteCities.unshift(action.newCity);
      return {...state, favourite_cities: favouriteCities};
    }
    case TOGGLE_FAVOURITE_PLACE: {
      const favouritePlaces = [...state.favourite_places];
      const index = state.favourite_places.findIndex(
        place => place.placeId === action.newPlace.placeId,
      );
      if (index >= 0) favouritePlaces.splice(index, 1);
      else favouritePlaces.unshift(action.newPlace);
      return {...state, favourite_places: favouritePlaces};
    }
    case FETCH_FAVOURITE_PLACES: {
      return {...state, selected_favourite_places: action.selectedPlaces};
    }
    case FETCH_FAVOURITES: {
      //console.log(action.favouritePlaces);
      return {
        ...state,
        favourite_cities: action.favouriteCities,
        favourite_places: action.favouritePlaces,
      };
    }

    default:
      return state;
  }
};

export default favouritesReducer;
