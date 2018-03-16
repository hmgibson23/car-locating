import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { currentSavingVehicle } from '../actions';

class SaveVehicle extends React.Component {
    state = {
        numberplate: null,
        position: null
    };

    onChange = (text) => {
        this.setState({ numberplate: text });
    };

    submit = (position) => {
        const vehicle = {
            numberplate: this.state.numberplate,
            location: position
        };
        this.setState({ position });
        this.props.currentSavingVehicle(vehicle);
        Actions.confirmVehicleLocation();
    };


    geoLocate = () => {
        const locator = navigator.geolocation;
        locator.getCurrentPosition(
            (position) => {
                const pos = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                };
                this.submit(pos);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

    }

    render() {
        const { numberplate, position } = this.state;

        return (
            <View style={styles.container}>
              <View>
                <FormLabel>Enter reg</FormLabel>
                <FormInput
                  autoCorrect={ false }
                  onChangeText={ this.onChange }
                  autoCapitalize={ 'characters' } />
                <Button
                  onPress={ this.geoLocate }
                  title="Save"
                  disabled={ !this.state.numberplate }
                  large/>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});

export default connect(null, (dispatch) => {
    return {
        currentSavingVehicle: (vehicle) => dispatch(currentSavingVehicle(vehicle))
    };
})(SaveVehicle);
