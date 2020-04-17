import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';

const AddTripScreen = props => {
  return (
    <View style={styles.container}>
      <BackButton {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    backgroundColor: 'linen',
    flex: 1,
    flexDirection: 'row',
  },
});

export default AddTripScreen;
