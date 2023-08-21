import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

export const article = createAsyncThunk(
  'articles/get',
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await articleService.getArticles(token);
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

export const articlePost = createAsyncThunk(
  'articles/post',
  async (data: {}, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await articleService.setArticles(data, token);
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
  async (data: { id: string; obj: {} }, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await articleService.updateArticles(data, token);
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

export const likesArticle = createAsyncThunk(
  'articles/likes',
  async (data: { id: string; obj: {} }, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await articleService.likesArticles(data, token);
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
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await articleService.deleteArticles(id, token);
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
      state.message = '';
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
        state.articles = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'One Article Posted';
      })
      .addCase(articlePost.rejected, (state, action) => {
        state.isLoading = false;

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
        state.articles = action.payload;
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

      ////LIKES
      .addCase(likesArticle.pending, (state) => {})
      .addCase(likesArticle.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(likesArticle.rejected, (state, action) => {
        state.message = action.payload;
      })
      ////DELETE
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = action.payload;
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
