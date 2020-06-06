class CompletePlace {
  constructor(
    id,
    name,
    cityId,
    types,
    photoUrl,
    rating,
    geometry,
    address,
    business_status,
    user_ratings_total,
    description,
  ) {
    this.id = id;
    this.name = name;
    this.cityId = cityId;
    this.types = types;
    this.photoUrl = photoUrl;
    this.rating = rating;
    this.geometry = geometry;
    this.address = address;
    this.business_status = business_status;
    this.user_ratings_total = user_ratings_total;
    this.description = description;
  }
}

export default CompletePlace;
