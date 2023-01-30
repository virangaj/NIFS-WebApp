import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OAuthService from '../../services/auth/OAuthService';
import { RootState } from '../../store/store';
import IAuth from '../../types/IAuthUser';

const user = localStorage.getItem('emplpoyee');

if (user) {
	var employee = JSON.parse(user);
}

const initialState: any = {
	user: employee ? employee.result : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
};

export const login = createAsyncThunk('auth/login', async (data: any) => {
	const response = await OAuthService.loginRequest(data);
	return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
	console.log('logout');
	const response = await OAuthService.logout();
	return response;
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});

export const selectUser = (state: RootState) => state.auth.value;

export const { reset } = authSlice.actions;
export default authSlice.reducer;
