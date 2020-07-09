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

import moment from 'moment';

const TripModal = props => {
    const dispatch = useDispatch();
    const trips = useSelector(state => state.trips.userTrips);
    const dateNow = moment().unix();

    const filteredTrips = trips.filter(trip => trip.cityId === props.place.cityId && trip.startDate > dateNow);

    let selectionData;

    const updateSelections = () => {
        selectionData = [];
        if (filteredTrips.length > 0) {
            filteredTrips.map((trip, tripIndex) => {
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
    }

    updateSelections();

    const [selections, setSelections] = useState(selectionData);

    const onSelectionChange = (newData, selectionIndex) => {
        let newSelections = [...selections];
        newSelections[selectionIndex] = newData;
        setSelections(newSelections);
    }

    const onSelectionConfirm = () => {
        selections.map((selection, index) => {
            const trip = filteredTrips[index];
            dispatch(addPlaceToTrip(trip, props.place.id, selection));
        })
        props.onCloseModal();
        updateSelections(selectionData);
    }

    const onCreateTrip = () => {
        props.navigation.navigate('Plus');
        props.onCloseModal();
    }

    const isSelectionValid = () => {
        return selections.some(selection => selection.includes(true));
    }

    let component = filteredTrips.length > 0
        ?
        <View>
            <Text style={styles.subtitleStyle}>Add to trip</Text>
            {filteredTrips.map((trip, index) => {
                return <SelectTripDay
                    daysData={selections[index]}
                    tripName={trip.name}
                    tripDates={trip.getTripDateString()}
                    selectionIndex={index}
                    onSelectionChanged={onSelectionChange}
                />
            })}


            <View style={styles.confirmContainerStyle}>
                <View style={{ marginBottom: 10 }}>
                    <ButtonWithIcon icon='plus' text='Create a new trip' onPress={onCreateTrip} />
                </View>
                <View style={{ width: '80%' }}>
                    <CustomButton onPress={onSelectionConfirm} text="Confirm" disabled={!isSelectionValid()} />
                </View>
            </View>
        </View>
        :
        <View style={{ alignItems: "center" }}>
            <Text>You don't have any trips for this city!</Text>
            <Text>Create a trip to add this place</Text>
            <ButtonWithIcon icon='plus' text='Create a trip' onPress={onCreateTrip} />
        </View>
    return (
        <Modal isVisible={props.visible} onBackdropPress={props.onCloseModal}>
            <View style={styles.addToTripModal}>
                <View style={{ position: "absolute", right: 15, top: 15, zIndex: 10 }}>
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
        textAlign: "center",
        marginBottom: 10
    },
    closeIconStyle: {
        color: Colors.greenTitleColor,
        fontSize: Style.iconSize + 10,
    },
    confirmContainerStyle: {
        width: '70%',
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20
    }
});

export default TripModal;