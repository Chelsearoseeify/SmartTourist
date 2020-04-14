import Place from './../models/Place';
import Category from './../models/Category';
import City from './../models/City';

export const CATEGORIES = [
  new Category('c1', 'Art', 'paint-brush'),
  new Category('c2', 'Libraries', 'book'),
  new Category('c3', 'Museums', 'archway'),
  new Category('c4', 'Cinemas', 'film'),
  new Category('c5', 'Restaurants', 'utensils'),
  new Category('c6', 'Cafè', 'mug-hot'),
];

export const PLACES = [
  new Place(
    'p1',
    'Edinburgh Castle',
    'History',
    require('./../assets/images/edinburgh_castle.jpg'),
    '4.6',
    'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
  ),
  new Place(
    'p2',
    'Holyrood Place',
    'History',
    require('./../assets/images/holyrood_palace.jpg'),
    '3.4',
    'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
  ),
  new Place(
    'p3',
    'Old Town',
    'History',
    require('./../assets/images/old_town.png'),
    '4.6',
    'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
  ),
  new Place(
    'p4',
    "St'Egidio Cathedral",
    'History',
    require('./../assets/images/stedigio_cathedral.jpg'),
    '4.6',
    'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
  ),
  new Place(
    'p1',
    "Arthur's Seat",
    'History',
    require('./../assets/images/arthurs_seat.jpg'),
    '4.6',
    'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
  ),
];

export const LONDON = [
  require('./../assets/images/1.jpg'),
  require('./../assets/images/2.jpg'),
  require('./../assets/images/3.jpg'),
  require('./../assets/images/4.jpg'),
];

export const CITIES = [
  new City('c1', 'London', require('./../assets/images/london.jpg')),
  new City('c2', 'Barcellona', require('./../assets/images/barcellona.jpg')),
  new City('c3', 'Tokyo', require('./../assets/images/tokyo.jpg')),
  new City('c4', 'Los Angeles', require('./../assets/images/los_angeles.jpg')),
  new City('c5', 'New York', require('./../assets/images/new_york.jpg')),
];
