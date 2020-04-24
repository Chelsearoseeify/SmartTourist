import {FAVOURITES} from './../../data/dummy-data';
import FourPicturesBoard from '../../components/CustomBoard/FourPicturesBoard';
import {SET_CARD_STYLE} from '../actions/favourite';
import CardTypes from '../../constants/CardTypes';
import TwoPicturesBoard from './../../components/CustomBoard/TwoPicturesBoard';
import ThreePicturesBoard from './../../components/CustomBoard/ThreePicturesBoard';

const initialState = {
  favourites: FAVOURITES,
  style: {
    board: FourPicturesBoard,
    numColumns: 2,
  },
};

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARD_STYLE:
      console.log('im in');
      let newStyle = {
        board: null,
        numColumns: 2,
      };
      switch (action.cardtype) {
        case CardTypes.TWO_PICTURES:
          newStyle.board = TwoPicturesBoard;
          return {...state, style: newStyle};
        case CardTypes.THREE_PICTURES:
          newStyle.board = ThreePicturesBoard;
          return {...state, style: newStyle};
        case CardTypes.FOUR_PICTURES:
          newStyle.board = FourPicturesBoard;
          return {...state, style: newStyle};

        default:
          break;
      }
      break;

    default:
      return state;
  }
};

export default favouritesReducer;
