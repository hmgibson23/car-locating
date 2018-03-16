import React from 'react';
import { StyleSheet, TouchableHighlight, View, Modal } from 'react-native';
import { Icon, List, ListItem, Button, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';
import { synchroniseStorage } from '../actions';

class Wrapper extends React.Component {
    state = {
        drawer: false,
        modalVisible: false
    };

    toggleDrawer = () => {
        this.setState({drawer: !this.state.drawer});
    };

    drawerClosed = () => {
        this.setState({drawer: false});
    };

    saveLocal = () => {
        this.props.synchroniseStorage();
    };


    closeModal = () => {
        this.setState({modalVisible: false});
    };

    openModal = () => {
        this.setState({modalVisible: true});
    };

    componentWillReceiveProps(nextProps) {
        const { error } = nextProps;
        if (error) {
            this.openModal();
        }
    }

    _renderDrawer () {
        const { loadingSaving, localSavedVehicles } = this.props;
        return (
            <View style={styles.container}>
              <List>
                <ListItem
                  onPress={ () => {
                  this.setState({drawer: false});
                  Actions.home();} }
                  title='Home' />
                { !loadingSaving && !localSavedVehicles.length <= 0 &&
                    <ListItem
                      onPress={ this.saveLocal }
                      title='Save all local vehicles' /> }
                { loadingSaving &&
                    <ListItem
                      title='Saving...' /> }
                { localSavedVehicles.length <= 0 &&
                    <ListItem
                        title="No local vehicles">
                    </ListItem> }
              </List>
            </View>
        );
    }

    _renderModal () {
        const { error, errorMessage } = this.props;
        if (!error) {
            return null;
        }

        return (
            <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}>
              <View style={styles.container}>
                <Text h1>Error</Text>
                <Text>{JSON.stringify(errorMessage)}</Text>
                <Button
                  onPress={ this.closeModal }
                  containerViewStyle={{
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end'
                  }}
                  title="Dismiss" large />
              </View>
            </Modal>
        );

    }

    render () {
        return (
            <Drawer
              type="static"
              open={this.state.drawer}
              content={this._renderDrawer()}
              openDrawerOffset={100}
              onClose={ this.drawerClosed }
              styles={drawerStyles}
              tweenHandler={Drawer.tweenPresets.parallax}>

              <View style={ styles.container }>
                { this._renderModal() }
                { this.props.children }
                <View style={ styles.footer }>
                  <Icon name="menu"
                        style={ styles.menu }
                        onPress={ this.toggleDrawer } />
                </View>
              </View>
            </Drawer>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    menu: {
        width: 80,
        padding: 10,
        justifyContent: 'center',
        minHeight: 60
    },
    footer: {
        minHeight: 60,
        backgroundColor: '#C8C8C8',
        justifyContent: 'center'
    }
});

const drawerStyles = {
    drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    main: {
        paddingLeft: 3
    }
};

export default connect(
    state => {
        console.log(state);
        return {
            loadingSaving: state.savingVehicles.loading,
            localSavedVehicles: state.savingVehicles.localSavedVehicles,
            error: state.savingVehicles.error,
            errorMessage: state.savingVehicles.errorMessage
        };
    },
    dispatch => {
        return {
            synchroniseStorage: () => dispatch(synchroniseStorage())
        };
    })(Wrapper);
