import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {getAllVehicles} from "./vehicleApi";
import {Estimate} from "../estimate/estimateApi";

export interface Vehicle {
    vehicleId: number,
    vehicleCode: string,
    delay: number,
    lat: number,
    lon: number,
    gpsQuality: number
}

export interface VehicleState {
    vehicles: Vehicle[],
    vehicleIds: number[],
    status: "idle" | "loading" | "failed"
}

const initialState: VehicleState = {
    vehicles: [],
    vehicleIds: [],
    status: "idle"
}

export const fetchAllVehicles = createAsyncThunk(
    "vehicle/getAllVehicles",
    async () => getAllVehicles()
)

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        addVehicleIds: (state: VehicleState, action: PayloadAction<Estimate[]>) => {
            //TODO: remove old vehicle ids
            const vehicles = state.vehicleIds
            action.payload
                .map(estimate => estimate.vehicleId)
                .filter(vehicleId => !vehicles.includes(vehicleId))
                .forEach(vehicleId => vehicles.push(vehicleId))

            state.vehicleIds = vehicles
        }
    },
    extraReducers: (builder) => builder
        .addCase(fetchAllVehicles.pending, (state: VehicleState) => {
            state.status = "loading"
        })
        .addCase(fetchAllVehicles.fulfilled, (state: VehicleState, action: PayloadAction<Vehicle[]>) => {
            state.status = "idle"
            state.vehicles = action.payload
        })
})

export const { addVehicleIds } = vehicleSlice.actions

export const selectVehicles = (state: RootState): Vehicle[] => state.vehicle.vehicles
export const selectVehicleIds = (state: RootState): number[] => state.vehicle.vehicleIds

export default vehicleSlice.reducer