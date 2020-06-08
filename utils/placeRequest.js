import axios from 'axios';
import API_KEY from '../constants/API_KEY';

import photoRequest from './photoRequest';

const placeRequest = async (placeId, fields, token) => {
    let fieldsString = 'geometry,icon,name,photo,type';

    if(fields && fields.length > 0){
        fieldsString = fields.join(',');
    }
    
    let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fieldsString}&key=${API_KEY.API_KEY_PLACES}`;

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