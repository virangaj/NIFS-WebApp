import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocationMasterService from '../../services/admin/LocationMasterService';
import ILocationData from '../../types/ILocationData';

interface LocationState {
	location: ILocationData[];
	locationIsLoading: boolean;
	locationIsSuccess: boolean;
	locationIsError: boolean;
}

// initial state in redux
const initialState: LocationState = {
	location: [],
	locationIsLoading: false,
	locationIsSuccess: false,
	locationIsError: false,
};

//get locations
export const getAllLocations = createAsyncThunk('location/getall', async () => {
	const response = await LocationMasterService.getAllLocations();
	return response.data;
});

export const LocationSlice = createSlice({
	name: 'location',
	initialState,

	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllLocations.pending, (state) => {
				state.locationIsLoading = true;
			})
			.addCase(getAllLocations.fulfilled, (state, action) => {
				state.locationIsLoading = false;
				state.locationIsSuccess = true;
				state.locationIsError = false;
				state.location = action.payload;
			})
			.addCase(getAllLocations.rejected, (state) => {
				state.locationIsLoading = false;
				state.locationIsSuccess = false;
				state.locationIsError = true;
			});
	},
});

export default LocationSlice.reducer;
