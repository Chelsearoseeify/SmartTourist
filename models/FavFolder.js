class FavFolder {
  constructor(cityId, cityName, imageQueue, counter = 0) {
    this.cityId = cityId;
    this.cityName = cityName;
    this.imageQueue = imageQueue; //queue
    this.counter = counter;
  }
}

export default FavFolder;
