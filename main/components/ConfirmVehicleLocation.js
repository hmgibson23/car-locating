import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { saveVehicleLocation } from '../actions';
import MapView from 'react-native-maps';

class ConfirmVehicleLocation extends React.Component {
    submit = () => {
        this.props.saveVehicle(this.props.vehicle);
        Actions.home();
    };

    render() {
        const { vehicle } = this.props;

        if (!vehicle) {
            return null;
        }

        const { numberplate, location } = vehicle;

        return (
            <View style={styles.container}>
                <MapView
                  style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute'}}
                  initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                  }}>
                <MapView.Marker
                  coordinate={{latitude: location.latitude,
                    longitude: location.longitude}}
                    title={numberplate}
                    description={numberplate}>
                </MapView.Marker>
                </MapView>

              <Button
                onPress={ this.submit }
                title="Confirm"
                containerViewStyle={{
                    alignSelf: 'stretch'
                }}
                large />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end'
    }
});

export default connect(
    state => {
        return {
            vehicle: state.savingVehicles.currentSavingVehicle
        };
    },
    (dispatch) => {
        return {
            saveVehicle: (vehicle) => dispatch(saveVehicleLocation(vehicle))
        };
    })(ConfirmVehicleLocation);
