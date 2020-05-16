import React from 'react';
import {View, Text} from 'react-native';
import MapButton from './Buttons/MapButton';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const Header = ({title, mapIcon = 'true', onMapPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 15,
        width: '100%',
      }}>
      {mapIcon ? <MapButton onPress={onMapPress} /> : <View />}
      <Text
        style={{
          color: Colors.blueTitleColor,
          fontWeight: 'bold',
          fontSize: Style.fontSize.h1,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
