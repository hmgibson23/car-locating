import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';

class PlotVehicleLocation extends React.Component {
    render() {
        const { vehicle, loading, error, errorMessage } = this.props;

        if (!vehicle) {
            return null;
        }

        const showModal = ((!loading && error) || !vehicle);

        return (
            <View style={styles.container}>
              <ActivityIndicator animating={ loading } />
              <Modal visible={showModal}
                   animationType='slide'>
                <View style={styles.container}>
                  <Text h1>Error</Text>
                  <Text>{ JSON.stringify(errorMessage)}</Text>
                  <Button
                    onPress={ Actions.home }
                    title="Back to home"
                    large/>
                </View>
              </Modal>

               { !loading && <Text>
                     { vehicle.numberplate }
               </Text> }
               {!loading && <Text>{JSON.stringify(vehicle.location) }</Text>}
               <MapView
                 showsUserLocation={true}
                 style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
                 initialRegion={{
                   latitude: vehicle.location.latitude,
                   longitude: vehicle.location.longitude,
                   latitudeDelta: 0.0922,
                   longitudeDelta: 0.0922
                 }}
                 >
                 <MapView.Marker
                   coordinate={{latitude: vehicle.location.latitude,
                     longitude: vehicle.location.longitude}}
                     title={vehicle.numberplate}
                     description={""}
                     />
                 </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default connect((state) => {
    return {
        vehicle: state.currentVehicle.vehicle,
        loading: state.currentVehicle.loading,
        error: state.currentVehicle.error,
        errorMessage: state.currentVehicle.errorMessage
    };
})(PlotVehicleLocation);
