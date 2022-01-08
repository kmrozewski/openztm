import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import positionReducer from '../features/position/positionSlice'
import stopApi from "../features/stop/stopApi";
import stopReducer from '../features/stop/stopSlice'

export const store = configureStore({
  reducer: {
    position: positionReducer,
    [stopApi.reducerPath]: stopApi.reducer,
    stop: stopReducer
  },
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(stopApi.middleware))
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
