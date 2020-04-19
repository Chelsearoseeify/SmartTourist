import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';

const ListCardCitySmall = ({name, imageId, style = {height: 160}}) => {
  return (
    <TouchableOpacity style={[style, {padding: 8}]}>
      <View
        style={{
          width: 150,
          height: '100%',
          elevation: 6,
          borderRadius: 18,
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
              fontSize: 20,
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
