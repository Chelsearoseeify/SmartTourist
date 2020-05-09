import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TravelScreen from '../screens/TravelScreen';
import PlaceScreen from '../screens/PlaceScreen';
import MapScreen from '../screens/MapScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavouriteScreen from '../screens/FavouritesScreen';
import AddTripScreen from '../screens/AddTripScreen';
import MainPageScreen from './../screens/MainPageScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupedPlacesScreen from './../screens/GroupedPlacesScreen';
import MapScreenf from './../screens/MapScreenf';
import CustomFloatingButton from './../components/Buttons/CustomFloatingButton';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={MainPageScreen} />
        <Stack.Screen name="Travel" component={TravelScreen} />
        <Stack.Screen name="Place" component={PlaceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Mapf" component={MapScreenf} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="AddTrip" component={AddTripScreen} />
        <Stack.Screen name="GroupedPlaces" component={GroupedPlacesScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

function ProfileStackNavigator() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Place" component={PlaceScreen} />
        <Stack.Screen name="AddTrip" component={AddTripScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

function FavouriteStackNavigator() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Favourites" component={FavouriteScreen} />
        <Stack.Screen name="GroupedPlaces" component={GroupedPlacesScreen} />
        <Stack.Screen name="Place" component={PlaceScreen} />
        <Stack.Screen name="AddTrip" component={AddTripScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Travel',
          tabBarIcon: ({color, size}) => (
            <Icon name="compass" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Icon name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={AddTripScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{marginBottom: 30, elevation: 6}}>
              <CustomFloatingButton />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteStackNavigator}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
