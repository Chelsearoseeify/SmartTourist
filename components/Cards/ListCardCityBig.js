import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

const ListCardCityBig = ({
  name,
  subTitle,
  imageId,
  onPress,
  width = 140,
  height = 180,
}) => {
  return (
    <TouchableOpacity
      style={{ padding: Style.marginCard, width: width }}
      onPress={onPress}>
      <View
        style={[
          styles.filterStyle,
          Style.shadow,
          {
            height: height,
            borderRadius: Style.borderRadiusCard,
          },
        ]}>
        <ImageBackground
          source={{
            uri: imageId,
          }}
          style={styles.imageBackgroundStyle}
          imageStyle={{ borderRadius: Style.borderRadiusCard }}
          resizeMode="cover">
          <View style={styles.filterStyle}>
            <Text
              style={{
                fontSize: Style.fontSize.h5,
                fontWeight: 'bold',
                color: 'white',
                width: '80%',
                marginBottom: 5,
                textAlign: 'center'
              }}>
              {name}
            </Text>
            {subTitle &&
              <Text
                style={{
                  fontSize: Style.fontSize.h6,
                  color: 'white',
                  width: '80%',
                  textAlign: 'center'
                }}>
                {subTitle}
              </Text>
            }
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
    borderRadius: Style.borderRadiusCard,
    backgroundColor: Colors.backgroundColor,
  },
  filterStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: Style.borderRadiusCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListCardCityBig;
