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

const App = () => {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <NavigationContainer style={{transparentCard: true}}>
        <TabNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
