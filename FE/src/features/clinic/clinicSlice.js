import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clinicService from "./clinicService";

const initialState = {
  isLoading: false,
  responseGetAll: null,
};

export const getAllClinics = createAsyncThunk(
  "clinic",
  async (page, thunkAPI) => {
    try {
      return await clinicService.getAllClinics(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllClinics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClinics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseGetAll = action.payload;
      });
  },
});

export default clinicSlice.reducer;
