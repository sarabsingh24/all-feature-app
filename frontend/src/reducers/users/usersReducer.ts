import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

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

export const usersList = createAsyncThunk('users/get', async (_, thunkAPI) => {
  try {
    return await userService.getUser();
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
  reducers: {
    resetArticle: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(usersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(usersList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(usersList.rejected, (state, action) => {
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
