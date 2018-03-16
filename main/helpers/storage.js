import { ROOT_STORAGE_KEY } from '../constants';
import { AsyncStorage } from 'react-native';
import R from 'ramda';

async function getCurrent() {
    const currentStore = await AsyncStorage.getItem(ROOT_STORAGE_KEY);
    let nextStore;
    if (currentStore) {
        nextStore = JSON.parse(currentStore);
    } else {
        nextStore = [];
    }

    return nextStore;
}

export const helpers = {
    saveVehicleToStorage: async function (vehicle) {
        try {
            const current = await getCurrent();
            const index = R.findIndex(R.propEq('numberplate', vehicle.numberplate), current);
            let next;
            if (index === -1) {
                next = R.append(vehicle, current);
            } else {
                next = R.update(
                    vehicle,
                    index,
                    current
                );
            }

            await AsyncStorage.setItem(ROOT_STORAGE_KEY, JSON.stringify(next));
            return Promise.resolve(null);
        } catch (error) {
            return Promise.fail(error);
        }
    },

    removeVehicleFromStorage: async function (vehicle) {
        try {
            const current = await getCurrent();
            const index = R.findIndex(R.propEq('numberplate', vehicle.numberplate), current);
            let next;
            if (index > -1) {
                current.splice(index, 1);
                next = current;
            } else {
                next = current;
            }
            await AsyncStorage.setItem(ROOT_STORAGE_KEY, JSON.stringify(next));
            return Promise.resolve(null);
        } catch (error) {
            return Promise.fail(error);
        }
    },

    getStoredVehicles: async function () {
        const current = await getCurrent();
        if (current && current.length === 0) {
            return null;
        }

        return current;
    }

};
