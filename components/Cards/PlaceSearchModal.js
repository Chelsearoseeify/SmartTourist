import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { queryAutocomplete } from '../../store/actions/places';

import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PlaceSearchModal = props => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [showList, setShowList] = useState(false);
  const predictions = useSelector(state => state.places.queryPredictions);

  const queryData = () => {
    dispatch(queryAutocomplete(props.token, text, props.seatchType, props.location));
    setShowList(true);
  };

  const predictionSelectHandler = item => {
    props.onPredictionSelected(item.structured_formatting.main_text, item.place_id);
    onCloseModal();
    Keyboard.dismiss();
  };

  const changeTextHandler = text => {
    if (text.length > 2) {
      queryData();
    } else {
      setShowList(false);
    }
    setText(text);
  };

  const renderPredictionItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          predictionSelectHandler(item);
        }}
        style={styles.predictionItem}>
        <Text style={{ width: '90%' }}>{item.description}</Text>
        <Icon
          style={{ ...styles.iconStyle, alignSelf: 'flex-end' }}
          name={'arrow-top-right'}
        />
      </TouchableOpacity>
    );
  };

  const onCloseModal = () => {
    setShowList(false);
    setText('');
    props.closeModal();
  };

  return (
    <Modal isVisible={props.visible} onBackdropPress={onCloseModal}>
      <View style={styles.citySearchModal}>
        <View style={styles.inputSection}>
          <Icon style={styles.iconStyle} name={props.iconName} />
          <TextInput
            value={text}
            onChangeText={nText => changeTextHandler(nText)}
            placeholder={props.placeholder}
            onBlur={() => setShowList(false)}
            keyboardType="default"
            placeholderTextColor={Colors.textInputIconColor}
            autoFocus={true}
          />
        </View>

        {showList && predictions.map(p => renderPredictionItem(p))}
        {showList &&
          <View style={{ alignItems: "flex-end", width: '100%' }}>
            <Image source={require('./powered_by_google.png')} style={{ width: '50%', resizeMode: "contain" }}></Image>
          </View>
        }
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
    borderRadius: Style.borderRadiusCardContainer,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 0,
    borderColor: Colors.backgroundColor,
    marginBottom: 20,
    ...Style.shadow,
  },
  citySearchModal: {
    padding: 20,
    minHeight: '50%',
    backgroundColor: 'white',
    borderRadius: Style.borderRadiusCard,
  },
  iconStyle: {
    color: Colors.textInputIconColor,
    fontSize: Style.inputIconSize + 3,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 3
  },
  predictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderColor: Colors.textInputIconColor,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    zIndex: 999
  },
});

export default PlaceSearchModal;
