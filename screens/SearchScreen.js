import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';

const SearchScreen = () => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroudColor,
      }}>
      <Text category="h1">Search</Text>
    </Layout>
  );
};

export default SearchScreen;
