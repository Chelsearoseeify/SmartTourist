import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import Colors from '../../constants/Colors';
import Style from '../../constants/Style';
import { v4 as uuidv4 } from 'react-native-uuid';
import axios from 'axios';
const API_KEY = 'AIzaSyBZnXD0YlNLMtcDswoLpkUTu_cBYP3Ud0w';

const CitySearch = () => {
    const [text, setText] = useState('');
    const [token, setToken] = useState('');
    const [showList, setShowList] = useState(false);
    const [predictions, setPredictions] = useState([]);

    const onFocus = () => {
        setToken(uuidv4());
        setText('');
    }

    const queryData = async () => {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${API_KEY}&sessiontoken=${token}`
        const response = await axios.get(url);
        console.log(response.data);
        setPredictions(response.data.predictions);
        setShowList(true);
    }

    const changeTextHandler = (text) => {
        if (text.length > 2) {
            queryData();
        }
        else {
            setShowList(false);
        }
        setText(text);
    }

    const predictionSelectHandler = (item) => {
        setText(item.description);
        Keyboard.dismiss();
    }

    const renderPredictionItem = (item) => {
        return <TouchableOpacity onPress={() => { predictionSelectHandler(item) }} style={styles.predictionItem}>
            <Text>
                {item.description}
            </Text>
        </TouchableOpacity>
    }

    return (
        <View style={{ zIndex: 1 }}>
            <TextInput
                value={text}
                onChangeText={nText => changeTextHandler(nText)}
                style={Style.inputStyle}
                placeholder='Type city name'
                onFocus={onFocus}
                onBlur={() => setShowList(false)}
                label="    City"
                keyboardType="default"
            />
            {showList &&
                <View style={styles.predictionContainer}>
                    {predictions.map(p => renderPredictionItem(p))}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    predictionContainer: {
        position: 'absolute',
        top: 50,
        width: '100%',
        backgroundColor: Colors.inputBackgroundColor,
        borderRadius: 10,
        zIndex: 2,
        elevation: Style.elevation + 1
    },
    predictionItem: {
        width: '100%',
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        zIndex: 4,
        elevation: Style.elevation + 1
    }
})

export default CitySearch;