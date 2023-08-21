import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

type person = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  occupation: string;
  userPicturePath: string;
  picturePath: string;
};

type IState = {
  userObj: {};
  userProfile: person;
  users: [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
};

const initialState: IState = {
  userObj: {},
  userProfile: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    occupation: '',
    userPicturePath: '',
    picturePath: '',
  },
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// export const userLognied = createAsyncThunk('users/get', async (data:{}, thunkAPI) => {
//   try {
//     return await userService.loginedUserInfo(data);
//   } catch (error: any) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();

//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const getUserInfo = createAsyncThunk(
  'users/userInfo',
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await userService.getUserData(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



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
    builder
      // .addCase(userLognied.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(userLognied.fulfilled, (state, action) => {
      //   console.log(action.payload);
      //   state.isLoading = false;
      //   state.userObj = action.payload;
      //   state.isSuccess = true;
      //   state.isError = false;
      // })
      // .addCase(userLognied.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.userObj = {};
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.payload;
      // })
      // GET USER INFO TO DISPLAY
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.userProfile = {
          ...initialState.userProfile,
        };
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
     
  },
});

const { actions, reducer } = usersSlice;

export default reducer;
