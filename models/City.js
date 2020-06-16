class City {
  constructor(
    id,
    name,
    photoUrl,
    iconId = require('./../assets/images/empty.jpg'),
    geometry = {}
  ) {
    this.id = id;
    this.name = name;
    this.photoUrl = photoUrl;
    this.iconId = iconId;
    this.geometry = geometry;
  }
}

export default City;
