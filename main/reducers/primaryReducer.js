import { FETCH_VEHICLE, FETCH_VEHICLE_SUCCESS, FETCH_VEHICLE_ERROR } from '../constants';

const initialState = {
    vehicle: null,
    loading: false,
    error: false
};

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
      case FETCH_VEHICLE:

         return {
             ...state,
             loading: true
         };
      case FETCH_VEHICLE_SUCCESS:
         return {
             vehicle: action.vehicle,
             loading: false,
             error: false
         };
      case FETCH_VEHICLE_ERROR:
         return {
             ...state,
             error: true,
             errorMessage: action.error,
             loading: false
         };
  default:
      return state;
  }
}
