import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IDivisionData from '../../types/admin/IDivisionData';
import DivisionMasterService from '../../services/admin/DivisionMasterService';

interface DivisionState {
	division: IDivisionData[];
	divisionIsLoading: boolean;
	divisionIsSuccess: boolean;
	divisionIsError: boolean;
}

const initialState: DivisionState = {
	division: [],
	divisionIsLoading: false,
	divisionIsSuccess: false,
	divisionIsError: false,
};

//get all divisions
export const getAllDivisions = createAsyncThunk('division/getall', async () => {
	const response = await DivisionMasterService.getAllDivisions();
	return response.data;
});

//edit division
export const editDivision = createAsyncThunk(
	'division/update',
	async ({ data, token }: any) => {
		console.log(data, token);
		const response = await DivisionMasterService.editDivision(data, token);
		console.log(response.data);
		return response.data;
	}
);

//create a new division
export const createDivision = createAsyncThunk(
	'division/create',
	async ({ data, token }: any) => {
		console.log(data, token);
		const response = await DivisionMasterService.saveDivision(data, token);
		console.log(response.data);
		return response.data;
	}
);

//delete adivision
export const deleteDivision = createAsyncThunk(
	'division/delete',
	async ({ id, token }: any) => {
		console.log(id, token);
		const response = await DivisionMasterService.deleteDivision(id, token);
		console.log(response.data);
		return response.data;
	}
);

export const DivisionSlice = createSlice({
	name: 'division',
	initialState,

	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllDivisions.pending, (state) => {
				state.divisionIsLoading = true;
			})
			.addCase(getAllDivisions.fulfilled, (state, action) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = true;
				state.divisionIsError = false;
				state.division = action.payload;
			})
			.addCase(getAllDivisions.rejected, (state) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = false;
				state.divisionIsError = true;
			})
			.addCase(createDivision.pending, (state) => {
				state.divisionIsLoading = true;
			})
			.addCase(createDivision.fulfilled, (state, action) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = true;
				state.divisionIsError = false;
				state.division = [...state.division, action.payload];
			})
			.addCase(createDivision.rejected, (state) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = false;
				state.divisionIsError = true;
			})
			.addCase(editDivision.pending, (state) => {
				state.divisionIsLoading = true;
			})
			.addCase(editDivision.fulfilled, (state, action) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = true;
				state.divisionIsError = false;
				state.division = state.division.map((d) => {
					if (d.divisionId === action.payload.divisionId) {
						d = action.payload;
					}
					return d;
				});
			})
			.addCase(editDivision.rejected, (state) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = false;
				state.divisionIsError = true;
			})
			.addCase(deleteDivision.pending, (state) => {
				state.divisionIsLoading = true;
			})
			.addCase(deleteDivision.fulfilled, (state, action) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = true;
				state.divisionIsError = false;
				state.division = state?.division?.filter(
					(d) => d.divisionId !== action.payload.data
				);
			})
			.addCase(deleteDivision.rejected, (state) => {
				state.divisionIsLoading = false;
				state.divisionIsSuccess = false;
				state.divisionIsError = true;
			});
	},
});

export default DivisionSlice.reducer;
