import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Keyboard, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DateSelectionModal from '../Cards/DateSelectionModal';

import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

const CalendarDatePicker = props => {
  const [showCalendar, setShowCalendar] = useState(false);

  const openCalendar = () => {
    setShowCalendar(true);
    Keyboard.dismiss();
  }

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        style={Style.inputContainer}
        onPress={() => openCalendar()}>
        <Icon name="calendar-month" size={22} style={styles.iconStyle} />
        <Text style={{color: Colors.blueTitleColor}}>
          {props.datesString ? props.datesString : 'Select travel dates'}
        </Text>
      </TouchableOpacity>
      <DateSelectionModal
        visible={showCalendar}
        closeModal={()=>{setShowCalendar(false)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
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
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: Colors.textInputIconColor,
    fontSize: Style.inputIconSize + 3,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default CalendarDatePicker;
