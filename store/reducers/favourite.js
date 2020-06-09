import {
  SET_CARD_STYLE,
  FETCH_FAVOURITES,
  TOGGLE_FAVOURITE_CITY,
  TOGGLE_FAVOURITE_PLACE,
  SET_FAVOURITE_REQUEST,
  FETCH_FAVOURITE_PLACES,
} from '../actions/favourite';
import CardTypes from '../../constants/CardTypes';
import TwoPicturesBoard from './../../components/CustomBoard/TwoPicturesBoard';
import ThreePicturesBoard from './../../components/CustomBoard/ThreePicturesBoard';
import FourPicturesBoard from '../../components/CustomBoard/FourPicturesBoard';
import ActionType from '../../constants/ActionType';
import FavouriteCity from './../../models/FavouriteCity';
import FavouritePlace from './../../models/FavouritePlace';

const initialState = {
  favourite_cities: [],
  favourite_places: [],
  selected_favourite_places: [],
  style: {
    board: ThreePicturesBoard,
    numColumns: 2,
  },
  place_request: {
    place: {},
    actionType: '',
    icon: '',
  },
  city_request: {
    city: {},
    actionType: '',
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
      if (state.actionType !== ActionType.DELETE_CITY)
        favouriteCities.unshift(action.newCity);
      const city_request = {
        city: {},
        actionType: '',
      };
      return {...state, favourite_cities: favouriteCities, city_request};
    }
    case TOGGLE_FAVOURITE_PLACE: {
      const favouritePlaces = [...state.favourite_places];
      const selectedFavouritePlaces = [...state.selected_favourite_places];
      let index = state.favourite_places.findIndex(
        place => place.id === action.newPlace.id,
      );
      if (index >= 0) favouritePlaces.splice(index, 1);
      else favouritePlaces.unshift(action.newPlace);
      index = state.selected_favourite_places.findIndex(
        place => place.id === action.newPlace.id,
      );
      if (index >= 0) selectedFavouritePlaces.splice(index, 1);
      return {
        ...state,
        favourite_places: favouritePlaces,
        selected_favourite_places: selectedFavouritePlaces,
      };
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
    case SET_FAVOURITE_REQUEST: {
      const place = action.place;
      let placeRequest = {...state.place_request};
      let cityRequest = {...state.city_request};
      const existingCity = state.favourite_cities.find(
        city => city.cityId === place.cityId,
      );
      cityRequest.city = new FavouriteCity(
        place.cityId,
        action.cityName,
        [],
        [],
      );
      console.log(place);
      console.log(existingCity);
      if (existingCity) {
        console.log('THE CITY EXISTS');
        const placeIndex = existingCity.placesIds.findIndex(
          id => id === place.id,
        );
        let placesIds = [...existingCity.placesIds];
        let imageQueue = [...existingCity.imageQueue];
        if (placeIndex >= 0) {
          console.log('THE PLACE EXISTS');
          placesIds.splice(placeIndex, 1);
          imageQueue.splice(placeIndex, 1);
          placeRequest.icon = 'heart-outline';

          placeRequest.actionType = ActionType.DELETE_PLACE;
          if (placesIds.length === 0)
            cityRequest.actionType = ActionType.DELETE_CITY;
          else cityRequest.actionType = ActionType.UPDATE_CITY;
        } else {
          console.log("THE PLACE DOESN'T EXIST");
          placeRequest.actionType = ActionType.ADD_PLACE;
          cityRequest.actionType = ActionType.UPDATE_CITY;
          placesIds.unshift(place.id);
          imageQueue.unshift(place.photoUrl);
          placeRequest.icon = 'cards-heart';
        }
        cityRequest.city.placesIds = placesIds;
        cityRequest.city.imageQueue = imageQueue;
      } else {
        console.log("THE CITY DOESN'T EXIST");
        cityRequest.city.placesIds = [place.id];
        cityRequest.city.imageQueue = [place.photoUrl];
        cityRequest.actionType = ActionType.ADD_CITY;
        placeRequest.actionType = ActionType.ADD_PLACE;
        placeRequest.icon = 'cards-heart';
      }
      placeRequest.place = new FavouritePlace(
        place.cityId,
        place.id,
        place.name,
        place.photoUrl,
      );
      return {...state, place_request: placeRequest, city_request: cityRequest};
    }

    default:
      return state;
  }
};

export default favouritesReducer;
