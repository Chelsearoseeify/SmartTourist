import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, Icon, Layout} from '@ui-kitten/components';
import Colors from '../constants/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../constants/Style';

const CalendarIcon = () => (
  <FontAwesome5Icon
    style={{
      fontSize: Style.inputIconSize,
      color: Colors.greyIconColor,
    }}
    name="calendar-alt"
  />
);

export const CustomDatePicker = () => {
  const [date, setDate] = React.useState(new Date());
  const [value, setValue] = React.useState('');
  return (
    <Layout style={styles.container}>
      <Input
        value={value}
        placeholder={'From'}
        onChangeText={nextValue => setValue(nextValue)}
        style={styles.inputStyle}
        icon={CalendarIcon}
      />
      <Input
        value={value}
        placeholder={'To'}
        onChangeText={nextValue => setValue(nextValue)}
        style={styles.inputStyle}
        icon={CalendarIcon}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputStyle: {
    backgroundColor: Colors.inputBackgroundColor,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: Style.borderRadiusCard,
    width: '50%',
  },
});
