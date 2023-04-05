import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authSlice from '../feature/auth/authSlice';
import designationSlice from '../feature/admin/DesignationSlice';
import divisionSlice from '../feature/admin/DivisionSlice';

const persistConfig = {
	key: 'employee',
	storage,
};

const reducers = combineReducers({ auth: authSlice });
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: {
		persistedReducer,
		designation: designationSlice,
		division: divisionSlice,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
