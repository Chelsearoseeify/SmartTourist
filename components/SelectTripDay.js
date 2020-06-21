import React, {useState} from 'react';

import {View, Text} from 'react-native';

import TripDayCheckbox from './Inputs/TripDayCheckbox';

const SelectTripDay = props => {
    const [daysToggle, setDaysToggle] = useState(props.daysData);

    const onCheckboxToggle = (toggleState, index) => {
        let currentToggles = [...daysToggle];
        currentToggles[index] = toggleState;
        setDaysToggle(currentToggles);
        onStateChanged(currentToggles);
    }

    const checkboxes = daysToggle.map((d, index) => {
        return <TripDayCheckbox index={index} onToggleChange={onCheckboxToggle} />
    })

    const onStateChanged = (currentToggles) => {
        props.onSelectionChanged(currentToggles, props.selectionIndex);
    }

    return (
        <View>
            <Text>{props.tripName}</Text>
            <View style={{flexDirection: "row", paddingTop: 10}}>
                {checkboxes}
            </View>
        </View>
    );

}

export default SelectTripDay;