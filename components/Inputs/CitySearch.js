import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';
import {v4 as uuidv4} from 'react-native-uuid';
import {queryCity, setSelectedCity} from '../../store/actions/cities';

const CitySearch = props => {
  const dispatch = useDispatch();
  const [text, setText] = useState(props.cityName ? props.cityName : '');
  const [token, setToken] = useState('');
  const [showList, setShowList] = useState(false);
  const predictions = useSelector(state => state.cities.queryPredictions);
  const onFocus = () => {
    setToken(uuidv4());
    setText('');
  };

  const queryData = () => {
    dispatch(queryCity(token, text));
    setShowList(true);
  };

  const changeTextHandler = text => {
    if (text.length > 2) {
      queryData();
    } else {
      setShowList(false);
    }
    setText(text);
  };

  const predictionSelectHandler = item => {
    props.onQuerySelected(item.place_id, token)
    setText(item.description);
    Keyboard.dismiss();
  };

  const renderPredictionItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          predictionSelectHandler(item);
        }}
        style={styles.predictionItem}>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{zIndex: 1}}>
      <TextInput
        value={text}
        onChangeText={nText => changeTextHandler(nText)}
        style={Style.inputStyle}
        placeholder="Type city name"
        onFocus={onFocus}
        onBlur={() => setShowList(false)}
        label="    City"
        keyboardType="default"
      />
      {showList && (
        <View style={styles.predictionContainer}>
          {predictions.map(p => renderPredictionItem(p))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  predictionContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: Colors.inputBackgroundColor,
    borderRadius: 10,
    zIndex: 2,
    elevation: Style.elevation + 1,
  },
  predictionItem: {
    width: '100%',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    zIndex: 4,
  },
});

export default CitySearch;
