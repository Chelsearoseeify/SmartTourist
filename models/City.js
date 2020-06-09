class City {
  constructor(
    id,
    name,
    imageUrl,
    iconId = require('./../assets/images/empty.jpg'),
    geometry = {},
    photoReference
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.iconId = iconId;
    this.geometry = geometry;
    this.photoReference = photoReference;
  }
}

export default City;
