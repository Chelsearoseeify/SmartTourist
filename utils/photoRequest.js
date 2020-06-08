import axios from 'axios';
const API_KEY = 'AIzaSyBZnXD0YlNLMtcDswoLpkUTu_cBYP3Ud0w';

const getPicture = async photo_reference => {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photo_reference}&key=${API_KEY}`;
    const response = await axios.get(url, { responseType: 'blob' });

    return response.request.responseURL;
};

export default getPicture;