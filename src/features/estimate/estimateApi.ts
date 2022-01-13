import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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


const estimateApi = createApi({ 
    reducerPath: 'estimateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ckan2.multimediagdansk.pl'
    }),
    endpoints: (builder) => ({
        getEstimatesById: builder.query<Estimate[], number>({
            query: (stopId: number) => `/departures?stopId=${stopId}`,
            transformResponse: (response: Object) => Object.values(response)[1]
        }),
    }),
})

export const {useGetEstimatesByIdQuery} = estimateApi

export default estimateApi