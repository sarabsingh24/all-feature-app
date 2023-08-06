import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articleService from './articleService';

type IState = {
  articles: [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
};

const initialState: IState = {
  articles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const article = createAsyncThunk('articles/get', async (_, thunkAPI) => {
  try {
    return await articleService.getArticles();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const usersSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    resetArticle: (state) => {
      state.articles = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(article.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(article.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articles = action.payload;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(article.rejected, (state, action) => {
      state.isLoading = false;
      state.articles = [];
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

const { actions, reducer } = usersSlice;
export const { resetArticle } = actions;
export default reducer;
