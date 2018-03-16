import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { fetchVehicle, fetchLocalVehicle } from '../actions' ;
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class FindVehicle extends React.Component {
    state = {
        numberplate: null
    };

    onChange = (text) => {
        this.setState({ numberplate: text });
    };

    locateVehicle = (vehicle) => () => {
        this.props.findLocalVehicle(vehicle);
        Actions.plotVehicleLocation();
    };

    submit = () => {
        this.props.findVehicle(this.state.numberplate);
        // navigate to the next page
        Actions.plotVehicleLocation();
    };

    render() {
        const { localVehicles } = this.props;

        return (
            <View style={styles.container}>
              <View>
                <FormLabel>Vehicle Registration</FormLabel>
                <FormInput onChangeText={ this.onChange }
                           autoCapitalize={ 'characters' } />
                <Button onPress={this.submit }
                        title="Find"
                        large />

              </View>

              { localVehicles.length > 0 && <View style={styles.container}>
                <Text style={{ color: 'gray', marginLeft: 5}}>Local vehicles</Text>
                <FlatList data={ localVehicles }
                          keyExtractor={ (item) => item.numberplate }
                          renderItem={
                              (item) =>
                                  <TouchableHighlight
                                        onPress={this.locateVehicle(item.item)}
                                        style={ styles.button }>
                                        <Text style={{ color: 'white'}}>{item.item.numberplate}</Text>
                                  </TouchableHighlight>
                                  } />
              </View> }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10
    },
    button: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: '#458380',
        minHeight: 50,
        marginTop: 4,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    }
});

export default connect(
    (state) => {
        return {
            localVehicles: state.savingVehicles.localSavedVehicles
        };
    },
    (dispatch) => {
        return {
            findVehicle: (numberplate) => dispatch(fetchVehicle(numberplate)),
            findLocalVehicle: (numberplate) => dispatch(fetchLocalVehicle(numberplate))
        };
    })(FindVehicle);
