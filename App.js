/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/AppNavigator';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import tripsReducer from './store/reducers/trips';

const rootReducer = combineReducers({
  trips: tripsReducer
})

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <NavigationContainer style={{ transparentCard: true }}>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
