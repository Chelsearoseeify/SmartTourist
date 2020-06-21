export default checkCache = (cacheArray, places) => {
    let missingPlaces = [];
    places.map(place => {
        const foundIndex = cacheArray.findIndex(p => p.id === place.id);
        if(foundIndex == -1){
            missingPlaces.push(place);
        }
    })

    return missingPlaces;
}