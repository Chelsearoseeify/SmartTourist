import React, { useState } from 'react';
import { View, Text } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import Colors from '../../constants/Colors';

const TripDayCheckbox = props => {
    const [toggleCheckBox, setToggleCheckBox] = useState(props.value);

    const onToggleChange = () => {
        toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true);
        props.onToggleChange(!toggleCheckBox, props.index);
    }

    return (
        <View style={{ flexDirection: "row", alignItems: "center", paddingEnd: 10 }}>
            <Text style={{ paddingEnd: 10 }}>Day {props.index + 1}</Text>
            <CheckBox
                value={toggleCheckBox}
                onValueChange={() => onToggleChange()}
                onCheckColor={Colors.greenTitleColor}
                onTintColor={Colors.greenTitleColor}
                style={{ width: 20, height: 20 }}
            />
        </View>

    );
}

export default TripDayCheckbox;