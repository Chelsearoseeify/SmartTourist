import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Modal from 'react-native-modal';
import Style from '../../constants/Style';

const TripModal = props => {
    return (
        <Modal isVisible={true}>
            <View style={styles.addToTripModal}>
                <Text>I am the modal content!</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    addToTripModal: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: Style.borderRadiusCard
    }
});

export default TripModal;