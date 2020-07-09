import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from '../components/Buttons/CustomButton';
import CitySearch from '../components/Inputs/CitySearch';
import CalendarDatePicker from '../components/Inputs/CalendarDatePicker';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constants/Colors';

import {setTripCity, createTrip} from '../store/actions/trips';

import GenericInput from './Inputs/GenericInput';

const AddTrip = props => {
  const dispatch = useDispatch();
  const [tripName, setTripName] = useState('');
  const selectedCity = useSelector(state => state.cities.selected_city);
  const newTrip = useSelector(state => state.trips.newTrip);
  const [tripCityName, setTripCityName] = useState('');

  const addTripHandler = async () => {
    await dispatch(
      createTrip({
        name: tripName,
        cityId: newTrip.cityId === '' ? selectedCity.id : newTrip.cityId,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
      }),
    );
    setTripCityName('');
    setTripName('');
    props.navigation.navigate('MyTrips', {screen: 'MyTrips'});
  };

  const onCitySelected = (cityName, cityId, token) => {
    setTripCityName(cityName);
    dispatch(setTripCity(cityId, token));
  };

  const onInputChange = text => {
    setTripName(text);
  };

  const isTripValid = () => {
    let validity = true;

    if (tripName === '') {
      validity = false;
    }

    if (newTrip.startDate === null || newTrip.endDate === null) {
      validity = false;
    }

    return validity;
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
        <GenericInput
          id="tripName"
          label="Trip Name"
          required
          autoCapitalize="sentences"
          errorText="Please enter a valid trip name."
          onInputChange={(id, v, valid) => onInputChange(v)}
          initialValue={tripName}
          icon={'pen'}
        />

        <View style={{marginBottom: 10}}>
          <CitySearch
            cityName={tripCityName !== '' ? tripCityName : selectedCity.name}
            onQuerySelected={(cityName, cityId, token) =>
              onCitySelected(cityName, cityId, token)
            }
          />
        </View>

        <View style={{marginBottom: 10}}>
          <CalendarDatePicker datesString={newTrip.dateString} />
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <View style={{width: 130}}>
            <CustomButton
              text={'ADD'}
              onPress={addTripHandler}
              disabled={!isTripValid()}
            />
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
    marginBottom: 5,
    paddingStart: 5,
    paddingBottom: 15,
  },
});

export default AddTrip;
