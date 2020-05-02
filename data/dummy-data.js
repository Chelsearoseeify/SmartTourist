import Place from './../models/Place';
import Category from './../models/Category';
import City from './../models/City';
import Trip from '../models/Trip';
import FavouriteCity from '../models/FavouriteCity';
import FavouritePlaces from './../models/FavouritePlaces';

export const description =
  'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.';

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
    'ci9',
    [],
    'http://viaggiadipiu.it/wp-content/uploads/2019/02/jorg-angeli-797072-unsplash-e1550006350552.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p2',
    'Holyrood Place',
    'ci9',
    [],
    'https://upload.wikimedia.org/wikipedia/commons/c/ce/Holyroodhouse%2C_front_view.jpg',
    '3.4',
    description,
  ),
  new Place(
    'p3',
    'Old Town',
    'ci9',
    [],
    'https://q-xx.bstatic.com/images/hotel/max1024x768/201/201131672.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p4',
    "St'Egidio Cathedral",
    'ci9',
    [],
    'https://www.wanderlustitalia.it/wp-content/uploads/2014/09/Copertina-Cattedrale-1280x720.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p5',
    "Arthur's Seat",
    'ci9',
    [],
    'https://i.redd.it/v4so6zs0o9j11.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p6',
    'Big Bang',
    'ci1',
    [],
    'https://d1bvpoagx8hqbg.cloudfront.net/originals/big-ben-la-torre-elisabetta-4f1217e2b6b1ba3814899377b203fe43.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p7',
    'Buckingham Palace',
    'ci1',
    [],
    'https://cdn.getyourguide.com/img/tour_img-1260045-148.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p8',
    'London Tower',
    'ci1',
    [],
    'https://media.tacdn.com/media/attractions-splice-spp-674x446/08/39/74/c6.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p9',
    'London Eye',
    'ci1',
    [],
    'https://cdn.civitatis.com/reino-unido/londres/galeria/london-eye-atardecer.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p10',
    'Central Park',
    'ci5',
    [],
    'https://www.innocentiemangonipiante.it/templates/yootheme/cache/central-park-pov-1cab2d8e.jpeg',
    '4.6',
    description,
  ),
  new Place(
    'p11',
    'Empire State Building',
    'ci5',
    [],
    'https://cdn.getyourguide.com/img/tour_img-1739965-148.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p12',
    'Statue of Liberty',
    'ci5',
    [],
    'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY1MTc1MTk3ODI0MDAxNjA5/topic-statue-of-liberty-gettyimages-960610006-promo.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p13',
    'Times Square',
    'ci5',
    [],
    'https://www.columbusassicurazioni.it/media/30966/newyork_timessquare-min.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p14',
    'Arc de Triomphe',
    'ci6',
    [],
    'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/34/bc.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p15',
    'Eiffel Tower',
    'ci6',
    [],
    'https://i1.wp.com/www.walksofitaly.com/blog/wp-content/uploads/2017/02/Eiffel-Tower_Trocadero-wide_SM-copy.jpg?fit=690%2C385&ssl=1',
    '4.6',
    description,
  ),
  new Place(
    'p16',
    'Louvre',
    'ci6',
    [],
    'https://images.france.fr/zeaejvyq9bhj/1q80wA2dmc4S2QicA6m0Gg/f3fe6953aefcc20d8a8e08fb9965f44d/louvre-piramide-paris.jpg?w=1120&h=490&q=70&fl=progressive&fit=fill',
    '4.6',
    description,
  ),
  new Place(
    'p17',
    'Notre Dame',
    'ci6',
    [],
    'https://www.gelestatic.it/thimg/J00IPf2JhAx9q6BZTlwx2Xd-i1s=/fit-in/960x540/https%3A//www.lastampa.it/image/contentid/policy%3A1.38525479%3A1582838923/NOTRE01.jpg%3Ff%3Ddetail_558%26h%3D720%26w%3D1280%26%24p%24f%24h%24w%3Dd07efea',
    '4.6',
    description,
  ),
  new Place(
    'p18',
    'Meiji',
    'ci3',
    [],
    'https://www.ancient-origins.net/sites/default/files/field/image/Meiji-shrine.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p19',
    'Sensoji',
    'ci3',
    [],
    'https://s3-eu-central-1.amazonaws.com/matteoingiappone/wp-content/uploads/2019/11/Senso-ji.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p20',
    'Sky Tree',
    'ci3',
    [],
    'https://www.gotokyo.org/en/spot/6/images/x4507_1_750x503.jpg.pagespeed.ic.q9-fgBk5bj.jpg',
    '4.6',
    description,
  ),
  new Place(
    'p21',
    'Tokyo Tower',
    'ci3',
    [],
    'https://sognandoilgiappone.imgix.net/wp-content/uploads/2016/06/tokyo-tower.jpg',
    '4.6',
    description,
  ),
];

