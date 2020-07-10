import React from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import _ from 'lodash';
import {useDispatch} from 'react-redux';
import Style from '../constants/Style';
import PlaceSearch from '../components/Inputs/PlaceSearch';
import {setSelectedCity} from './../store/actions/cities';
import BeautifulCities from './../containers/BeautifulCities';

import autocompleteType from '../constants/AutocompleteType';

const MainPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  /* const [cityId, setCityId] = useState();
  const [token, setToken] = useState(); */

  const onCitySelected = (cityId, token) => {
    dispatch(setSelectedCity(cityId, token));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#86CECE'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
        }}>
        <Text
          style={{
            color: Colors.blueTitleColor,
            fontSize: 35,
            fontWeight: 'bold',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: 10,
            paddingHorizontal: 60,
          }}>
          CHOOSE YOUR NEXT DESTINATION
        </Text>
        <ImageBackground
          source={require('./../assets/images/world.png')}
          style={styles.imageBackgroundStyle}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View style={styles.cardStyle}>
          <View style={styles.cardContentStyle}>
            <View
              style={{
                width: '100%',
                alignContent: 'center',
              }}>
              <Text style={styles.subtitleStyle}>Choose a city</Text>
              <PlaceSearch
                onQuerySelected={(cityName, cityId, token) => {
                  onCitySelected(cityId,token)
                }}
                searchType={autocompleteType.CITY}
                iconName="city-variant-outline"
                placeholder="Type a city name"
                inputPlaceholder="Search for a city"
              />
            </View>

            <View style={{marginEnd: -5, marginTop: 10, marginBottom: 40}}>
              <BeautifulCities
                {...navigation}
                onCitySelected={(city, token) => {
                  onCitySelected(city.id, token);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: 500,
    marginTop: 10,
  },
  cardStyle: {
    position: 'absolute',
    padding: Style.paddingCardContainer,
    ...Style.shadow,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
  },
  cardContentStyle: {
    padding: Style.paddingCardContainer,
    justifyContent: 'center',
  },
  inputStyle: {
    backgroundColor: Colors.inputBackgroundColor,
    marginVertical: 5,
    padding: 16,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: 20,
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h5,
    marginStart: 20,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default MainPageScreen;
