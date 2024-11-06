import { createSlice } from "@reduxjs/toolkit";

const cousinSlice = createSlice({
  name: 'cousin',
  initialState: {
    cousins: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCousins: (state, action) => {
      state.cousins = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setCousins, setLoading, setError } = cousinSlice.actions;

export default cousinSlice.reducer;
