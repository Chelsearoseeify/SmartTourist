import React from 'react';

import {View, ScrollView} from 'react-native';
import ListHeader from './ListHeader';
import {useDispatch} from 'react-redux';
import {fetchSelectedCity} from '../store/actions/cities';

const HorizontalScrolliew = ({name, paddingLeft, onMoreTap, children}) => {
  const dispatch = useDispatch();

  const onPressHandler = city => {
    console.log(city);
    dispatch(fetchSelectedCity(city.id));
    navigation.navigate('Travel', {});
  };

  return (
    <View>
      <ListHeader name={name} padding={paddingLeft} action={onMoreTap} />
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

export default HorizontalScrolliew;
