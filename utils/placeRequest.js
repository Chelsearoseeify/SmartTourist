import axios from 'axios';
import API_KEY from '../constants/API_KEY';

import photoRequest from './photoRequest';

const placeRequest = async (placeId, token) => {
    let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY.API_KEY_PLACES}`;
    url += '&fields=name,place_id,photo,formatted_address,geometry,type,rating,user_ratings_total,international_phone_number,website'

    if(token){
        url += `&sessiontoken=${token}`;
    }

    try{
        const res = await axios.get(url);
        const photoUrl = await photoRequest(res.data.result.photos[0].photo_reference);
        return {...res.data.result, photoUrl: photoUrl, id: placeId};
    }catch(err){
        console.log(err);
    }
}

export default placeRequest;