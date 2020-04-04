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
      style={{margin: 20}}>
      <View>
        <Icon name="arrow-left" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
