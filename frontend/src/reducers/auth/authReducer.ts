import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

type IState = {
  user: {};
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLogedin: boolean;
  message: any;
};

const initialState: IState = {
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLogedin: false,
  message: '',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (newUser: {}, thunkAPI) => {
    try {
      return await authService.register(newUser);
    } catch (error: any) {
      const message =
        error.response ||
        error.response.data ||
        error.response.data.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: {}, thunkAPI) => {
    try {
      return await authService.login(loginData);
    } catch (error: any) {
      const message =
        error.response ||
        error.response.data ||
        error.response.data.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user= {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isLogedin = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    //REGISTER USER
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = {};
      });

    // LOGIN USER
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogedin = true;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = {};
      });
  },
});

const { reducer, actions } = authSlice;
export const { resetUser } = actions;
export default reducer;
