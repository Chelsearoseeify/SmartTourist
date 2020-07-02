import axios from 'axios';
const API_KEY = 'AIzaSyDqX1_YnZvoXJWJhbRJ1QusXeHt1mtxdts';

const directionsRequest = async (placeIds, cityId) => {
    let url = 'https://maps.googleapis.com/maps/api/directions/json?';
    url += `origin=place_id:${cityId}`;
    url += `&destination=place_id:${cityId}`;
    
    placeIds.map((placeId,index) => {
        if(index === 0){
            url += '&waypoints=optimize:true|';
        }
        url += `place_id:${placeId}`;
        if(index !== placeIds.length - 1){
            url += '|';
        }
    })
    url += `&key=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data.routes[0].overview_polyline.points)
    return response.data.routes[0].overview_polyline.points;
};

export default directionsRequest;