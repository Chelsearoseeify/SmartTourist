import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const ListCardCitySmall = ({name, imageId, onPress, style = {height: 160}}) => {
  return (
    <TouchableOpacity style={[style, {padding: 8}]} onPress={onPress}>
      <View
        style={{
          width: 130,
          height: '100%',
          elevation: Style.elevation,
          borderRadius: Style.borderRadiusCard,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 15,
            paddingBottom: 70,
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
              fontSize: Style.fontSize.h5,
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

const styles = StyleSheet.create({});

export default ListCardCitySmall;
