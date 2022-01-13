import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface PositionState {
    coordinates: Coordinates,
    accuracy: number,
    isError: boolean
}

const initialState: PositionState = {
    coordinates: {latitude: 0.0, longitude: 0.0},
    accuracy: 0,
    isError: false
}

export const positionSlice = createSlice({
    name: 'position',
    initialState,
    reducers: {
        updateCoordinates: (state, action: PayloadAction<Coordinates>) => {
            const coords = action.payload
            state.coordinates.latitude = coords.latitude
            state.coordinates.longitude = coords.longitude
            state.isError = false
        },
        positionError: (state) => {
            state.isError = true
        }
    }
})

export const { updateCoordinates, positionError } = positionSlice.actions

export const selectCoordinates =  (state: RootState): Coordinates => state.position.coordinates
export const selectIsEmptyPosition = (state: RootState): boolean => state.position.coordinates.latitude === 0.0 && state.position.coordinates.longitude === 0.0
export const selectPositionError =  (state: RootState): boolean => (state.position.coordinates.latitude === 0.0 && state.position.coordinates.longitude === 0.0)
    && state.position.isError

export default positionSlice.reducer