import { combineReducers } from 'redux';
import currentVehicle from './primaryReducer';
import savingVehicles from './vehicleReducer';

const rootReducer = combineReducers({
    currentVehicle,
    savingVehicles
});

export default rootReducer;
