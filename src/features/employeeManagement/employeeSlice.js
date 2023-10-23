import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/globalVariables";

export const getEmployeesContent = createAsyncThunk(
  "/employees/fetchEmployees",
  async (page) => {
    const response = await axios.get(
      `${baseUrl}/employees?page=${parseInt(page) ? parseInt(page) : 1}`,
      {}
    );
    return response.data;
  }
);

export const getEmployeeBySearch = createAsyncThunk(
  "/employees/fetchEmployeeBySearch",
  async (searchText) => {
    const response = await axios.get(
      `${baseUrl}/employees/search?searchQuery=${searchText}`,
      {}
    );
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "/employees/addEmployee",
  async ({ name, nic, address, salary }, { dispatch }) => {
    await axios.post(`${baseUrl}/employees`, {
      name,
      nic,
      address,
      salary,
    });

    dispatch(getEmployeesContent());
  }
);

export const editEmployee = createAsyncThunk(
  "/employees/editEmployee",
  async ({ name, nic, address, salary, _id, page }, { dispatch }) => {
    await axios.patch(`${baseUrl}/employees/${_id}`, {
      name,
      nic,
      address,
      salary,
    });
    dispatch(getEmployeesContent(page));
  }
);

export const deleteEmployee = createAsyncThunk(
  "/employees/deleteEmployee",
  async ({ _id, page }, { dispatch }) => {
    await axios.delete(`${baseUrl}/employees/${_id}`);
    dispatch(getEmployeesContent(page));
  }
);

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    isLoading: false,
    employees: [],
  },
  reducers: {},
  extraReducers: {
    // fetch data
    [getEmployeesContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmployeesContent.fulfilled]: (state, action) => {
      state.employees = action.payload;
      state.isLoading = false;
    },
    [getEmployeesContent.rejected]: (state) => {
      state.isLoading = false;
    },
    [getEmployeeBySearch.fulfilled]: (state, action) => {
      state.employees = action.payload;
    },
    [addEmployee.fulfilled]: (state, action) => {},
    [editEmployee.fulfilled]: (state, action) => {},
    [deleteEmployee.fulfilled]: (state, action) => {},
  },
});

export const { addNewEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
