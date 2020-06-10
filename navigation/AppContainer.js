import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './AppNavigator';
import SignInScreen from './../screens/SignInScreen';
import SignUpScreen from './../screens/SignUpScreen';
import StartupScreen from './../screens/StartupScreen';

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
  /* const isAuth = useSelector(state => !!state.user.token);
  console.log(isAuth); */
  const isAuth = true;
  return (
    <NavigationContainer style={{transparentCard: true}}>
      {isAuth ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppContainer;
