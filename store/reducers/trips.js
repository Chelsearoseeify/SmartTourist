import { TRIPS } from '../../data/dummy-data';
import { CREATE_TRIP } from '../actions/trips';
import Trip from '../../models/Trip';

const initialState = {
    userTrips: TRIPS
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRIP:
            const newTrip = new Trip(
                Math.random(0,1000),
                action.trip.name,
                action.trip.city,
                action.trip.startDate,
                action.trip.endDate,
                []
            );

            return {...state, userTrips: state.userTrips.push(newTrip)}
        default:
            return state;
    }
}
