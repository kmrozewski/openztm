import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface PositionError {
    isError: boolean,
    message: string
}

export interface PositionState {
    coordinates: Coordinates,
    accuracy: number | null,
    error: PositionError
}

const initialState: PositionState = {
    coordinates: {latitude: 0.0, longitude: 0.0},
    accuracy: null,
    error: {
        isError: false,
        message: '',
    },
}

export const positionSlice = createSlice({
    name: 'position',
    initialState,
    reducers: {
        updateCoordinates: (state, action: PayloadAction<Coordinates>) => {
            const coords = action.payload
            state.coordinates.latitude = coords.latitude
            state.coordinates.longitude = coords.longitude

            state.error.isError = false
            state.error.message = ''
        },
        updateAccuracy: (state, action: PayloadAction<number>) => {
            state.accuracy = action.payload
        },
        positionError: (state, action: PayloadAction<string>) => {
            state.error.isError = true
            state.error.message = action.payload
        }
    }
})

export const { updateCoordinates, updateAccuracy, positionError } = positionSlice.actions

export const selectCoordinates =  (state: RootState): Coordinates => state.position.coordinates
export const selectAccuracy = (state: RootState): number | null => state.position.accuracy
export const selectIsEmptyPosition = (state: RootState): boolean => state.position.coordinates.latitude === 0.0 && state.position.coordinates.longitude === 0.0
export const selectPositionError =  (state: RootState): boolean => (state.position.coordinates.latitude === 0.0 && state.position.coordinates.longitude === 0.0)
    && state.position.error.isError

export default positionSlice.reducer