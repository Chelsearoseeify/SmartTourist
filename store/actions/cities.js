export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (placeId, cityId) => {
  return {type: TOGGLE_FAVORITE, placeId: placeId, cityId: cityId};
};
