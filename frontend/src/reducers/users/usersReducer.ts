import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userservice from './userService';

type IState = {
  users: [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
};

const initialState: IState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getUsers = createAsyncThunk('users/get', async (_, thunkAPI) => {
  try {
    return await userservice.getUserList();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  } 
});




const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

const { actions, reducer } = usersSlice;

export default reducer;
