import moment from 'moment';

class Trip {
    constructor(id, name, city, startDate, endDate, places) {
        this.id = id
        this.name = name;
        this.city = city;
        this.startDate = startDate;
        this.endDate = endDate;
        this.places = places;
    }

    addPlace(placeId, dayIndex){
        this.places[dayIndex].push(placeId);
    }

    getTripDateString(){
        const startDate = moment.unix(this.startDate);
        const endDate = moment.unix(this.endDate);
        if(startDate.month() === endDate.month()){
            return `${startDate.format('D')} - ${endDate.format('D MMM YYYY')}`;
        }
        else{
            return `${startDate.format('D')} ${startDate.format('MMM')} - ${endDate.format('D MMM YYYY')}`;
        }
    }

    numberOfDays(){
        const startDate = moment.unix(this.startDate);
        const endDate = moment.unix(this.endDate);

        return endDate.date() - startDate.date() + 1;
    }
}

export default Trip;