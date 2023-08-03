import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IState ={
count: number,
}

const initialState: IState = {
  count: 9889,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    reset: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});


const { actions, reducer } = counterSlice;

export const { increment, decrement, reset } = actions;

export default reducer;
