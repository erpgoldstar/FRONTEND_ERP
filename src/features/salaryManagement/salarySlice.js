import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/globalVariables";

export const getSalaries = createAsyncThunk(
  "/salaries/fetchSalaries",
  async (page) => {
    const res = await axios.get(
      `${baseUrl}/salaries?page=${parseInt(page) ? parseInt(page) : 1}`,
      {}
    );

    return res.data;
  }
);

export const getSalariesByName = createAsyncThunk(
  "/salaries/fetchSalariesByName",
  async (searchText) => {
    const res = await axios.get(
      `${baseUrl}/salaries/search?searchQuery=${searchText}`
    );

    return res.data;
  }
);

export const withdraw = createAsyncThunk(
  "/salaries/withdraw",
  async ({ amount, id }, { dispatch }) => {
    await axios.patch(`${baseUrl}/salaries/${id}/${amount}`);

    dispatch(getSalaries());
  }
);

export const salarySlice = createSlice({
  name: "salaries",
  initialState: {
    isLoading: false,
    salaries: [],
  },
  reducers: {},
  extraReducers: {
    [getSalaries.pending]: (state) => {
      state.isLoading = true;
    },
    [getSalaries.fulfilled]: (state, action) => {
      state.salaries = action.payload;
      state.isLoading = false;
    },
    [getSalaries.rejected]: (state) => {
      state.isLoading = false;
    },
    [getSalariesByName.fulfilled]: (state, action) => {
      state.salaries = action.payload;
    },
  },
});

export const {} = salarySlice.actions;

export default salarySlice.reducer;
