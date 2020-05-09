import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

import * as tripActions from '../../store/actions/trips';

import Colors from '../../constants/Colors';

const CalendarDatePicker = props => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const onDateChangeHandler = (date, type) => {
        if (type == 'END_DATE') {
            setEndDate(date);
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    }

    const onDateCompleted = () => {
        setShowCalendar(false);
        dispatch(tripActions.setTripDates({
            startDate: moment(startDate).unix(),
            endDate: moment(endDate).unix()
        }))
    }
    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.touchableStyle} onPress={() => setShowCalendar(true)}>
                <Text>{props.datesString ? props.datesString : 'Select travel dates'}</Text>
                <Icon name="calendar-month" size={22} style={{paddingTop: 4}} />
            </TouchableOpacity>
            {showCalendar &&
                <View>
                    <CalendarPicker
                        onDateChange={onDateChangeHandler}
                        allowRangeSelection={true}
                        allowRangeSelection={true}
                        todayBackgroundColor="#f2e6ff"
                        selectedDayColor="#7300e6"
                        selectedDayTextColor="#FFFFFF"
                        selectedRangeStyle={{ backgroundColor: Colors.greenButtonColor }}
                        selectedStartDate={startDate}
                        selectedEndDate={endDate}
                    />
                    <View style={styles.calendarButtonsContainer}>
                        <Button title="Done" onPress={onDateCompleted}></Button>
                    </View>
                </View>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20
    },
    touchableStyle: {
        height: 40,
        paddingLeft: 12,
        paddingRight: 20,
        marginBottom: 15,
        backgroundColor: Colors.inputBackgroundColor,
        borderColor: Colors.inputBackgroundColor,
        borderWidth: 0,
        borderRadius: 20,
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    calendarContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    calendarButtonsContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end"
    }
});

export default CalendarDatePicker;