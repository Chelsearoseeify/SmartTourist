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
import CustomFloatingButton from './../components/CustomFloatingButton';
import HorizontalScrollView from '../components/HorizontalScrollView';
import ListHeader from '../components/ListHeader';
import CardTypes from '../constants/CardTypes';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const addTripHandler = () => {
    navigation.navigate('AddTrip');
  };

  return (
    <View
      style={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
      }}>
      <View style={styles.usernameViewStyle}>
        <Text category="h2" style={styles.usernameStyle}>
          Chelsearoseeify
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 30,
          zIndex: 1,
          elevation: 6,
        }}>
        <CustomFloatingButton onPress={addTripHandler} />
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
              <View style={{paddingLeft: 20}}>
                <ListHeader name={'Your next trip'} />
                <View style={styles.nextTripViewStyle}>
                  <NextTripCard />
                </View>
                <HorizontalScrollView
                  name={'Your favourites'}
                  cities={useSelector(state => state.cities.beautiful_cities)}
                  elemType={CardTypes.LIST_CARD_BIG}
                  navigation={navigation}
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
    height: 200,
    paddingEnd: 20,
  },
});

export default ProfileScreen;
