import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClosestStop, getClosestStops} from "./stopApi";
import {Coordinates} from "../position/positionSlice";
import {RootState} from "../../app/store";

export interface StopState {
    closestStops: ClosestStop[],
    status: "idle" | "loading" | "failed"
}

const initialState: StopState = {
    closestStops: [],
    status: "idle"
}

export const fetchClosestStops = createAsyncThunk(
    "stop/getClosestStops",
    async (coords: Coordinates) => await getClosestStops(coords)
)

export const stopSlice = createSlice({
    name: 'stop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClosestStops.pending, (state: StopState) => {
                state.status = "loading"
            })
            .addCase(fetchClosestStops.fulfilled, (state: StopState, action: PayloadAction<ClosestStop[]>) => {
                state.status = "idle"
                state.closestStops = action.payload
            })
    }
})

export const selectClosestStops = (state: RootState) => state.stop.closestStops
export const selectClosestStopsStatus = (state: RootState) => state.stop.status

export default stopSlice.reducer