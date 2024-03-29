import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from './../store/actions/user';

const StartupScreen = props => {
  const dispatch = useDispatch();

  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      props.navigation.navigate('Signin');
      return;
    }
    const transformedData = JSON.parse(userData);
    const {token, userId, expiryDate} = transformedData;
    const expirationDate = new Date(expiryDate);

    if (expirationDate <= new Date() || !token || !userId) {
      props.navigation.navigate('Signin');
      return;
    }

    const expirationTime = expirationDate.getTime() - new Date().getTime();

    dispatch(authActions.authenticate(userId, token, expirationTime));
  };

  const getSelectedCity = async () => {
    const selectedCity = await AsyncStorage.getItem('selectedCity');
  };

  useEffect(() => {
    tryLogin();
    getSelectedCity();
  }, [tryLogin, getSelectedCity]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
