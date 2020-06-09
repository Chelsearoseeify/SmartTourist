import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import Style from '../../constants/Style';

const Description = ({name, counter}) => {
  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
      <Text style={{fontWeight: 'bold', fontSize: Style.fontSize.h5}}>
        {name}
      </Text>
      <Text style={{fontWeight: '200', fontSize: Style.fontSize.h6}}>
        {counter > 1 ? `${counter} Places` : `${counter} Place`}
      </Text>
    </View>
  );
};

export default Description;
