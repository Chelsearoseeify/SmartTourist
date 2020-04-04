import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import Colors from '../constants/Colors';

const ProfileScreen = () => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroudColor,
      }}>
      <Text category="h1">Profile</Text>
    </Layout>
  );
};

export default ProfileScreen;
