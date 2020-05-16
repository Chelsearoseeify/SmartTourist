import React, {useState} from 'react';
import {Text} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {
  View,
  Image,
  Dimensions,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import BackButton from '../components/Buttons/BackButton';
import Carousel from 'react-native-snap-carousel';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Style from '../constants/Style';
import SearchBar from './../components/SearchBar';
import {useSelector} from 'react-redux';
import PositionButton from '../components/Buttons/PositionButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

//temporarly suspended, I dont care about Novara's points of interest LOL
requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    console.log('Android ' + response);
    if (response === 'granted') {
      locateCurrentPosition();
    }
  } else {
    let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('iPhone ' + response);
    if (response === 'granted') {
      locateCurrentPosition();
    }
  }
};

locateCurrentPosition = () => {
  Geolocation.getCurrentPosition(
    position => {
      console.log(JSON.stringify(position));
      let initialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      };
      this.setState({initialPosition});
    },
    error => Alert.alert(error.message),
  );
};

const MapScreenf = ({navigation, route}) => {
  const places = useSelector(state => state.places.places);
  const currentCity = useSelector(state => state.cities.selected_city);
  const markers = [];
  const [initialPosition, setInitialPosition] = useState({
    latitude: route.params.lat,
    longitude: route.params.lng,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });
  let _map = {};
  let _carousel = {};
  //locateCurrentPosition();
  //requestLocationPermission();

  const computeDistance = (placePosition, unit) => {
    const R = 6371e3; // metres
    const φ1 = (placePosition.lat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (initialPosition.latitude * Math.PI) / 180;
    const Δφ = ((initialPosition.latitude - placePosition.lat) * Math.PI) / 180;
    const Δλ =
      ((initialPosition.longitude - placePosition.lng) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let d = R * c; // in metres
    if (unit === 'km') {
      d /= 1000;
      d = Number.parseFloat(d).toFixed(2);
    } else {
      d = Math.round(d);
    }

    return d;
  };

  const onCarouselItemChange = index => {
    let location = places[index].geometry.location;
    _map.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
    markers[index].showCallout();
  };

  const onMarkerPressed = (location, index) => {
    _map.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
    _carousel.snapToItem(index);
  };

  const renderCarouselItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(_carousel.currentIndex);
          if (index === _carousel.currentIndex) {
            navigation.navigate('Place', {id: item.id, cityName: 'Prague'});
          } else if (index > _carousel.currentIndex) {
            _carousel.snapToNext();
          } else if (index < _carousel.currentIndex) {
            _carousel.snapToPrev();
          }
        }}>
        <View style={styles.cardContainer}>
          <View style={styles.contentStyle}>
            {item.name.lenght <= 23 ? (
              <Text style={styles.titleStyle}>{item.name}</Text>
            ) : (
              <Text style={styles.titleStyle}>{item.name.substr(0, 23)}</Text>
            )}
            <Text style={styles.subtitleStyle}>
              {computeDistance(item.geometry.location)} m, {item.rating} stars
            </Text>
          </View>
          <Image source={{uri: item.url}} style={styles.imageStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  const returnToInitialPosition = () => {
    _map.animateToRegion(initialPosition);
  };

  return (
    <View style={styles.container}>
      <BackButton {...navigation} />
      <PositionButton onPress={returnToInitialPosition} />
      <View style={{position: 'absolute', top: 50, width: '100%'}}>
        <SearchBar />
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={map => (_map = map)}
        initialRegion={initialPosition}>
        <Marker
          coordinate={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
          }}
          title={"You're here"}
        />
        {places.map((place, index) => (
          <Marker
            key={place.name}
            ref={ref => (markers[index] = ref)}
            onPress={() => onMarkerPressed(place.geometry.location, index)}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}>
            <Callout>
              <Text>{place.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Carousel
        ref={c => {
          _carousel = c;
        }}
        containerCustomStyle={styles.carousel}
        data={places}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={200}
        onSnapToItem={index => onCarouselItemChange(index)}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: Colors.greenTitleColor,
    height: 200,
    width: 200,
    borderRadius: Style.borderRadiusCard,
  },
  contentStyle: {
    alignSelf: 'center',
    padding: Style.paddingCard,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 60,
  },
  titleStyle: {
    color: 'white',
    fontSize: Style.fontSize.h6,
    alignSelf: 'center',
  },
  subtitleStyle: {
    color: 'white',
    fontSize: Style.fontSize.h7,
    alignSelf: 'center',
  },
  imageStyle: {
    height: 140,
    width: 200,
    top: 0,
    position: 'absolute',
    borderTopLeftRadius: Style.borderRadiusCard,
    borderTopRightRadius: Style.borderRadiusCard,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreenf;
