import { TRIPS } from '../../data/dummy-data';
import {
  CREATE_TRIP,
  SET_TRIP_DATES,
  SET_TRIP_CITY,
  SET_TRIP_PLACES,
  ADD_PLACE_TO_TRIP,
  REMOVE_PLACE_FROM_TRIP,
  FETCH_TRIPS,
} from '../actions/trips';
import Trip from '../../models/Trip';
import moment from 'moment';

const emptyTrip = new Trip(Math.random(0, 1000), '', '', null, null, []);

const initialState = {
  userTrips: [],
  newTrip: emptyTrip,
  tripPlaces: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return {...state, userTrips: action.userTrips}
    case CREATE_TRIP:
      const updatedUserTrips = [...state.userTrips, action.trip];

      const sortedUserTrips = updatedUserTrips.sort((t1,t2)=> t1.startDate - t2.startDate);
      
      return {
        ...state,
        userTrips: sortedUserTrips,
        newTrip: emptyTrip,
      };
    case REMOVE_PLACE_FROM_TRIP:
      const tripIndexToUpdate = state.userTrips.findIndex(t => t.id === action.payload.tripId);

      if(tripIndexToUpdate !== -1){
        let removedPlaceTrip = new Trip(
          action.payload.tripId,
          state.userTrips[tripIndexToUpdate].name,
          state.userTrips[tripIndexToUpdate].cityId,
          state.userTrips[tripIndexToUpdate].startDate,
          state.userTrips[tripIndexToUpdate].endDate,
          action.payload.newPlaceIds
        )
        let removedPlaceUserTrips = [...state.userTrips];
        removedPlaceUserTrips[tripIndexToUpdate] = removedPlaceTrip;
        return {...state, userTrips: removedPlaceUserTrips};
      }
      else{
        return state;
      }
    case SET_TRIP_DATES:
      const dateString = `${moment
        .unix(action.dates.startDate)
        .format('LL')} - ${moment.unix(action.dates.endDate).format('LL')}`;
      const updatedNewTrip = {
        ...state.newTrip,
        startDate: action.dates.startDate,
        endDate: action.dates.endDate,
        dateString: dateString,
      };

      return { ...state, newTrip: updatedNewTrip };
    case SET_TRIP_CITY:
      const updatedTrip = {
        ...state.newTrip,
        cityId: action.cityId,
      };

      return { ...state, newTrip: updatedTrip };
    case ADD_PLACE_TO_TRIP:
      const tripIndex = state.userTrips.findIndex(
        t => t.id === action.payload.tripId,
      );

      if (tripIndex !== -1) {
        
        const updatedTrip = new Trip(
          action.trip.id,
          action.trip.name,
          action.trip.cityId,
          action.trip.startDate,
          action.trip.endDate,
          action.updatedPlaceIds,
        );

        const updatedUserTrips = [...state.userTrips];
        updatedUserTrips[tripIndex] = updatedTrip;
        return { ...state, userTrips: updatedUserTrips };
      }
    case SET_TRIP_PLACES:
      return { ...state, tripPlaces: action.places };
    default:
      return state;
  }
};
