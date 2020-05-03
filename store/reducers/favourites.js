import {
  SET_CARD_STYLE,
  FETCH_FAVOURITES,
  SELECT_FAV_PLACES,
  TOGGLE_FAVOURITE_CITY,
  TOGGLE_FAVOURITE_PLACE,
} from '../actions/favourites';
import CardTypes from '../../constants/CardTypes';
import TwoPicturesBoard from '../../components/CustomBoard/TwoPicturesBoard';
import ThreePicturesBoard from '../../components/CustomBoard/ThreePicturesBoard';
import FourPicturesBoard from '../../components/CustomBoard/FourPicturesBoard';

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
  console.log(action.type);
  switch (action.type) {
    case SET_CARD_STYLE: {
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
      break;
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
    case SELECT_FAV_PLACES: {
      console.log(action.selectedPlaces);
      return {...state, selected_favourite_places: action.selectedPlaces};
    }
    case FETCH_FAVOURITES: {
      console.log('AAAAAAAAAAAAA');
      return {...state, favourite_cities: action.favourites};
    }
    default:
      return state;
  }
};

export default favouritesReducer;
