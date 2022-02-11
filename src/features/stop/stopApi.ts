import axios from "axios";
import {Coordinates} from "../position/positionSlice";

export interface Stop {
    stopId: number,
    stopCode: string,
    stopName: string,
    stopDesc: string,
    subName: string,

    zoneId: number,
    zoneName: string,
    onDemand: number,

    stopLat: number,
    stopLon: number,
}

export interface ClosestStop {
    distance: number,
    stop: Stop
}

const API = "https://dt0330owhi.execute-api.eu-west-1.amazonaws.com/api"

export const getClosestStops = async (coords: Coordinates): Promise<ClosestStop[]> => {
    const response = await axios({
        method: "GET",
        url: `${API}/closestStops?latitude=${coords.latitude}&longitude=${coords.longitude}`
    });

    return response.data;
};