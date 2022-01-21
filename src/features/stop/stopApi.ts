import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
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

const stopApi = createApi({ 
    reducerPath: 'stopApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://dt0330owhi.execute-api.eu-west-1.amazonaws.com/api`,
    }),
    endpoints: (builder) => ({
        getClosestStops: builder.query<ClosestStop[], Coordinates>({
            query: ({latitude, longitude}) => `/closestStops?latitude=${latitude}&longitude=${longitude}`
        }),
    }),
})

export const {useGetClosestStopsQuery} = stopApi

export default stopApi