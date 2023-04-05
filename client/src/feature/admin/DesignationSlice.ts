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

//get designations
export const getAllDesignations = createAsyncThunk(
	'designation/getall',
	async (token: string) => {
		const response = await DesignationMasterService.getAllDesignations(token);
		return response.data.data;
	}
);

//edit designation
export const editDesignation = createAsyncThunk(
	'designation/update',
	async ({ data, token }: any) => {
		console.log(data, token);
		const response = await DesignationMasterService.editDesignation(
			data,
			token
		);
		console.log(response.data);
		return response.data;
	}
);

//create a new designation
export const createDesignation = createAsyncThunk(
	'designation/create',
	async ({ data, token }: any) => {
		console.log(data, token);
		const response = await DesignationMasterService.saveDesignation(
			data,
			token
		);
		console.log(response.data.data);
		return response.data.data;
	}
);

//delete designation
export const deleteDesignation = createAsyncThunk(
	'designation/delete',
	async ({ id, token }: any) => {
		console.log(id, token);
		const response = await DesignationMasterService.deleteDesignation(
			id,
			token
		);
		console.log(response.data);
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
			})
			.addCase(createDesignation.pending, (state) => {
				state.designationIsLoading = true;
			})
			.addCase(createDesignation.fulfilled, (state, action) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = true;
				state.designationIsError = false;
				state.designation = [...state.designation, action.payload];
			})
			.addCase(createDesignation.rejected, (state) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = false;
				state.designationIsError = true;
			})
			.addCase(editDesignation.pending, (state) => {
				state.designationIsLoading = true;
			})
			.addCase(editDesignation.fulfilled, (state, action) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = true;
				state.designationIsError = false;
				state.designation = state.designation.map((d) => {
					if (d.designationId === action.payload.designationId) {
						d = action.payload;
					}
					return d;
				});
			})
			.addCase(editDesignation.rejected, (state) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = false;
				state.designationIsError = true;
			})
			.addCase(deleteDesignation.pending, (state) => {
				state.designationIsLoading = true;
			})
			.addCase(deleteDesignation.fulfilled, (state, action) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = true;
				state.designationIsError = false;
				state.designation = state?.designation?.filter(
					(d) => d.designationId !== action.payload.data
				);
			})
			.addCase(deleteDesignation.rejected, (state) => {
				state.designationIsLoading = false;
				state.designationIsSuccess = false;
				state.designationIsError = true;
			});
	},
});

export default DesignationSlice.reducer;
