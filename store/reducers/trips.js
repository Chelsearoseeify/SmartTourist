import { TRIPS } from '../../data/dummy-data';
import {
    CREATE_TRIP,
    SET_TRIP_DATES,
    SET_TRIP_CITY,
    SET_TRIP_PLACES,
    ADD_PLACE_TO_TRIP
} from '../actions/trips';
import Trip from '../../models/Trip';
import moment from 'moment';

const emptyTrip = new Trip(
    Math.random(0, 1000),
    '',
    {},
    null,
    null,
    []
);

const initialState = {
    userTrips: TRIPS,
    newTrip: emptyTrip,
    tripPlaces: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRIP:
            const newTrip = new Trip(
                Math.random(0, 1000),
                action.trip.name,
                action.trip.city,
                state.newTrip.startDate,
                state.newTrip.endDate,
                []
            );

            newTrip.setPlaceIds();

            return { ...state, userTrips: [...state.userTrips, newTrip], newTrip: emptyTrip }
        case SET_TRIP_DATES:
            const dateString = `${moment.unix(action.dates.startDate).format('LL')} - ${moment.unix(action.dates.endDate).format('LL')}`
            const updatedNewTrip = {
                ...state.newTrip,
                startDate: action.dates.startDate,
                endDate: action.dates.endDate,
                dateString: dateString
            }

            return { ...state, newTrip: updatedNewTrip };
        case SET_TRIP_CITY:
            const updatedTrip = {
                ...state.newTrip,
                city: action.cityId
            }

            return { ...state, newTrip: updatedTrip }
        case ADD_PLACE_TO_TRIP:
            const tripIndex = state.userTrips.findIndex(t => t.id === action.payload.tripId);

            if(tripIndex !== -1){
                let updatedPlaceIds = [...state.userTrips[tripIndex].placeIds];

                action.payload.selections.map((selected,index) => {
                    if (selected){
                        updatedPlaceIds[index].push(action.payload.placeId);
                    }
                });
                const updatedTrip = new Trip(
                    state.userTrips[tripIndex].id,
                    state.userTrips[tripIndex].name,
                    state.userTrips[tripIndex].cityId,
                    state.userTrips[tripIndex].startDate,
                    state.userTrips[tripIndex].endDate,
                    updatedPlaceIds
                );

                const updatedUserTrips = [...state.userTrips];
                updatedUserTrips[tripIndex] = updatedTrip;
                console.log(updatedUserTrips);
                return { ...state, userTrips: updatedUserTrips }
            }
        case SET_TRIP_PLACES:
            return { ...state, tripPlaces: action.places }
        default:
            return state;
    }
}
