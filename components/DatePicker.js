import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar' />
);

export const CustomDatePicker = (props) => {
  const [dateText, setDateText] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDateText(currentDate.toLocaleDateString("en-US"));
  };

  return (
    <View>
      {/* <Datepicker
        style={styles.inputStyle}
        date={date}
        onSelect={newDate => setDate(newDate)}
        accessoryRight={CalendarIcon}
      /> */}
      <TextInput
        label={'    ' + props.label}
        value={dateText}
        placeholder={props.placeholder}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        style={Style.inputStyle}
      />
      {show && (
        <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        value={date}
        is24Hour={true}
        display="default"
        onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
});
