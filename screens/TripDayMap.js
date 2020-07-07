import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from 'react-native-maps';
import polyLine from '@mapbox/polyline';
import BackButton from '../components/Buttons/BackButton';

import Colors from '../constants/Colors';

import directionsRequest from '../utils/directionsRequest';

const CustomMarker = props => (
    <View w>
        <View
            style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                backgroundColor: "#ffff",
                borderColor: "#eee",
                borderRadius: 20,
                borderWidth: 2,
                borderColor: Colors.greenTitleColor
            }}
        >
            <Text>{props.text}</Text>
        </View>
    </View>
);

const TripDayMap = props => {
    const [directions, setDirections] = useState('');
    const [waypointOrder, setWaypointOrder] = useState([]);
    const { cityGeometry, placeIds, directionMode } = props.route.params.mapData;
    const places = useSelector(state => state.places.cachedPlaces);
    let polylineCoords = [];

    console.log(waypointOrder);

    if (directions !== '') {
        let steps = polyLine.decode(directions);

        for (let i = 0; i < steps.length; i++) {
            let tempLocation = {
                latitude: steps[i][0],
                longitude: steps[i][1]
            }
            polylineCoords.push(tempLocation);
        }
    }

    let tripDayPlaces = [];

    if (placeIds && placeIds.length > 0) {
        console.log('place Order');
        placeIds.map((placeId, pIndex) => {
            console.log(pIndex);
            const index = places.findIndex(place => place.id === placeId);
            tripDayPlaces.push(places[index]);
            console.log(places[index].name);
        })
    }

    console.log('waypoint Order');
    waypointOrder.map(index => {
        console.log(index);
        console.log(tripDayPlaces[index].name);
    })

    const getDirections = useCallback(async () => {
        const newDirections = await directionsRequest(placeIds, 'ChIJi3lwCZyTC0cRkEAWZg-vAAQ', directionMode);
        setDirections(newDirections.overview_polyline.points);
        setWaypointOrder(newDirections.waypoint_order);
    }, []);

    useEffect(() => {
        getDirections();
    }, [getDirections, directionsRequest])

    return (
        <View style={styles.container}>
            <BackButton navigation={props.navigation} />
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: cityGeometry.location.lat,
                    longitude: cityGeometry.location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {tripDayPlaces && directions !== '' && waypointOrder.map((waypointIndex,index) => (
                    <Marker
                        key={tripDayPlaces[waypointIndex].id}
                        coordinate={{
                            latitude: tripDayPlaces[waypointIndex].geometry.location.lat,
                            longitude: tripDayPlaces[waypointIndex].geometry.location.lng,
                        }}
                    >
                        <CustomMarker text={index + 1} />
                        <Callout>
                            <View style={{minWidth: 150, alignItems: "center"}}>
                                <Text>{tripDayPlaces[waypointIndex].name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
                {directions !== '' && <Polyline
                    coordinates={polylineCoords}
                    strokeColor={Colors.greenTitleColor}
                    strokeWidth={2}
                />}

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