import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors';

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
    <Layout>
      {/* <Datepicker
        style={styles.inputStyle}
        date={date}
        onSelect={newDate => setDate(newDate)}
        accessoryRight={CalendarIcon}
      /> */}
      <Input
        label={'    ' + props.label}
        value={dateText}
        placeholder={props.placeholder}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        style={styles.inputStyle}
        accessoryRight={CalendarIcon}
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
    backgroundColor: Colors.inputBackgroundColor,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: 20,
    width: '100%'
  },
});
