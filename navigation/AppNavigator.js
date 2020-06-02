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
import TripsScreen from '../screens/TripsScreen';
import TripDetailScreen from '../screens/TripDetailScreen';

import MainPageScreen from './../screens/MainPageScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupedPlacesScreen from './../screens/GroupedPlacesScreen';
import MapScreenf from './../screens/MapScreenf';
import CustomFloatingButton from './../components/Buttons/CustomFloatingButton';
import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      {/*  <Stack.Screen name="Home" component={MainPageScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Travel" component={TravelScreen} />
      <Stack.Screen name="Place" component={PlaceScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Mapf" component={MapScreenf} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AddTrip" component={AddTripScreen} />
      <Stack.Screen name="GroupedPlaces" component={GroupedPlacesScreen} />
    </Stack.Navigator>
  );
}

function MyTripsStackNavigator() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="MyTrips" component={TripsScreen} />
        <Stack.Screen name="TripDetailScreen" component={TripDetailScreen} />
        <Stack.Screen name="Place" component={PlaceScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

function FavouriteStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Favourites" component={FavouriteScreen} />
      <Stack.Screen name="GroupedPlaces" component={GroupedPlacesScreen} />
      <Stack.Screen name="Place" component={PlaceScreen} />
      <Stack.Screen name="AddTrip" component={AddTripScreen} />
    </Stack.Navigator>
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
        name="MyTrips"
        component={MyTripsStackNavigator}
        options={{
          tabBarLabel: 'My Trips',
          tabBarIcon: ({color, size}) => (
            <Icon name="wallet-travel" color={color} size={26} />
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
