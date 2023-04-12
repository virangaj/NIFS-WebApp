import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Constant } from '../../constant/constant';
import { RequestStatus } from '../../constant/requestStatus';
import OAuthService from '../../services/auth/OAuthService';
import { RootState } from '../../store/store';
import TokenService from '../../utils/DecodeToken';

const user = localStorage.getItem('emplpoyee');

if (user) {
	var employee = JSON.parse(user);
}

const initialState: any = {
	user: employee ? employee.result : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	tokenExpireDate: null,
	isAdmin: null,
	division: null,
};

export const login = createAsyncThunk('auth/login', async (data: any) => {
	const response = await OAuthService.loginRequest(data);

	return response.data;
});

export const changePassword = createAsyncThunk(
	'auth/change-password',
	async ({ data, token }: any) => {
		const response = await OAuthService.changePassword(data, token);
		console.log(response);
		return response.data;
	}
);
export const logout = createAsyncThunk('auth/logout', async () => {
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
			state.tokenExpireDate = null;
			state.isAdmin = null;
			state.division = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isAdmin = false;
				state.division = null;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.tokenExpireDate = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tokenExpireDate = null;
				state.user =
					action.payload.status === RequestStatus.SUCCESS ||
					action.payload.status === RequestStatus.CHANGE_PASSWORD
						? action.payload
						: null;

				//set expire date
				state.tokenExpireDate = new Date().setDate(
					new Date().getDate() + Constant.TOKEN_EXPIRY
				);

				state.division = TokenService.getDivision(action.payload.token);
				state.isAdmin = TokenService.isAdmin(action.payload.token);
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
				state.tokenExpireDate = null;
			});
	},
});

export const selectUser = (state: any) => state.auth.value;

export const { reset } = authSlice.actions;
export default authSlice.reducer;
