import {
  FAVOURITES,
  FAVOURITE_CITIES,
  FAVOURITE_PLACES,
} from './../../data/dummy-data';
import FourPicturesBoard from '../../components/CustomBoard/FourPicturesBoard';
import {
  SET_CARD_STYLE,
  FETCH_FAVOURITES,
  SELECT_FAV_PLACES,
  TOGGLE_FAVOURITE,
} from '../actions/favourite';
import CardTypes from '../../constants/CardTypes';
import TwoPicturesBoard from './../../components/CustomBoard/TwoPicturesBoard';
import ThreePicturesBoard from './../../components/CustomBoard/ThreePicturesBoard';
import FavouriteCity from './../../models/FavouriteCity';

const initialState = {
  favourites: FAVOURITES,
  favourite_cities: FAVOURITE_CITIES,
  favourite_places: FAVOURITE_PLACES,
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
      const favouriteCities = [...state.favourite_cities];
      console.log(action.newCity);
      const index = state.favourite_cities.findIndex(
        city => city.cityId === action.newCity.cityId,
      );
      if (index >= 0) favouriteCities.splice(index, 1);
      favouriteCities.unshift(action.newCity);
      console.log(favouriteCities);
      return {...state, favourite_cities: favouriteCities};
    }
    case SELECT_FAV_PLACES: {
      let selectedPlaces = [];
      const placesIds = state.favourite_cities.find(
        city => city.cityId === action.cityId,
      ).placesIds;
      placesIds.map(id => selectedPlaces.push(getPlaceFromId(id)));
      console.log(selectedPlaces);
      return {...state, selected_favourite_places: selectedPlaces};
    }
    case FETCH_FAVOURITES: {
      return {...state, favourite_cities: action.favourites};
    }

    default:
      return state;
  }
};

export default favouritesReducer;
