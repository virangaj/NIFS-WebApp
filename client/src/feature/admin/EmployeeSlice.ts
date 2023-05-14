import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import EmployeeService from '../../services/admin/EmployeeService';
import IEmployeeData from '../../types/admin/IEmployeeData';

interface EmployeeState {
	employees: IEmployeeData[];
	employeesIsLoading: boolean;
	employeesIsSuccess: boolean;
	employeesIsError: boolean;
}

const initialState: EmployeeState = {
	employees: [],
	employeesIsLoading: false,
	employeesIsSuccess: false,
	employeesIsError: false,
};

//get all employeess
export const getAllEmployees = createAsyncThunk(
	'employees/getall',
	async () => {
		const response = await EmployeeService.getAllEmployeeData();
		return response.data;
	}
);

export const deleteEmployee = createAsyncThunk(
	'employees/delete',
	async ({ id, token }: any) => {
		const response = await EmployeeService.deleteEmployee(id, token);
		console.log(response);
		return response.data;
	}
);

export const EmployeeSlice = createSlice({
	name: 'employees',
	initialState,

	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllEmployees.pending, (state) => {
				state.employeesIsLoading = true;
			})
			.addCase(getAllEmployees.fulfilled, (state, action) => {
				state.employeesIsLoading = false;
				state.employeesIsSuccess = true;
				state.employeesIsError = false;
				state.employees = action.payload;
			})
			.addCase(getAllEmployees.rejected, (state) => {
				state.employeesIsLoading = false;
				state.employeesIsSuccess = false;
				state.employeesIsError = true;
			})
			.addCase(deleteEmployee.pending, (state) => {
				state.employeesIsLoading = true;
			})
			.addCase(deleteEmployee.fulfilled, (state, action) => {
				state.employeesIsLoading = false;
				state.employeesIsSuccess = true;
				state.employeesIsError = false;
				state.employees = state?.employees?.filter(
					(d) => d.epfNo !== action.payload.id
				);
			})
			.addCase(deleteEmployee.rejected, (state) => {
				state.employeesIsLoading = false;
				state.employeesIsSuccess = false;
				state.employeesIsError = true;
			});
	},
});

export default EmployeeSlice.reducer;
