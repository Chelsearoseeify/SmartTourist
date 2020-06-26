import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import SelectTripDay from '../SelectTripDay';
import CustomButton from '../Buttons/CustomButton';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Style from '../../constants/Style';

import { addPlaceToTrip } from '../../store/actions/trips';

const TripModal = props => {
    const dispatch = useDispatch();
    const trips = useSelector(state => state.trips.userTrips);

    //const filteredTrips = [];
    const filteredTrips = trips.filter(trip => trip.cityId === props.place.cityId);

    let selectionData = [];
    if (filteredTrips.length > 0) {
        filteredTrips.map((trip,tripIndex) => {
            const numberOfDays = trip.numberOfDays();
            if (numberOfDays > 0) {
                daysData = [];
                for (let i = 0; i < numberOfDays; i++) {
                    daysData.push(trip.placeIds[i].includes(props.place.id));
                }
                selectionData.push(daysData)
            }
        })
    }

    const [selections, setSelections] = useState(selectionData);

    const onSelectionChange = (newData, selectionIndex) => {
        let newSelections = [...selections];
        newSelections[selectionIndex] = newData;
        setSelections(newSelections);
    }

    const onSelectionConfirm = () => {
        console.log(selections);
        selections.map((selection,index) =>{
            const trip = filteredTrips[index];
            dispatch(addPlaceToTrip(trip.id, props.place.id, selection));
        })
    }

    const onCreateTrip = () =>{
        props.navigation.navigate('Plus');
        props.onCloseModal();
    }

    let component = filteredTrips.length > 0
        ?
        <View>
            <Text style={styles.subtitleStyle}>Add to trip</Text>
            {filteredTrips.map((trip, index) => {
                return <SelectTripDay
                    daysData={selections[index]}
                    tripName={trip.name}
                    selectionIndex={index}
                    onSelectionChanged={onSelectionChange}
                />
            })}
            <View style={styles.confirmContainerStyle}>
                <ButtonWithIcon icon='plus' text='Create a trip' onPress={onCreateTrip}/>
                <CustomButton onPress={onSelectionConfirm} text="Confirm"/>
            </View>
        </View>
        :
        <View style={{ alignItems: "center" }}>
            <Text>You don't have any trips for this city!</Text>
            <Text>Create a trip to add this place</Text>
            <ButtonWithIcon icon='plus' text='Create a trip'/>
        </View>
    return (
        <Modal isVisible={props.visible} onBackdropPress={props.onCloseModal}>
            <View style={styles.addToTripModal}>
                <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                    <TouchableOpacity onPress={props.onCloseModal}>
                        <Icon name={'close'} style={styles.closeIconStyle} />
                    </TouchableOpacity>
                </View>
                {component}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    addToTripModal: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: Style.borderRadiusCard
    },
    subtitleStyle: {
        color: Colors.greenTitleColor,
        fontWeight: 'bold',
        fontSize: Style.fontSize.h4,
        textAlign: "center"
    },
    closeIconStyle: {
        color: Colors.greenTitleColor,
        fontSize: Style.iconSize + 10,
    },
    confirmContainerStyle: {
        width: '60%',
        alignSelf: "center",
        marginTop: 20
    }
});

export default TripModal;