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
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import CustomButton from './../components/Buttons/CustomButton';
import CitySearch from '../components/Inputs/CitySearch';
import {setSelectedCity} from './../store/actions/cities';
import BeautifulCities from './../containers/BeautifulCities';

const MainPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [cityId, setCityId] = useState();
  const [token, setToken] = useState();

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

            <View style={{marginEnd: -5, marginTop: 10}}>
              <BeautifulCities
                {...navigation}
                onCitySelected={(cityId, token) => {
                  setCityId(cityId);
                  setToken(token);
                }}
              />
            </View>

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
    marginStart: 20,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default MainPageScreen;
