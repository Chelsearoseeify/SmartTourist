import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

const Description = ({name}) => {
  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{name}</Text>
      <Text style={{fontWeight: '200', fontSize: 18}}>
        {Math.floor(Math.random() * 100) + 1} Favourites
      </Text>
    </View>
  );
};

export default Description;
