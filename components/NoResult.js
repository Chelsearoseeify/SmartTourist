import React from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
import Style from '../constants/Style';
import {Dimensions} from 'react-native';

const NoResult = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <ImageBackground
        style={{
          height: 350,
          width: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{
          resizeMode: 'contain',
        }}
        source={require('./../assets/images/sadCloudNoText.png')}
      >
        <View
          style={{
            marginTop: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{fontSize: Style.fontSize.h2}}>No result found</Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: Style.fontSize.h6,
              color: 'grey',
            }}
          >
            We can't find any item matching your search
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NoResult;
