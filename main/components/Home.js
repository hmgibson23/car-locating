import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { synchroniseStorage } from '../actions';

class Home extends React.Component {
    componentDidMount() {
        this.props.synchroniseStorage();
    }

    render () {
        const { loading } = this.props;

        const moveToSave = Actions.saveVehicle;
        const moveToFind = Actions.findVehicle;

        return (
            <View style={styles.container}>
              <ActivityIndicator animating={ loading } />

              { !loading &&
                  <View style={styles.container}>
                        <TouchableHighlight
                              onPress={ moveToSave }
                              style={ styles.button }>
                              <Text style={styles.buttonText}>Save a vehicle</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                  onPress={ moveToFind }
                                  style={ styles.button }>
                                  <Text style={styles.buttonText}>Find a vehicle</Text>
                                </TouchableHighlight>
                      </View>
                  }
            </View>);
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#458380',
        marginTop: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
});

export default connect(
    (state) => {
        return {
            loading: state.savingVehicles.loading
        };
    }, (dispatch) => {
        return {
            synchroniseStorage: () => dispatch(synchroniseStorage())
        };
    })(Home);
