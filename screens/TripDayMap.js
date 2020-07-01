import React, { useState } from 'react';
import {useSelector} from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from 'react-native-maps';

const TripDayMap = props => {
    const { cityGeometry, placeIds } = props.route.params.mapData;
    const places = useSelector(state => state.places.cachedPlaces);
    console.log(placeIds);

    let points = "krupHkf|vAc@L[@k@Me@M?UDgBJk@l@cFH_AAYN_C^}Ct@{G^wEFkAPoCh@yHl@iHJaABoBCu@QsAEw@FU@s@Ba@Nm@?{AQiAOm@TQIw@CS?_@?}@c@IE?ESCa@AKYcBGEMa@i@cBYgACO";
    //let steps = Polyline.decode(points);
    //console.log(steps);
    let polylineCoords = [];

    /*
    for (let i=0; i < steps.length; i++) {
      let tempLocation = {
        latitude : steps[i][0],
        longitude : steps[i][1]
      }
      polylineCoords.push(tempLocation);
    }
    */
    

    let tripDayPlaces;

    if(placeIds && placeIds.length > 0){
        tripDayPlaces = places.filter(place => {
            return placeIds.includes(place.id);
        })
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                ref={map => (_map = map)}
                initialRegion={{
                    latitude: cityGeometry.location.lat,
                    longitude: cityGeometry.location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* { tripDayPlaces && tripDayPlaces.map((place, index) => (
                    <Marker
                        key={place.id}
                        coordinate={{
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                        }}
                    >
                        <Callout>
                            <Text>{place.name}</Text>
                        </Callout>
                    </Marker>
                ))} */}
                <Polyline
                    coordinates={[
                        { latitude: 50.086944, longitude: 14.4037383},
                        { latitude: 50.0876661, longitude: 14.403908},
                        { latitude: 50.0876488, longitude: 14.4043148},
                        { latitude: 50.0872422, longitude: 14.4067877},
                        { latitude: 50.0861798, longitude: 14.4136572},
                    ]}
                    strokeColor="green"
                    strokeWidth={2}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default TripDayMap;