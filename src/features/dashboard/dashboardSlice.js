import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/globalVariables";

export const getAllExpensesAndIncomes = createAsyncThunk(
  "/dashboard/fetchDashboardTotalExpensesAndIncomes",
  async () => {
    const res = await axios.get(`${baseUrl}/dashboard/expensesAndIncomes`, {});

    return res.data;
  }
);

export const getDashboardChartData = createAsyncThunk(
  "/dashboard/getDashbardChartData",
  async (period) => {
    const res = await axios.get(
      `${baseUrl}/dashboard/getChartData/${period}`,
      {}
    );

    return res.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
    total: { totalExpenses: 0, totalIncomes: 0 },
    dashboardData: {},
  },
  reducers: {},
  extraReducers: {
    [getAllExpensesAndIncomes.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllExpensesAndIncomes.fulfilled]: (state, action) => {
      state.total.totalExpenses = action.payload.totalExpenses;
      state.total.totalIncomes = action.payload.totalIncomes;
      state.total.expenses = action.payload.expenses;
      state.total.incomes = action.payload.incomes;
      state.isLoading = false;
    },
    [getAllExpensesAndIncomes.rejected]: (state) => {
      state.isLoading = false;
    },
    [getDashboardChartData.fulfilled]: (state, action) => {
      state.dashboardData = action.payload;
    },
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
