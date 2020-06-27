import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import CustomButton from './../components/Buttons/CustomButton';
import CitySearch from '../components/Inputs/CitySearch';
import {fetchBeautifulCities, setSelectedCity} from './../store/actions/cities';
import SmallListCard from '../components/Cards/ListCardCitySmall';

const MainPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const beautifulCities = useSelector(state => state.cities.beautiful_cities);
  const [cityId, setCityId] = useState();
  const [token, setToken] = useState();

  let cityIcons = new Map();
  cityIcons.set(
    'Barcelona',
    require('../assets/images/icons/barcelonaIcon.png'),
  );
  cityIcons.set('New York', require('../assets/images/icons/newYorkIcon.png'));
  cityIcons.set('Rome', require('../assets/images/icons/romeIcon.png'));
  cityIcons.set('Paris', require('../assets/images/icons/parisIcon.png'));
  cityIcons.set('London', require('../assets/images/icons/londonIcon.png'));

  useEffect(() => {
    const loadBeautifulCities = async () => {
      try {
        await dispatch(fetchBeautifulCities());
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadBeautifulCities();
  }, [dispatch, fetchBeautifulCities]);

  const onCitySelected = (cityId, token) => {
    dispatch(setSelectedCity(cityId, token));
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 530,
          width: '100%',
          flex: 1,
          position: 'absolute',
          backgroundColor: '#86CECE',
        }}>
        <ImageBackground
          source={require('./../assets/images/world.png')}
          style={styles.imageBackgroundStyle}
          resizeMode="cover">
          <Text
            style={{
              color: Colors.blueTitleColor,
              fontSize: 35,
              fontWeight: 'bold',
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 160,
              marginBottom: 10,
              paddingHorizontal: 40,
            }}>
            CHOOSE YOUR NEXT DESTINATION
          </Text>
        </ImageBackground>
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
        <View style={styles.cardStyle}>
          <View style={styles.cardContentStyle}>
            <View
              style={{
                width: '100%',
                alignContent: 'center',
              }}>
              <Text style={styles.subtitleStyle}>Choose a city</Text>

              <CitySearch
                onQuerySelected={(cityId, token) => {
                  setCityId(cityId);
                  setToken(token);
                }}
              />
            </View>

            <Text style={styles.subtitleStyle}>Beautiful Cities</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {beautifulCities.map(city => {
                return (
                  <SmallListCard
                    name={city.name}
                    imageId={cityIcons.get(city.name)}
                    onPress={() => {
                      console.log('here');
                      setCityId(city);
                    }}
                  />
                );
              })}
            </ScrollView>
            <View style={{marginTop: 20}}>
              <CustomButton
                text={'Travel'}
                onPress={() => {
                  onCitySelected(cityId, token);
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
    height: '100%',
    marginTop: 20,
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
    marginStart: 10,
    marginVertical: 5,
  },
});

export default MainPageScreen;
