import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {View, StyleSheet, ImageBackground, Button, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NextTripCard from '../components/NextTripCard';
import CustomButton from './../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import PlaceCard from '../components/PlaceCard';
import HorizontalScrolliew from '../components/HorizontalScrollView';
import {CITIES} from './../data/dummy-data';

const ProfileScreen = () => {
  return (
    <Layout
      style={{
        backgroundColor: Colors.backgroudColor,
        flex: 1,
      }}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginRight: 25,
          height: 100,
        }}>
        <Text
          category="h2"
          style={{
            color: Colors.blueTitleColor,
            fontWeight: 'bold',
          }}>
          Chelsearoseeify
        </Text>
      </View>
      <View style={styles.cardStyle}>
        <View style={styles.avatarView}>
          <ImageBackground
            source={require('../assets/images/harry.jpeg')}
            style={styles.avatar}
            imageStyle={{borderRadius: 50}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginHorizontal: 30,
            marginVertical: -25,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Icon style={styles.icon} name="cog" />
            <Icon style={styles.icon} name="ellipsis-v" />
          </View>
          <View style={{marginTop: 5}}>
            <Text style={styles.subtitleStyle}>Your next trip</Text>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                height: 230,
              }}>
              <NextTripCard />
              <CustomButton />
            </View>
          </View>
          <ScrollView>
            <HorizontalScrolliew name={'Your favourites'} cities={CITIES} />
            <HorizontalScrolliew name={'Suggested trips'} cities={CITIES} />
            <HorizontalScrolliew name={'Common destinations'} cities={CITIES} />
          </ScrollView>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 10,
    elevation: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: '100%',
    backgroundColor: 'white',
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 10,
    paddingStart: 5,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  avatarView: {
    elevation: 10,
    borderRadius: 45,
    height: 100,
    width: 100,
    marginTop: -50,
    marginLeft: 45,
  },
  icon: {
    fontSize: 25,
    marginHorizontal: 20,
    color: Colors.blueTitleColor,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileScreen;
