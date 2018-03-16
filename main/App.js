import React from 'react';
import { Provider } from 'react-redux';
import { Header } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Home from './components/Home';
import SaveVehicle from './components/SaveVehicle';
import FindVehicle from './components/FindVehicle';
import PlotVehicleLocation from './components/PlotVehicleLocation';
import ConfirmVehicleLocation from './components/ConfirmVehicleLocation';
import Wrapper from './components/Wrapper';

import { loadLocalVehicles } from './actions';
import configureStore from './configureStore';
import BackgroundTask from 'react-native-background-task';
import { backgroundSynchronise } from './helpers/background-runner';


const store = configureStore();
// fetch anything that's saved from last time
store.dispatch(loadLocalVehicles());

BackgroundTask.define(() => {
    backgroundSynchronise();
    BackgroundTask.finish();
});


export default class App extends React.Component {
    componentDidMount () {
        BackgroundTask.schedule();
    }

    render() {
        return (
            <Provider store={ store }>
              <Wrapper>
                <Router>
                  <Stack key="root">
                    <Scene key="home" type='reset' component={Home} title={ 'Stygos Car Finder' }/>
                    <Scene key="saveVehicle" component={SaveVehicle} title={ 'Stygos Car Finder' }/>
                    <Scene key="findVehicle" component={FindVehicle} title={ 'Stygos Car Finder' }/>
                    <Scene key="confirmVehicleLocation" component={ConfirmVehicleLocation} title={ 'Stygos Car Finder' }/>
                    <Scene key="plotVehicleLocation" component={PlotVehicleLocation} title={ 'Stygos Car Finder' } />
                  </Stack>
                </Router>

              </Wrapper>
            </Provider>
        );
    }
}
