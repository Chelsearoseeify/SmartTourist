import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const GenericInput = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue.length > 0 ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });
  const { onInputChange, id } = props;

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    let isValid = true;
    if (text.length === 0) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  return (
    <View style={styles.formControl}>
      <View style={styles.inputSection}>
        <Icon style={styles.iconStyle} name={props.icon} />
        <TextInput
          placeholder={props.label}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          placeholderTextColor={Colors.textInputIconColor}
          style={{ color: Colors.blueTitleColor, flex: 1 }}
        />
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

let styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
    borderRadius: Style.borderRadiusCardContainer,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 0,
    borderColor: Colors.backgroundColor,
    marginBottom: 10,
    ...Style.shadow,
  },
  iconStyle: {
    color: Colors.textInputIconColor,
    fontSize: Style.inputIconSize + 3,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  formControl: {
    width: '100%',
    marginBottom: 10
  },
  label: {
    marginVertical: 8,
  },
});

export default GenericInput;
