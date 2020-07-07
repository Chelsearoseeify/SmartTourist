import moment from 'moment';

class Trip {
    constructor(id, name, cityId, startDate, endDate, placeIds) {
        this.id = id
        this.name = name;
        this.cityId = cityId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.placeIds = placeIds;
    }

    addPlace(placeId, dayIndex) {
        this.placeIds[dayIndex].push(placeId);
    }

    getTripDateString() {
        const startDate = moment.unix(this.startDate);
        const endDate = moment.unix(this.endDate);
        if (startDate.month() === endDate.month()) {
            return `${startDate.format('D')} - ${endDate.format('D MMM YYYY')}`;
        }
        else {
            return `${startDate.format('D')} ${startDate.format('MMM')} - ${endDate.format('D MMM YYYY')}`;
        }
    }

    getTripMonthString() {
        const startDate = moment.unix(this.startDate);
        const endDate = moment.unix(this.endDate);
        if (startDate.month() !== endDate.month()) {
            return `${startDate.format('MMMM')} - ${endDate.format('MMMM')}`;
        }
        else {
            return `${startDate.format('MMMM')}`;
        }
    }

    numberOfDays() {
        const startDate = moment.unix(this.startDate);
        const endDate = moment.unix(this.endDate);

        return endDate.date() - startDate.date() + 1;
    }

    setPlaceIds() {
        const numberOfDays = this.numberOfDays();
        let tripPlaces = [];
        if (numberOfDays > 0) {
            for (let i = 0; i < numberOfDays; i++) {
                tripPlaces.push([]);
            }
        }

        this.placeIds = tripPlaces;
    }
}

export default Trip;