import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import CustomButton from '../components/Buttons/CustomButton';
import CitySearch from '../components/Inputs/CitySearch';
import CalendarDatePicker from '../components/Inputs/CalendarDatePicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import Colors from '../constants/Colors';

import * as tripActions from '../store/actions/trips';

import {setSelectedCity} from '../store/actions/cities';
import GenericInput from './Inputs/GenericInput';

const AddTrip = () => {
  const dispatch = useDispatch();
  const [tripName, setTripName] = useState('');
  const selectedCity = useSelector(state => state.cities.selected_city);
  const newTrip = useSelector(state => state.trips.newTrip);

  const addTripHandler = () => {
    dispatch(
      tripActions.createTrip({
        name: tripName,
        city: selectedCity.name,
      }),
    );
  };
  const onCitySelected = (cityId, token) => {
    dispatch(setSelectedCity(cityId, token));
  };

  return (
    <View style={styles.listViewStyle}>
      <View>
        <Text style={styles.subtitleStyle}>Create your trip</Text>
      </View>

      <View
        style={{
          width: '100%',
          alignContent: 'center',
        }}>
        {/* <View style={Style.inputStyle}>
          <Icon name="pen" size={22} style={Style.inputIconStyle} />
          <TextInput
            value={tripName}
            placeholder="Choose your trip name"
            placeholderTextColor={Colors.textInputIconColor}
            onChangeText={v => setTripName(v)}
          />
        </View> */}
        <GenericInput
          id="tripName"
          label="Trip Name"
          required
          autoCapitalize="sentences"
          errorText="Please enter a valid trip name."
          onInputChange={v => setTripName(v)}
          initialValue={tripName}
          icon={'pen'}
        />

        <CitySearch
          cityName={selectedCity.name}
          onQuerySelected={(cityId, token) => onCitySelected(cityId, token)}
        />
        <CalendarDatePicker datesString={newTrip.dateString} />

        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <View style={{width: 150}}>
            <CustomButton text={'ADD'} onPress={addTripHandler} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listViewStyle: {
    marginTop: 10,
    marginBottom: 20,
  },
  inputStyle: {
    backgroundColor: Colors.inputBackgroundColor,
    marginVertical: 5,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: 20,
  },
  subtitleStyle: {
    color: Colors.blueTitleColor,
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    marginBottom: 5,
    paddingStart: 5,
    marginHorizontal: 25,
    paddingBottom: 5,
  },
});

export default AddTrip;
