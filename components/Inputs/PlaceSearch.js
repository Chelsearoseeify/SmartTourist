import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaceSearchModal from '../Cards/PlaceSearchModal';
import {v4 as uuidv4} from 'react-native-uuid';

const PlaceSearch = props => {
  const [token, setToken] = useState('');
  const [searchModalVisible, setsearchModalVisible] = useState(false);

  const onPredictionSelected = (placeName, placeId) => {
    props.onQuerySelected(placeName, placeId, token);
  };

  const onModalClose = () => {
    setsearchModalVisible(false);
  };

  const openCityModal = () => {
    setToken(uuidv4());
    setsearchModalVisible(true);
  };

  return (
    <View>
      <PlaceSearchModal
        visible={searchModalVisible}
        closeModal={onModalClose}
        token={token}
        searchType={props.searchType}
        placeholder={props.placeholder}
        iconName={props.iconName}
        location={props.location}
        onPredictionSelected={(placeName, placeId) => onPredictionSelected(placeName, placeId)}
      />
      <TouchableOpacity style={styles.inputSection} onPress={openCityModal}>
        <Icon style={styles.iconStyle} name={props.iconName} />
        <Text style={{color: Colors.blueTitleColor}}>
          {props.placeName ? props.placeName : props.inputPlaceholder}
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

export default PlaceSearch;
