import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import positionReducer from '../features/position/positionSlice'
import stopApi from "../features/stop/stopApi";
import estimateApi from '../features/estimate/estimateApi'
import stopReducer from '../features/stop/stopSlice'

export const store = configureStore({
  reducer: {
    position: positionReducer,
    stop: stopReducer,
    [stopApi.reducerPath]: stopApi.reducer,
    [estimateApi.reducerPath]: estimateApi.reducer,
  },
  middleware: (getDefaultMiddleware => getDefaultMiddleware()
    .concat(stopApi.middleware)
    .concat(estimateApi.middleware)
  )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
