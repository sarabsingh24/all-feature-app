import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Console } from 'console';
import articleService from './articleService';

type IState = {
  articleObj: {};
  articles: [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
};

const initialState: IState = {
  articleObj: {},
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

export const articlePost = createAsyncThunk(
  'articles/post',
  async (data: {}, thunkAPI) => {
    try {
      return await articleService.setArticles(data);
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

export const updateArticle = createAsyncThunk(
  'articles/update',
  async (data: { id: string; obj: {} }, thunkAPI) => {
    try {
      return await articleService.updateArticles(data);
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


export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (data: string, thunkAPI) => {
    try {
      return await articleService.deleteArticles(data);
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
  name: 'article',
  initialState,
  reducers: {
    resetArticle: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
     
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(article.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(article.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
        state.isError = false;
        state.message = 'Article loaded';
      })
      .addCase(article.rejected, (state, action) => {
        state.isLoading = false;
        state.articles = [];
        state.isError = true;
        state.message = action.payload;
      })
      ////POST
      .addCase(articlePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(articlePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articleObj = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'One Article Posted';
      })
      .addCase(articlePost.rejected, (state, action) => {
        state.isLoading = false;
        state.articleObj = {};
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      ////UPDATE
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.articleObj = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'One Article Updated';
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      ////DELETE
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articleObj = action.payload;
        state.isError = false;
        state.message = 'One Article Deleted';
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = usersSlice;
export const { resetArticle } = actions;
export default reducer;
