import React, {Component} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';

const FavouriteScreen = () => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroudColor,
      }}>
      <Text category="h1">Favourites</Text>
    </Layout>
  );
};

export default FavouriteScreen;
