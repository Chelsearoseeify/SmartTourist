import React, {useState} from 'react';
import {View, Text} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const TripDayCheckbox = props => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const onToggleChange = () => {
        toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true);
        props.onToggleChange(!toggleCheckBox, props.index);
    }

    return (
        <View style={{flexDirection: "row", alignItems: "center", paddingEnd: 10}}>
            <Text style={{paddingEnd: 10}}>Day {props.index + 1}</Text>
            <CheckBox
            value={toggleCheckBox}
            onValueChange={()=> onToggleChange()}
            style={{width: 20, height: 20}}
        />
        </View>
        
    );
}

export default TripDayCheckbox;