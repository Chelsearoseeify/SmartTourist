import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const ListCardCitySmall = ({name, imageId, onPress, style = {height: 170}}) => {
  return (
    <TouchableOpacity style={[style, {paddingVertical: 10}]} onPress={onPress}>
      <View
        style={[
          Style.shadow,
          {
            width: 120,
            height: '100%',
            borderRadius: Style.borderRadiusCard,
            backgroundColor: 'white',
            marginHorizontal: 8,
          },
        ]}>
        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            paddingBottom: 65,
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={imageId}
            resizeMode="stretch"
          />
          <Text
            style={{
              fontSize: Style.fontSize.h6,
              fontWeight: 'bold',
              color: Colors.blueTitleColor,
              alignSelf: 'center',
            }}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListCardCitySmall;
