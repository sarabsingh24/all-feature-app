import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

type person = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  occupation: string;
  userPicturePath: string;
  picturePath: string;
  viewedProfile: number;
  impressions: number;
  // notification: [];
};

type IState = {
  user: person;
  userProfile: person;
  singleImage: string;
  multipleImages: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
 
};

const emptyObj = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  occupation: '',
  userPicturePath: '',
  picturePath: '',
  viewedProfile: 0,
  impressions: 0,
  // notification:[],
 
};

const initialState: IState = {
  user: { ...emptyObj },
  userProfile: {
    ...emptyObj,
  },
  singleImage: '',
  multipleImages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
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

export const uploadImage = createAsyncThunk(
  'auth/articleSingleImg',
  async (imgData: FormData, thunkAPI) => {
    try {
      return await authService.uploadImage(imgData);
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


export const uploadMultipleImages = createAsyncThunk(
  'auth/articleMultipleImg',
  async (imgData: FormData, thunkAPI) => {
    try {
      return await authService.uploadImageArray(imgData);
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



export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: { id: string; obj: {} }, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await authService.updateUserFun(data, token);
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
      state.singleImage = '';
      // state.multipleImages = [];
    },
    logoutUser: (state) => {
      state.user = { ...initialState.userProfile };
      state.userProfile = { ...initialState.userProfile };
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
      state.singleImage = '';
      // state.multipleImages = [];
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
        // state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = {};
      })

      // LOGIN USER

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = { ...initialState.userProfile };
      })
      //upload Single Image
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleImage = action.payload.imagePath;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.singleImage = '';
      })
      //upload Multiple Image
      .addCase(uploadMultipleImages.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadMultipleImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.multipleImages = action.payload.imagePath;
      })
      .addCase(uploadMultipleImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.multipleImages = [];
      })
      // UPDATE USER INFO
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userProfile = { ...initialState.userProfile };
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

const { reducer, actions } = authSlice;
export const { resetUser, logoutUser } = actions;
export default reducer;
