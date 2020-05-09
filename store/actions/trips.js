export const CREATE_TRIP = 'CREATE_TRIP';
export const SET_TRIP_DATES = 'SET_TRIP_DATES';

export const createTrip = trip => {
    return { type: CREATE_TRIP, trip: trip }
}

export const setTripDates = dates => {
    return { type: SET_TRIP_DATES, dates: dates }
}