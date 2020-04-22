class Place {
  constructor(id, name, cityId, categoryIds, imageUrl, rate, description) {
    this.id = id;
    this.name = name;
    this.cityId = cityId;
    this.categoryIds = categoryIds;
    this.imageUrl = imageUrl;
    this.rate = rate;
    this.description = description;
  }
}

export default Place;
