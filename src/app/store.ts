import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import positionReducer from '../features/position/positionSlice'
import vehicleReducer from "../features/vehicle/vehicleSlice"
import stopReducer from "../features/stop/stopSlice"
import estimateApi from '../features/estimate/estimateApi'

export const store = configureStore({
    reducer: {
        position: positionReducer,
        vehicle: vehicleReducer,
        stop: stopReducer,
        [estimateApi.reducerPath]: estimateApi.reducer,
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware()
            .concat(estimateApi.middleware)
    )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
