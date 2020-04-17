import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.pop();
      }}
      style={{
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 35,
        height: 38,
        width: 38,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <Icon name="arrow-left" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
