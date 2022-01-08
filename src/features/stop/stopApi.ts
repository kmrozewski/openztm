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

export interface Estimate {
    id: string,
    delayInSeconds: number,
    estimatedTime: string,
    theoreticalTime: string,
    headsign: string,
    routeId: number,
    tripId: number,
    vehicleId: number
}


const stopApi = createApi({
    reducerPath: 'stopApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://9zxn3ty97k.execute-api.eu-west-1.amazonaws.com/open-ztm',
        prepareHeaders: (headers) => {

            headers.set('X-Api-Key', '')
            headers.set('Content-Type', 'application/json')

            return headers
        },
    }),
    endpoints: (builder) => ({
        getClosestStops: builder.mutation<ClosestStop[], Coordinates>({
            query(body) {
                return {
                    url: '/closestStops',
                    method: 'POST',
                    body
                }
            }
        }),
        getEstimatesById: builder.query<Estimate[], number>({
            query: (stopId: number) => `https://ckan2.multimediagdansk.pl/departures?stopId=${stopId}`,
            transformResponse: (response: Object) => Object.values(response)[1]
        }),
    }),
})

export const {useGetClosestStopsMutation, useGetEstimatesByIdQuery} = stopApi

export default stopApi