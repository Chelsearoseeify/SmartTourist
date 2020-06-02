import React, {useState} from 'react';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  CheckBox,
} from 'react-native';
import Style from '../constants/Style';
import {useDispatch} from 'react-redux';
import {ButtonComponent} from '@ui-kitten/components/ui/button/button.component';
import CustomButton from './../components/Buttons/CustomButton';

const LoginScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{borderWidth: 1}}>
        <View style={styles.cardStyle}>
          <View>
            <View
              style={{
                height: 180,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: Style.fontSize.h3}}>Sign In</Text>
            </View>

            <TextInput
              value={email}
              placeholder="Email"
              onChangeText={v => setEmail(v)}
              style={Style.inputStyle}
            />
            <TextInput
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={v => setPassword(v)}
              style={Style.inputStyle}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <Text>Stay logged in</Text>
              </View>
              <Text>Forgot your password?</Text>
            </View>
            <View style={{marginTop: 100}}>
              <CustomButton text={'Sign in'} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 25,
          borderWidth: 1,
        }}>
        <Text>CREATE ACCOUNT</Text>
      </View>
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'column',
    height: '100%',
  },
  cardStyle: {
    marginBottom: Style.marginTopCardContainer,
    padding: Style.paddingCardContainer,
    elevation: Style.elevation,
    borderBottomLeftRadius: Style.borderRadiusCardContainer,
    borderBottomRightRadius: Style.borderRadiusCardContainer,
    height: 520,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputStyle: {
    backgroundColor: Colors.inputBackgroundColor,
    marginVertical: 5,
    borderColor: Colors.inputBackgroundColor,
    borderWidth: 0,
    borderRadius: 20,
  },
  checkbox: {},
});

export default LoginScreen;
