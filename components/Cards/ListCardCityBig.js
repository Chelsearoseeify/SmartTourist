import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const ListCardCityBig = ({name, imageId, onPress, style = {height: 200}}) => {
  return (
    <TouchableOpacity style={[style, {padding: 8}]} onPress={onPress}>
      <View
        style={[
          styles.filterStyle,
          {
            height: '100%',
            width: 130,
            elevation: Style.elevation,
            borderRadius: Style.borderRadiusCard,
          },
        ]}>
        <ImageBackground
          source={{
            uri: imageId,
          }}
          style={styles.imageBackgroundStyle}
          imageStyle={{borderRadius: Style.borderRadiusCard}}
          resizeMode="cover">
          <View style={styles.filterStyle}>
            <Text
              style={{
                fontSize: Style.fontSize.h4,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {name}
            </Text>
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
