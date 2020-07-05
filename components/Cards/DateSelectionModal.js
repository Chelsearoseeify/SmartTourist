import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Dimensions
} from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

import * as tripActions from '../../store/actions/trips';

import CustomButton from '../Buttons/CustomButton';

const DateSelectionModal = props => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const windowWidth = Dimensions.get("window").width;

  const onDateChangeHandler = (date, type) => {
    if (type == 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const onDateCompleted = () => {
    dispatch(
      tripActions.setTripDates({
        startDate: moment(startDate).unix(),
        endDate: moment(endDate).unix(),
      }),
    );
    onCloseModal();
  };

  const onCloseModal = () => {
    setStartDate(null);
    setEndDate(null);
    props.closeModal();
  };

  return (
    <Modal isVisible={props.visible} onBackdropPress={onCloseModal}>
      <View style={styles.citySearchModal}>
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
            textStyle={{
              color: Colors.blueTitleColor,
            }}
            width={windowWidth - 40}
          />
          <View style={styles.calendarButtonsContainer}>
            {/* <Button title="Done" onPress={onDateCompleted} /> */}
            <View style={{ width: '40%' }}>
              <CustomButton text="Done" onPress={onDateCompleted} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  citySearchModal: {
    padding: 20,
    minHeight: '50%',
    backgroundColor: 'white',
    borderRadius: Style.borderRadiusCard,
  },
  calendarContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  calendarButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
});

export default DateSelectionModal;
