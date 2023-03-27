import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import DesignationMasterService from '../../services/admin/DesignationMasterService';
import IDesignationData from '../../types/IDesignationData';

interface DesignationState {
	designation: IDesignationData[];
	designationIsLoading: boolean;
	designationIsSuccess: boolean;
	designationIsError: boolean;
}

// initial state in redux
const initialState: DesignationState = {
	designation: [],
	designationIsLoading: false,
	designationIsSuccess: false,
	designationIsError: false,
};

export const getAllDesignations = createAsyncThunk(
	'designation/getall',
	async () => {
		const response = await DesignationMasterService.getAllDesignations();
		return response.data;
	}
);

export const DesignationSlice = createSlice({
	name: 'designation',
	initialState,

	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllDesignations.pending, (state) => {
				state.designationIsLoading = true;
			})
			.addCase(getAllDesignations.fulfilled, (state, action) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = true;
				state.designationIsError = false;
				state.designation = action.payload;
			})
			.addCase(getAllDesignations.rejected, (state) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = false;
				state.designationIsError = true;
			});
	},
});

export default DesignationSlice.reducer;
