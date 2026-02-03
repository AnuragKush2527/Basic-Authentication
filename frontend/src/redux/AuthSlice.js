import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../services/ApiEndpoint";

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get("/api/auth/check-user");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Not authenticated",
      );
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
