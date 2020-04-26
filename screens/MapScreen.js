import React, {Component} from 'react';
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
import BackButton from '../components/BackButton';
import Carousel from 'react-native-snap-carousel';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Style from '../constants/Style';
import SearchBar from './../components/SearchBar';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'San Francisco',
  };

  state = {
    markers: [],
    coordinates: [
      {
        name: 'Dolci E Capricci',
        latitude: 45.431345,
        longitude: 8.619301,
        image: require('./../assets/images/1.jpg'),
        image_:
          'https://www.aprireinfranchising.it/useruploads/images/news/aprire-una-bakery.jpg',
      },
      {
        name: '158 Sushi',
        latitude: 45.435016,
        longitude: 8.614936,
        image: require('./../assets/images/2.jpg'),
        image_:
          'https://wips.plug.it/cips/buonissimo.org/cms/2012/03/nigiri-sushi.jpg?w=541&a=c&h=309',
      },
      {
        name: 'Delizie',
        latitude: 45.437191,
        longitude: 8.611553,
        image: require('./../assets/images/3.jpg'),
        image_:
          'https://wips.plug.it/cips/buonissimo.org/cms/2012/03/nigiri-sushi.jpg?w=541&a=c&h=309',
      },
      {
        name: '049',
        latitude: 45.445373,
        longitude: 8.616849,
        image: require('./../assets/images/4.jpg'),
        image_:
          'https://www.italiaatavola.net/images/contenutiarticoli/bar-pini.jpg',
      },
      {
        name: 'Shabu',
        latitude: 45.445749,
        longitude: 8.616825,
        image: require('./../assets/images/5.jpg'),
        image_:
          'https://www.cosaordino.it/assets/frontend/images/catene/shabu_cover.jpg',
      },
    ],
  };

  componentDidMount() {
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android ' + response);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone ' + response);
      if (response === 'granted') {
        this.locateCurrentPosition();
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

  onCarouselItemChange = index => {
    let location = this.state.coordinates[index];
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
    this.state.markers[index].showCallout();
  };

  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
    this._carousel.snapToItem(index);
  };

  renderCarouselItem = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.contentStyle}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text style={styles.subtitleStyle}>2mi, 4 stars</Text>
        </View>
        <Image source={item.image} style={styles.imageStyle} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <BackButton {...this.props} />
        <View style={{position: 'absolute', top: 50, width: '100%'}}>
          <SearchBar />
        </View>

        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={map => (this._map = map)}
          initialRegion={this.state.initialPosition}>
          <Marker
            coordinate={{latitude: 45.4343308, longitude: 8.6130897}}
            title={'San Francisco'}>
            <Image source={require('./../assets/images/sushi.png')} />
          </Marker>
          {this.state.coordinates.map((marker, index) => (
            <Marker
              key={marker.name}
              ref={ref => (this.state.markers[index] = ref)}
              onPress={() => this.onMarkerPressed(marker, index)}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}>
              <Callout>
                <Text>{marker.name}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          containerCustomStyle={styles.carousel}
          data={this.state.coordinates}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={150}
          onSnapToItem={index => this.onCarouselItemChange(index)}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: Colors.greenTitleColor,
    height: 200,
    width: 150,
    borderRadius: Style.borderRadiusCard,
  },
  contentStyle: {
    alignSelf: 'center',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    padding: Style.paddingCard,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  titleStyle: {
    color: 'white',
    fontSize: Style.fontSize.h7,
  },
  subtitleStyle: {color: 'white', fontSize: Style.fontSize.h8},
  imageStyle: {
    height: 140,
    width: 150,
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
