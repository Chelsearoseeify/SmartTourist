import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CitySearchModal from '../Cards/CitySearchModal';
import {v4 as uuidv4} from 'react-native-uuid';

const CitySearch = props => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const onCitySelected = cityId => {
    props.onQuerySelected(cityId, token);
  };

  const onModalClose = () => {
    setCityModalVisible(false);
  };

  const openCityModal = () => {
    setToken(uuidv4());
    setCityModalVisible(true);
  };

  return (
    <View>
      <CitySearchModal
        visible={cityModalVisible}
        closeModal={onModalClose}
        token={token}
        onCitySelected={cityId => onCitySelected(cityId)}
      />
      <TouchableOpacity style={styles.inputSection} onPress={openCityModal}>
        <Icon style={styles.iconStyle} name={'city-variant-outline'} />
        <Text style={{color: Colors.blueTitleColor}}>
          {props.cityName ? props.cityName : 'Search for a city'}
        </Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 10,
    ...Style.shadow,
  },
  predictionContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: Colors.inputBackgroundColor,
    borderRadius: 10,
    zIndex: 2,
    ...Style.shadow,
  },
  predictionItem: {
    width: '100%',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    zIndex: 4,
  },
  iconStyle: {
    color: Colors.textInputIconColor,
    fontSize: Style.inputIconSize + 3,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default CitySearch;
