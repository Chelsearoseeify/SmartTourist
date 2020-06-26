import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { queryCity } from '../../store/actions/cities';

import Style from '../../constants/Style';
import Colors from '../../constants/Colors';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CitySearchModal = props => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [showList, setShowList] = useState(false);
    const predictions = useSelector(state => state.cities.queryPredictions);

    const queryData = () => {
        dispatch(queryCity(props.token, text));
        setShowList(true);
    };

    const predictionSelectHandler = (item) => {
        props.onCitySelected(item.place_id);
        props.closeModal();
        Keyboard.dismiss();
    }

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
                <Text style={{width: '90%'}}>{item.description}</Text>
                <Icon style={{...styles.iconStyle, alignSelf: "flex-end"}} name={'arrow-top-right'} />
            </TouchableOpacity>
        );
    };

    const onCloseModal = () => {
        setShowList(false);
        props.closeModal();
    }

    return <Modal isVisible={props.visible} onBackdropPress={onCloseModal}>
        <View style={styles.citySearchModal}>
            <View style={styles.inputSection}>
                <Icon style={styles.iconStyle} name={'city-variant-outline'} />
                <TextInput
                    value={text}
                    onChangeText={nText => changeTextHandler(nText)}
                    placeholder="Type city name"
                    onBlur={() => setShowList(false)}
                    label="    City"
                    keyboardType="default"
                    placeholderTextColor={Colors.textInputIconColor}
                    autoFocus={true}
                />
            </View>

            {showList && (
                predictions.map(p => renderPredictionItem(p))
            )}
        </View>
    </Modal>
}

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
        borderRadius: Style.borderRadiusCard
    },
    iconStyle: {
        color: Colors.textInputIconColor,
        fontSize: Style.inputIconSize + 3,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    predictionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        padding: 10,
        borderColor: Colors.textInputIconColor,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5
    },
});

export default CitySearchModal;