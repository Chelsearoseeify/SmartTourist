import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { CustomDatePicker } from './../components/DatePicker';
//import DateRangePicker from '../components/DateRangePicker/DateRangePicker';
import CalendarPicker from 'react-native-calendar-picker'
import CustomButton from '../components/Buttons/CustomButton';
import CitySearch from '../components/Inputs/CitySearch';
import { useDispatch } from 'react-redux';
import Style from '../constants/Style';
import Colors from '../constants/Colors';

import * as tripActions from '../store/actions/trips';

import moment from 'moment';

const AddTrip = () => {
    const dispatch = useDispatch();
    const [tripName, setTripName] = useState('');
    const [cityName, setCityName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const addTripHandler = () => {
        dispatch(tripActions.createTrip(
            {
                name: tripName,
                city: cityName,
                startDate: startDate.unix(),
                endDate: endDate.unix()
            }
        ))
    }

    const onDateChangeHandler = (date, type) =>{
        console.log(`Start date: ${moment.unix(startDate)}`);
        console.log(`End date: ${moment.unix(endDate)}`);
        if(type == 'END_DATE'){
            setEndDate(date);
        }else{
            setStartDate(date);
            setEndDate(null);
        }
    }

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
                <TextInput
                    value={tripName}
                    placeholder="Choose your trip name"
                    onChangeText={v => setTripName(v)}
                    style={Style.inputStyle}
                />

                <CitySearch />
                {/* <CustomDatePicker label='From' placeholder="Choose start date" />
                <CustomDatePicker label='To' placeholder="Choose end date" /> */}
                {/* <DateRangePicker
                    onSuccess={(s, e) => alert(s + '||' + e)}
                    theme={{ markColor: 'red', markTextColor: 'white' }}
                /> */}

                <CalendarPicker
                    onDateChange={onDateChangeHandler}
                    allowRangeSelection={true}
                    allowRangeSelection={true}
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    selectedRangeStyle={{ backgroundColor: Colors.greenButtonColor }}
                />
                <View
                    style={{
                        width: '100%',
                        alignItems: 'flex-end',
                    }}>
                    <View style={{ width: 150 }}>
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
    }
});

export default AddTrip;