import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

type IState = {
  userObj:{}
  users: [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
};

const initialState: IState = {
    userObj:{},
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const userLognied = createAsyncThunk('users/get', async (data:{}, thunkAPI) => {
  try {
    return await userService.loginedUserInfo(data);
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
    builder.addCase(userLognied.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLognied.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.userObj = action.payload;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(userLognied.rejected, (state, action) => {
      state.isLoading = false;
      state.userObj = {};
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

const { actions, reducer } = usersSlice;

export default reducer;
