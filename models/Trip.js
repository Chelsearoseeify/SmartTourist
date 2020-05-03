class Trip {
    constructor(id, name, city, startDate, endDate) {
        this.id = id
        this.name = name;
        this.city = city;
        this.startDate = startDate;
        this.endDate = endDate;
        this.places = [];
    }

    addPlace(placeId, dayIndex){
        this.places[dayIndex].push(placeId);
    }
}

export default Trip;