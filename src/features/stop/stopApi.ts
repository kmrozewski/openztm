import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ClosestStop} from "./stopSlice";
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

const stopApi = createApi({ 
    reducerPath: 'stopApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://9zxn3ty97k.execute-api.eu-west-1.amazonaws.com/open-ztm',
        prepareHeaders: (headers) => {

            headers.set('X-Api-Key', 'abbtG04pGDswo5iDGknE8GSBDTiXipl6ZiAuRZZ9')
            headers.set('Content-Type', 'application/json')

            return headers
        },
    }),
    endpoints: (builder) => ({
        getClosestStops: builder.query<ClosestStop[], Coordinates>({
            query: ({latitude, longitude}) => `/closestStops?latitude=${latitude}&longitude=${longitude}`
        }),
    }),
})

export const {useGetClosestStopsQuery} = stopApi

export default stopApi