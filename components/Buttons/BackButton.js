import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Platform} from 'react-native';
import Style from '../../constants/Style';

import {useHeaderHeight} from '@react-navigation/stack';

const BackButton = ({navigation, onPress = () => {}}) => {
  let headerHeight = useHeaderHeight();
  if (Platform.OS === 'android' && Platform.Version > 21) headerHeight += 15;
  else headerHeight -= 50;
  return (
    <View
      style={{
        position: 'absolute',
        top: headerHeight,
        zIndex: 2,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
          onPress();
        }}
        style={{
          marginLeft: 20,
          padding: 8,
          backgroundColor: 'rgba(32,80,114, 0.7)',
          borderRadius: Style.borderRadiusRoundButton,
          height: 35,
          width: 35,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View style={{paddingLeft: 2}}>
          <Icon name="chevron-left" size={Style.backIconSize} color={'white'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
