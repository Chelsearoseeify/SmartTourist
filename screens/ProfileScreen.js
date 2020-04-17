import React from 'react';
import {Text} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {
  View,
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NextTripCard from '../components/NextTripCard';
import CustomButton from './../components/CustomButton';
import PlaceCard from '../components/PlaceCard';
import HorizontalScrollView from '../components/HorizontalScrollView';
import {CITIES} from './../data/dummy-data';

const ProfileScreen = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        paddingTop: 10,
      }}>
      <View style={styles.usernameViewStyle}>
        <Text category="h2" style={styles.usernameStyle}>
          Chelsearoseeify
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.avatarView}>
              <ImageBackground
                source={require('../assets/images/harry.jpeg')}
                style={styles.avatar}
                imageStyle={{borderRadius: 50}}
                resizeMode="cover"
              />
            </View>

            <View style={styles.contentViewStyle}>
              <View style={styles.iconViewStyle}>
                <Icon style={styles.icon} name="cog" />
                <Icon style={styles.icon} name="ellipsis-v" />
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.subtitleStyle}>Your next trip</Text>
                <View style={styles.nextTripViewStyle}>
                  <NextTripCard />
                  <CustomButton />
                </View>
              </View>
              <View style={{marginEnd: -30}}>
                <HorizontalScrollView
                  name={'Your favourites'}
                  cities={CITIES}
                />
                <HorizontalScrollView
                  name={'Suggested trips'}
                  cities={CITIES}
                />
                <HorizontalScrollView
                  name={'Common destinations'}
                  cities={CITIES}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 100,
    marginBottom: 30,
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
    top: -50,
    left: 45,
    position: 'absolute',
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
  usernameViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 25,
    paddingBottom: 10,
    height: 100,
    flex: 1,
    position: 'absolute',
  },
  usernameStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
  },
  contentViewStyle: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 30,
    marginVertical: 25,
  },
  iconViewStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextTripViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 230,
  },
});

export default ProfileScreen;
