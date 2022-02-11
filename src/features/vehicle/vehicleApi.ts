import axios from "axios";
import {Vehicle} from "./vehicleSlice";

export const getAllVehicles = async (): Promise<Vehicle[]> => {
    const response = await axios({
        method: "GET",
        url: `https://ckan2.multimediagdansk.pl/gpsPositions?v=2`,

    })

    return response.data.vehicles
}