export const CITIES = [
  new City(
    'ci1',
    'London',
    'https://xceed.me/blog/wp-content/uploads/2018/11/london-londres-best-nightclubs-clubs-mejores-discotecas-xceed-top10-ranking-blog.png',
    null,
  ),
  new City(
    'ci2',
    'Barcelona',
    'https://www.cdt.ch/binrepository/1139x640/90c0/960d640/none/798450/GSRI/barcellona-lvxeo04cxwq_1109306_20191202172734.jpg',
    require('./../assets/images/icons/Barcelona.png'),
  ),
  new City(
    'ci3',
    'Tokyo',
    'https://www.parkettchannel.it/wp-content/uploads/Tokyo-Shibuya-neon-lights-759x500.jpg',
    require('./../assets/images/icons/Tokyo.png'),
  ),
  new City(
    'ci4',
    'Los Angeles',
    'https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1320/https://www.viaggi-usa.it/wp-content/uploads/2014/06/Dove-dormire-a-Los-Angeles.jpg',
    null,
  ),
  new City(
    'ci5',
    'New York',
    'https://www.ef-italia.it/sitecore/__/~/media/universal/pg/8x5/destination/US_US-NY_NYC_1.jpg',
    require('./../assets/images/icons/NewYork.png'),
  ),
  new City(
    'ci6',
    'Paris',
    'https://lp-cms-production.imgix.net/image_browser/Effiel%20Tower%20-%20Paris%20Highlights.jpg?format=auto',
    require('./../assets/images/icons/Paris.png'),
  ),
  new City(
    'ci7',
    'Prague',
    'https://lp-cms-production.imgix.net/features/2019/07/shutterstockRF_300856853-f8561259593d.jpg',
    require('./../assets/images/icons/Prague.png'),
  ),
  new City(
    'ci8',
    'Rome',
    'https://www.bblamacaroma.it//wp-content/uploads/2015/05/roma-2.jpg',
    require('./../assets/images/icons/Rome.png'),
  ),
  new City(
    'ci9',
    'Edinburgh',
    'https://static.brusselsairlines.com/_img/destinationPage2/UK/Edinburgh/Edinburgh-view.jpg',
    null,
  ),
];

export const FAVOURITE_PLACES = new FavouritePlaces([
  '-M60tZtUJZX_h2YiTDGc',
  '-M60tZtZMwCS9FokpS02',
]);

export const FAVOURITE_CITIES = [
  new FavouriteCity(
    'ci1',
    'London',
    [
      'https://lh3.googleusercontent.com/p/AF1QipPxsdEyR2qMZ7jXatbGvP50u3g5FK5exsSI2kLW=s1600-w1000',
      'https://lh3.googleusercontent.com/p/AF1QipP9wZz6OiWJhsQUwNaPYrtV8f3sWUlakQ0J8t_T=s1600-w1000',
    ],
    ['-M60tZtUJZX_h2YiTDGc', '-M60tZtZMwCS9FokpS02'],
    2,
  ),
];

/* export const FAVOURITES_ID = [
  new FavouriteCity('ci9', ['p2', 'p4', 'p3', 'p1']),
  new FavouriteCity('ci5', ['p10', 'p11', 'p12']),
]; */

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
        'ci9',
        [],
        require('./../assets/images/old_town.png'),
        '4.6',
        description,
      ),
      new Place(
        'p4',
        "St'Egidio Cathedral",
        'ci9',
        [],
        require('./../assets/images/stedigio_cathedral.jpg'),
        '4.6',
        description,
      ),
      new Place(
        'p5',
        "Arthur's Seat",
        'ci9',
        [],
        require('./../assets/images/arthurs_seat.jpg'),
        '4.6',
        description,
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
        'p18',
        'Meiji',
        'ci3',
        [],
        require('./../assets/images/Tokyo/tokyo_meiji.jpg'),
        '4.6',
        description,
      ),
      new Place(
        'p19',
        'Sensoji',
        'ci3',
        [],
        require('./../assets/images/Tokyo/tokyo_sensoji.jpg'),
        '4.6',
        description,
      ),
      new Place(
        'p20',
        'Sky Tree',
        'ci3',
        [],
        require('./../assets/images/Tokyo/tokyo_skytree.png'),
        '4.6',
        description,
      ),
      new Place(
        'p21',
        'Tokyo Tower',
        'ci3',
        [],
        require('./../assets/images/Tokyo/tokyo_tower.jpg'),
        '4.6',
        description,
      ),
    ],
  },
];

export const TRIPS = [
  new Trip('t0', 'Trip 1', 'c1', new Date(), new Date() + 1, ['p1', 'p4']),
];
