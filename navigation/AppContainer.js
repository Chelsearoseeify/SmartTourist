import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './AppNavigator';
import SignInScreen from './../screens/SignInScreen';
import SignUpScreen from './../screens/SignUpScreen';
import StartupScreen from './../screens/StartupScreen';
import MainPageScreen from './../screens/MainPageScreen';
const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Start" component={StartupScreen} />
      <Stack.Screen name="Signin" component={SignInScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

const AppContainer = props => {
  let isAuth = useSelector(state => !!state.user.token);
  const isCitySelected = useSelector(state => !!state.cities.selected_city);
  console.log(isAuth);
  console.log(isCitySelected);
  isAuth = true;
  return (
    <NavigationContainer style={{transparentCard: true}}>
      {isAuth ? (
        isCitySelected ? (
          <TabNavigator />
        ) : (
          <MainPageScreen />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppContainer;
