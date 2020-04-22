class City {
  constructor(
    id,
    name,
    imageId,
    iconId = require('./../assets/images/empty.jpg'),
  ) {
    this.id = id;
    this.name = name;
    this.imageId = imageId;
    this.iconId = iconId;
  }
}

export default City;
