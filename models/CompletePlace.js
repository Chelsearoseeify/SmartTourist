class CompletePlace {
  constructor(
    name,
    cityId,
    types,
    url,
    rating,
    geometry,
    address,
    business_status,
    user_ratings_total,
    description,
  ) {
    this.name = name;
    this.cityId = cityId;
    this.types = types;
    this.url = url;
    this.rating = rating;
    this.geometry = geometry;
    this.address = address;
    this.business_status = business_status;
    this.user_ratings_total = user_ratings_total;
    this.description = description;
  }
}

export default CompletePlace;
