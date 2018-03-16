import { SAVE_VEHICLE, SAVE_VEHICLE_LOCAL_SUCCESS, SAVE_VEHICLE_REMOTE_SUCCESS, LOADED_LOCAL_VEHICLES, SYNCHRONISING_VEHICLES, SYNCHRONISED_VEHICLES, CURRENT_SAVING_VEHICLE, SYNCHRONISATION_ERROR } from '../constants';
import R from 'ramda';

const initialState = {
    currentSavingVehicle: null,
    localSavedVehicles: [],
    loading: false,
    error: false
};

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
      case CURRENT_SAVING_VEHICLE:
         return {
             ...state,
             currentSavingVehicle: action.vehicle
         };
      case SAVE_VEHICLE:
         return {
             ...state,
             loading: true
         };
      case SAVE_VEHICLE_LOCAL_SUCCESS:
         // push it into the list of locally saved vehicles

         return {
             localSavedVehicles: R.append(action.vehicle, state.localSavedVehicles),
             loading: false,
             error: false
         };

      case SAVE_VEHICLE_REMOTE_SUCCESS:
         //remove the vehicle from the saved local vehicles
         return {
             ...state,
             localSavedVehicles: state.localSavedVehicles
         };

      case LOADED_LOCAL_VEHICLES:
          return {
              ...state,
              localSavedVehicles: action.vehicles
          };

      case SYNCHRONISING_VEHICLES:
          return {
              ...state,
              loading: true
          };

      case SYNCHRONISED_VEHICLES:
          return {
              ...state,
              localSavedVehicles: action.success ? [] : state.localSavedVehicles,
              loading: false
          };

      case SYNCHRONISATION_ERROR:
         return {
             ...state,
             error: true,
             loading: false,
             errorMessage: action.error
         };

  default:
      return state;
  }
}
