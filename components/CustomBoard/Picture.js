import React from 'react';

import {View, ImageBackground, StyleSheet} from 'react-native';

const Picture = ({src, viewStyle, imageStyle}) => {
  return (
    <View style={viewStyle}>
      <ImageBackground
        source={src}
        style={styles.imageThumbnail}
        imageStyle={imageStyle}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageThumbnail: {
    width: '100%',
    height: '100%',
  },
});

export default Picture;
