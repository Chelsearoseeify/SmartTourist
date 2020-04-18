import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    flexDirection: 'row',
  },
});

export default AddTripScreen;
