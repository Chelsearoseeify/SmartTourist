/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './navigation/AppNavigator';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import tripsReducer from './store/reducers/trips';
import placesReducer from './store/reducers/places';
import cityReducer from './store/reducers/cities';
import userReducer from './store/reducers/user';
import favouritesReducer from './store/reducers/favourite';

const rootReducer = combineReducers({
  trips: tripsReducer,
  places: placesReducer,
  cities: cityReducer,
  user: userReducer,
  favourites: favouritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <NavigationContainer style={{transparentCard: true}}>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
