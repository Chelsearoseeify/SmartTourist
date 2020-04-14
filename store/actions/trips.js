export const CREATE_TRIP = 'CREATE_TRIP';

export const createTrip = trip => {
    return { type: CREATE_TRIP, trip: trip }
}