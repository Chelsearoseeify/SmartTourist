import { TRIPS } from '../../data/dummy-data';
import { CREATE_TRIP, SET_TRIP_DATES } from '../actions/trips';
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
    newTrip: emptyTrip
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

            return { ...state, userTrips: [...state.userTrips, newTrip], newTrip: emptyTrip }
        case SET_TRIP_DATES:
            const dateString = `${moment.unix(action.dates.startDate).format('LL')} - ${moment.unix(action.dates.endDate).format('LL')}`
            const updatedNewTrip = {
                ...state.newTrip,
                startDate: action.dates.startDate,
                endDate: action.dates.endDate,
                dateString: dateString
            }

            console.log(updatedNewTrip);

            return { ...state, newTrip: updatedNewTrip}
        default:
            return state;
    }
}
