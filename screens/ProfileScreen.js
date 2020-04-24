import React from 'react';
import {Text} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import {View, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NextTripCard from '../components/NextTripCard';
import CustomFloatingButton from '../components/Buttons/CustomFloatingButton';
import HorizontalScrollView from '../components/HorizontalScrollView';
import ListHeader from '../components/ListHeader';
import CardTypes from '../constants/CardTypes';
import {useSelector} from 'react-redux';
import Header from './../components/Header';
import Style from '../constants/Style';

const ProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state.user.data);
  console.log(userData);
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
        <Header title={'Chelsearoseeify'} mapIcon={false} />
      </View>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 30,
          zIndex: 1,
          elevation: Style.elevation,
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
                source={{uri: userData.icon}}
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

              <View style={{paddingLeft: 10, marginTop: 10}}>
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
    marginTop: 80,
    padding: Style.paddingCardContainer,
    elevation: Style.elevation,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  subtitleStyle: {
    color: Colors.greenTitleColor,
    fontWeight: 'bold',
    fontSize: Style.fontSize.h4,
    paddingTop: 10,
    paddingStart: 5,
  },
  avatar: {
    height: 85,
    width: 85,
  },
  avatarView: {
    elevation: Style.elevation,
    borderRadius: 45,
    height: 85,
    width: 85,
    top: -40,
    left: 40,
    position: 'absolute',
  },
  icon: {
    fontSize: Style.iconSize,
    paddingHorizontal: 24,
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
    height: 80,
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
    marginVertical: 20,
  },
  iconViewStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  nextTripViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    paddingEnd: 10,
  },
});

export default ProfileScreen;
