import { FETCH_VEHICLE, FETCH_VEHICLE_SUCCESS, SAVE_VEHICLE, SAVE_VEHICLE_LOCAL_SUCCESS, SAVE_VEHICLE_REMOTE_SUCCESS, NO_VEHICLE_SAVED, LOADED_LOCAL_VEHICLES, SYNCHRONISING_VEHICLES, SYNCHRONISED_VEHICLES, CURRENT_SAVING_VEHICLE, SYNCHRONISATION_ERROR, FETCH_VEHICLE_ERROR } from './constants';
import { NetInfo, fetch } from 'react-native';
import { helpers } from './helpers/storage';

import { getVehicle, saveVehicle } from './api';

export function fetchingVehicle(numberplate) {
    return {
        type: FETCH_VEHICLE,
        numberplate
    };
}

export function fetchVehicleSuccess(vehicle) {
    return {
        type: FETCH_VEHICLE_SUCCESS,
        vehicle
    };
}


export function fetchVehicleError(error) {
    return {
        type: FETCH_VEHICLE_ERROR,
        error
    };
}

export function syncError(error) {
    return {
        type: SYNCHRONISATION_ERROR,
        error
    };
}

export function fetchVehicle (numberplate) {
    return (dispatch) => {
        dispatch(fetchingVehicle());
        getVehicle(numberplate)
            .then((data) => {
                dispatch(fetchVehicleSuccess(data));
            })
            .catch((err) => dispatch(fetchVehicleError(err)));
    };
}

export function fetchLocalVehicle (vehicle) {
    // just defers to another dispatch with the one it's already got
    return fetchVehicleSuccess(vehicle);
}

function loadedLocalVehicles (vehicles) {
    return {
        type: LOADED_LOCAL_VEHICLES,
        vehicles
    };

}

export function noVehicleDataFound () {
    return {
        type: NO_VEHICLE_SAVED
    };
}

export function savingVehicle (vehicle) {
    return {
        type: SAVE_VEHICLE,
        vehicle
    };
}

export function synchronisingVehicles () {
    return {
        type: SYNCHRONISING_VEHICLES
    };
}

export function synchronisedVehicles (success) {
    return {
        type: SYNCHRONISED_VEHICLES,
        success
    };
}


export function vehicleSavedLocally (vehicle) {
    return {
        type: SAVE_VEHICLE_LOCAL_SUCCESS,
        vehicle
    };
}

export function currentSavingVehicle (vehicle) {
    return {
        type: CURRENT_SAVING_VEHICLE,
        vehicle
    }
}

export function vehicleSavedRemotely (vehicle) {
    return {
        type: SAVE_VEHICLE_REMOTE_SUCCESS,
        vehicle
    };
}


export function saveVehicleLocation (vehicle) {
    return async (dispatch) => {
        dispatch(savingVehicle(vehicle));
        // always save the vehicle to the filesystem
        await helpers.saveVehicleToStorage(vehicle);


        // if there's a network connection, post it too
        const info = await NetInfo.getConnectionInfo();
        if (info.type !== "none" || info.type !== "unknown") {
            saveVehicle(vehicle);
        }

        return dispatch(vehicleSavedLocally(vehicle));
    };
}

export function loadLocalVehicles () {
    return async (dispatch) => {
        const vehicles = await helpers.getStoredVehicles();
        if (!vehicles) {
            return noVehicleDataFound();
        }
        dispatch(loadedLocalVehicles(vehicles));
    };
}

export function synchroniseStorage () {
    return async (dispatch) => {
        const vehicles = await helpers.getStoredVehicles();

        if (!vehicles) {
            return dispatch(synchronisedVehicles(true));
        }

        const info = await NetInfo.getConnectionInfo();

        if (info.type !== "none" || info.type !== "unknown") {
            dispatch(synchronisingVehicles());
            return Promise.all(
                vehicles.map((vehicle) => saveVehicle(vehicle))
            ).then(() => {
                dispatch(synchronisedVehicles(true));
            }).catch((err) => {
                dispatch(syncError(err));
            });
        } else {
            return dispatch(synchronisedVehicles(false));
        }
    };
}
