import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/globalVariables";

const initialState = { zones: [], zoneDetails: [], employeeList: [] };

export const fetchZones = createAsyncThunk("/product/fetchZones", async () => {
  const response = await axios.get(`${baseUrl}/zones`, {});
  return response.data;
});

export const fetchAllEmployees = createAsyncThunk(
  "/zoneDetails/fetchEmployees",
  async () => {
    const res = await axios.get(`${baseUrl}/employees/allemployees`);

    return res.data;
  }
);

export const fetchZoneDetails = createAsyncThunk(
  "/zoneDetails/fetchZoneDetails",
  async ({ zoneSlug, category, page }) => {
    const res = await axios.get(
      `${baseUrl}/zone-details/${zoneSlug}/${category}?page=${page}`
    );

    return res.data;
  }
);

export const fetchZoneDetailsBySearch = createAsyncThunk(
  "/zoneDetails/fetchZoneDetailsBySearch",
  async ({ zoneSlug, category, searchText }) => {
    const res = await axios.get(
      `${baseUrl}/zone-details/${zoneSlug}/${category}/search?searchQuery=${searchText}`
    );

    return res.data;
  }
);

export const addZoneDetails = createAsyncThunk(
  "/zoneDetails/addZoneDetails",
  async (formData, { dispatch }) => {
    if (formData.data.type === "Expense") {
      const { zoneSlug, categoryName, zoneId, data } = formData;
      const { empName, type, eDescription, salary } = data;
      const body = {
        zoneSlug,
        categoryName,
        zoneId,
        empName,
        type,
        eDescription,
        salary,
      };
      await axios.post(`${baseUrl}/zone-details`, body);
      const fetchParams = { zoneSlug, category: categoryName, page: 1 };
      dispatch(fetchZoneDetails(fetchParams));
    } else {
      const { zoneSlug, categoryName, zoneId, data } = formData;
      const { resource, iDescription, type, amount } = data;
      const body = {
        zoneSlug,
        categoryName,
        zoneId,
        resource,
        iDescription,
        type,
        amount,
      };
      await axios.post(`${baseUrl}/zone-details`, body);
      const fetchParams = { zoneSlug, category: categoryName, page: 1 };
      dispatch(fetchZoneDetails(fetchParams));
    }
  }
);

export const editZoneDetails = createAsyncThunk(
  "/zoneDetails/editZoneDetails",
  async (formData, { dispatch }) => {
    const { data, category, id, zoneSlug, page } = formData;
    if (data.type === "Expense") {
      const { empName, type, eDescription, salary } = data;
      const body = {
        zoneSlug,
        category,
        id,
        empName,
        type,
        eDescription,
        salary,
      };
      await axios.patch(`${baseUrl}/zone-details/${id}`, body);
      const fetchParams = { zoneSlug, category, page };
      dispatch(fetchZoneDetails(fetchParams));
    } else {
      const { resource, type, iDescription, amount } = data;
      const body = {
        zoneSlug,
        category,
        id,
        resource,
        type,
        iDescription,
        amount,
      };
      await axios.patch(`${baseUrl}/zone-details/${id}`, body);
      const fetchParams = { zoneSlug, category, page };
      dispatch(fetchZoneDetails(fetchParams));
    }
  }
);

export const deleteZoneDetails = createAsyncThunk(
  "/product/deleteZoneDetails",
  async (props, { dispatch }) => {
    await axios.delete(`${baseUrl}/zone-details/${props._id}`);
    const fetchParams = {
      zoneSlug: props.zone,
      category: props.category,
      page: 1,
    };
    dispatch(fetchZoneDetails(fetchParams));
  }
);

export const productSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchZones.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchZones.fulfilled]: (state, action) => {
      state.zones = action.payload;
      state.isLoading = false;
    },
    [fetchZones.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchZoneDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchZoneDetails.fulfilled]: (state, action) => {
      state.zoneDetails = action.payload;
      state.isLoading = false;
    },
    [fetchZoneDetails.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchAllEmployees.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllEmployees.fulfilled]: (state, action) => {
      state.employeeList = action.payload;
      state.isLoading = false;
    },
    [fetchAllEmployees.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchZoneDetailsBySearch.fulfilled]: (state, action) => {
      state.zoneDetails = action.payload;
    },
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
