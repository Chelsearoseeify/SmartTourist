import React from 'react';

import { View, ScrollView } from 'react-native';
import ListHeader from './ListHeader';

const HorizontalScrolliew = ({
  name,
  paddingLeft,
  onMoreTap,
  children,
  height = 200,
  isThereMore = true,
}) => {

  return (
    <View style={{ zIndex: 2 }}>
      <ListHeader
        name={name}
        padding={paddingLeft}
        action={onMoreTap}
        isThereMore={isThereMore}
      />
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center'
          }}
          style={{ height: height }}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

export default HorizontalScrolliew;
