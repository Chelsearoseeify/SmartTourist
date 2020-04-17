import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const ListCard = ({name, imageId}) => {
  return (
    <TouchableOpacity style={{padding: 8}}>
      <View
        style={{
          height: '100%',
          width: 160,
          elevation: 6,
          borderRadius: 18,
        }}>
        <ImageBackground
          source={imageId}
          style={styles.imageBackgroundStyle}
          imageStyle={{borderRadius: 10, opacity: 10}}
          resizeMode="cover">
          <View style={styles.filterStyle}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
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
    borderRadius: 10,
  },
  filterStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListCard;
