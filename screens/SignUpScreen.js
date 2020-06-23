import React, {useState, useEffect, useReducer, useCallback} from 'react';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Style from '../constants/Style';
import {useDispatch} from 'react-redux';
import CustomButton from '../components/Buttons/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AuthInput from '../components/Inputs/AuthInput';
import * as authActions from './../store/actions/user';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignUpScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const height = Dimensions.get('window').height * 0.8;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    setError(null);
    try {
      await dispatch(
        authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password,
        ),
      );
      Alert.alert('Logged!');
    } catch (err) {
      setError(err.message);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={[styles.cardStyle, Style.shadow, {height: height}]}>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                height: 180,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: Style.fontSize.h3,
                  color: Colors.blueTitleColor,
                }}>
                Create Account
              </Text>
            </View>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={50}>
              <AuthInput
                id="email"
                label="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
                icon={'email-outline'}
              />
              <AuthInput
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue=""
                icon={'lock-outline'}
              />
              <View style={{marginTop: 100}}>
                <CustomButton text={'Register'} onPress={authHandler} />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get('window').height * 0.1,
          marginTop: 25,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={{fontWeight: 'bold', color: Colors.textInputIconColor}}>
            SIGN IN
          </Text>
        </TouchableOpacity>
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
    borderBottomLeftRadius: Style.borderRadiusCardContainer,
    borderBottomRightRadius: Style.borderRadiusCardContainer,
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
});

export default SignUpScreen;
