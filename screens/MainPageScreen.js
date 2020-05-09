import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ImageBackground,
  Button,
} from 'react-native';
import {Layout, Input} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import {addCity, fetchSelectedCity} from '../store/actions/cities';
import CustomButton from './../components/Buttons/CustomButton';
import CustomLabelButton from '../components/Buttons/CustomLabelButton';
import {LABELS} from '../data/dummy-data';

const FavouriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('Prague');
  const [types, setTypes] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.user.data);

  //this run whenever the component is loaded
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [dispatch]);

  const goToTravelPage = () => {
    dispatch(fetchSelectedCity('ChIJi3lwCZyTC0cRkEAWZg-vAAQ'));
    navigation.navigate('Travel');
  };

  /* const addNewCity = () => {
    dispatch(addCity());
  }; */

  const toggleType = newType => {
    const newTypeList = [...types];
    const index = types.findIndex(type => type === newType);
    if (index >= 0) newTypeList.splice(index, 1);
    else newTypeList.push(newType);
    setTypes(newTypeList);
    console.log(types);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 350, width: '100%', flex: 1, position: 'absolute'}}>
        <ImageBackground
          source={require('./../assets/images/MainPage.png')}
          style={styles.imageBackgroundStyle}
          resizeMode="cover">
          <View style={{paddingTop: 30, paddingLeft: 40}}>
            <Text
              style={{
                color: Colors.blueTitleColor,
                fontSize: 40,
                fontWeight: 'bold',
              }}>
              Choose
            </Text>
            <Text
              style={{
                color: Colors.blueTitleColor,
                fontSize: 40,
                fontWeight: 'bold',
              }}>
              Your
            </Text>
            <Text
              style={{
                color: Colors.blueTitleColor,
                fontSize: 40,
                fontWeight: 'bold',
              }}>
              Destination
            </Text>
          </View>
          <View style={{paddingTop: 10, paddingLeft: 40}}>
            <Text
              style={{
                color: Colors.blueTitleColor,
                fontSize: 18,
              }}>
              Where do you wanna go next?
            </Text>
            <Text
              style={{
                color: Colors.blueTitleColor,
                fontSize: 18,
              }}>
              Select your favourite city!
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <Input
                value={cityName}
                placeholder="Choose your city"
                onChangeText={v => setCityName(v)}
                style={styles.inputStyle}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'flex-start',
                  flexWrap: 'wrap',
                  paddingBottom: 20,
                }}>
                {LABELS.map(label => (
                  <CustomLabelButton
                    text={label.name}
                    toggleList={() => toggleType(label.name)}
                  />
                ))}
              </View>
              {/* <CustomButton text={'Add City'} onPress={addNewCity} /> */}
              <View style={{margin: 5}}>
                <CustomButton text={'Next'} onPress={goToTravelPage} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    marginTop: 260,
    padding: Style.paddingCardContainer,
    elevation: Style.elevation,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  cardContentStyle: {
    padding: Style.paddingCardContainer,
    height: 350,
    justifyContent: 'center',
  },
  inputStyle: {
    backgroundColor: Colors.inputBackgroundColor,
    marginVertical: 5,
    padding: 16,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: 20,
  },
});

export default FavouriteScreen;
