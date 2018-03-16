import { helpers } from './helpers/storage';

const HOST = "http://10.0.0.6:3000/";
const ENDPOINT = `${HOST}api/vehicles`;


export function getVehicle (numberplate) {
    const endpoint = `${ENDPOINT}/${numberplate}`;
    return new Promise((resolve, reject) => {
        return fetch(endpoint)
            .then((response) => response.json())
            .then((json) => {
            resolve(json);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function saveVehicle (vehicle) {
    const endpoint = `${ENDPOINT}/${vehicle.numberplate}`;
    console.log("saving...", endpoint);
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(vehicle),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        .then(async (json) => {
            await helpers.removeVehicleFromStorage(vehicle);
            resolve(json);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}
