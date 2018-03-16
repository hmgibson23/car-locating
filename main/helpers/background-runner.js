import { saveVehicle } from '../api';

export async function backgroundSynchronise() {
    const vehicles = await helpers.getStoredVehicles();

    if (!vehicles) {
        return null;
    }

    const info = await NetInfo.getConnectionInfo();
    if (info.type !== "none" || info.type !== "unknown") {
        console.log("synchronising local vehicles in background");
        Promise.all(
            vehicles.map((vehicle) => saveVehicle(vehicle))
        ).then(() => {

        });
    }

    // send the stored ones to the api, removing them as we go
    return null;

}
