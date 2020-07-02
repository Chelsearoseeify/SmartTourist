import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from 'react-native-maps';
import polyLine from '@mapbox/polyline';
import BackButton from '../components/Buttons/BackButton';

import Colors from '../constants/Colors';

import directionsRequest from '../utils/directionsRequest';

const TripDayMap = props => {
    const [directions, setDirections] = useState("ckspHi{bwAeAPAf@Gl@YzC?XZ|EAf@K^}@lCmB~FUp@C?_BLeA?{@ESCcAWUIEBEVINCG?JDP?NqCnEEp@AjAQHSp@KLBN@ZUb@[h@S\\u@pAw@nA}BlDsCtEo@`Ak@~@Uf@_@p@uCnE[f@AJBXgAhBsAvCy@~Ae@hAHN_AjBETGJQLgAzBi@CQAMHcACSB]Hc@RZfAXz@Dp@PjAB`@@HPBh@HAnANxAa@ZLl@PdA?rAOl@C`@C|@FJ?R@TRvADn@?z@KpBo@xHWzCa@pG_@~Fw@lHMhAWfBEp@MlBKRU`CUdBSzACPLBARCdBx@Tf@D\\GPGQF]FQ?oA[MA@g@Kk@MUSIgAOQKGIEWCYCqBMyCQiAMa@SU{@y@kA_Ac@g@q@}@GSEk@BgEBkDBc@BUMEmBd@uA^e@Pi@_AqAuB}AeCw@wAa@gAQm@{@qDMy@QaCKiAgAiF]_BKFCIGBOo@e@iBUaB_@yAi@oB{@iCEEEAE?COCIG@A?GCq@}@SWu@VmBd@WFAOMgBg@}FMDWHEYCK@WKyAG[?Kh@MDAf@CHFHjAANGLIHHIFM@OEw@GWECSBU?m@N?NDLJnA?j@Hd@^KDCR~BZxDFz@|Bk@|@YfAvAD@HAFXL@X|@^|@Ll@`AnDT`BRv@`@`BFCAKnDsBhDwB~@m@h@WXIDRv@a@pBeAxAy@pEeC|A_AnDsBBG?k@Oe@AC@BJVD^?FBAtAaAh@[JCL@FTXfAp@YZGjABDHNBb@DTCTa@x@eBBUFKJ@^s@\\w@CWIOd@iAx@_BrAwCl@aAXg@CU?IFOdEqGZu@|@wArCwEnCeE~AeCz@_Bb@w@Ek@Te@HYLGBA?m@DeA@I`@s@lAiBb@u@?GGa@BFHODWFAz@V\\F`@DnAB|AGf@EhAqDnB{FJ]H]?]YkEA_@VyCJwA?KLAf@MNA");
    const { cityGeometry, placeIds } = props.route.params.mapData;
    const places = useSelector(state => state.places.cachedPlaces);
    let polylineCoords = [];

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

    let tripDayPlaces;

    if (placeIds && placeIds.length > 0) {
        tripDayPlaces = places.filter(place => {
            return placeIds.includes(place.id);
        })
    }

    const loadPlaces = async () => {
        const newDirections = await directionsRequest(placeIds, 'ChIJi3lwCZyTC0cRkEAWZg-vAAQ');
        setDirections(newDirections);
    };

    useEffect(() => {
        //loadPlaces();
    }, [loadPlaces])

    return (
        <View style={styles.container}>
            <BackButton navigation={props.navigation}/>
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
                {tripDayPlaces && tripDayPlaces.map((place, index) => (
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