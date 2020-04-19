import Place from './../models/Place';
import Category from './../models/Category';
import City from './../models/City';
import Trip from '../models/Trip';

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
    'p6',
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

// export const FAVOURITES = [
//   {
//     cityId: 'ci1',
//     places_Ids: ['p1', 'p2', 'p3'],
//   },
// ];

export const FAVOURITES = [
  {
    city: new City(
      'ci1',
      'London',
      require('./../assets/images/london.jpg'),
      null,
    ),
    places: [
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
        'p4',
        "St'Egidio Cathedral",
        'History',
        require('./../assets/images/empty.jpg'),
        '4.6',
        'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
      ),
    ],
  },
  {
    city: new City(
      'ci3',
      'Tokyo',
      require('./../assets/images/tokyo.jpg'),
      null,
    ),
    places: [
      new Place(
        'p4',
        "St'Egidio Cathedral",
        'History',
        require('./../assets/images/stedigio_cathedral.jpg'),
        '4.6',
        'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
      ),
      new Place(
        'p6',
        "Arthur's Seat",
        'History',
        require('./../assets/images/arthurs_seat.jpg'),
        '4.6',
        'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
      ),
      new Place(
        'p1',
        'Edinburgh Castle',
        'History',
        require('./../assets/images/edinburgh_castle.jpg'),
        '4.6',
        'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.',
      ),
    ],
  },
];

export const CITIES = [
  new City('ci1', 'London', require('./../assets/images/london.jpg'), null),
  new City(
    'ci2',
    'Barcelona',
    require('./../assets/images/barcellona.jpg'),
    require('./../assets/images/icons/Barcelona.png'),
  ),
  new City(
    'ci3',
    'Tokyo',
    require('./../assets/images/tokyo.jpg'),
    require('./../assets/images/icons/Tokyo.png'),
  ),
  new City(
    'ci4',
    'Los Angeles',
    require('./../assets/images/los_angeles.jpg'),
    null,
  ),
  new City(
    'ci5',
    'New York',
    require('./../assets/images/new_york.jpg'),
    require('./../assets/images/icons/NewYork.png'),
  ),
  new City(
    'ci5',
    'Paris',
    require('./../assets/images/pariseiffel.jpg'),
    require('./../assets/images/icons/Paris.png'),
  ),
  new City(
    'ci5',
    'Prague',
    require('./../assets/images/prague.jpg'),
    require('./../assets/images/icons/Prague.png'),
  ),
  new City(
    'ci5',
    'Rome',
    require('./../assets/images/rome.jpg'),
    require('./../assets/images/icons/Rome.png'),
  ),
];

export const CITIES_ICON = [
  new City(
    'ci5',
    'Paris',
    require('./../assets/images/pariseiffel.jpg'),
    require('./../assets/images/icons/Paris.png'),
  ),
  new City(
    'ci5',
    'Prague',
    require('./../assets/images/prague.jpg'),
    require('./../assets/images/icons/Prague.png'),
  ),
  new City(
    'ci5',
    'Rome',
    require('./../assets/images/new_york.jpg'),
    require('./../assets/images/icons/Rome.png'),
  ),
  new City(
    'ci2',
    'Barcelona',
    require('./../assets/images/barcellona.jpg'),
    require('./../assets/images/icons/Barcelona.png'),
  ),
  new City(
    'ci3',
    'Tokyo',
    require('./../assets/images/tokyo.jpg'),
    require('./../assets/images/icons/Tokyo.png'),
  ),
  new City(
    'ci5',
    'New York',
    require('./../assets/images/new_york.jpg'),
    require('./../assets/images/icons/NewYork.png'),
  ),
];

export const TRIPS = [
  new Trip('t0', 'Trip 1', 'c1', new Date(), new Date() + 1, ['p1', 'p4']),
];
