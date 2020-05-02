class FavFolder {
  constructor(cityId, cityName, imageQueue, placesIds, counter = 0) {
    this.cityId = cityId;
    this.cityName = cityName;
    this.imageQueue = imageQueue; //queue
    this.placesIds = placesIds;
    this.counter = counter;
  }
}

export default FavFolder;
