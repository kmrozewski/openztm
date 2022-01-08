import {Stop} from "./stopApi";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface StopState {
    closestStops: ClosestStop[]
}

export interface ClosestStop {
    distance: number,
    stop: Stop
}

const initialState: StopState = {
    closestStops: []
}

export const stopSlice = createSlice({
    name: 'stop',
    initialState,
    reducers: {
        updateClosestStops: (state: StopState, action: PayloadAction<ClosestStop[]>) => {
            state.closestStops = action.payload;
        }
    }
})

export const selectClosestStops = (state: RootState): ClosestStop[] => state.stop.closestStops

export const { updateClosestStops } = stopSlice.actions

export default stopSlice.reducer