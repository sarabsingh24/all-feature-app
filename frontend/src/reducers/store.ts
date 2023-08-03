import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counter/counterSlice';
import userSlice from './users/usersReducer'


import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

 const reducer = combineReducers({
   counter: counterSlice,
   users: userSlice,
 });

const persistedReducer = persistReducer(persistConfig, reducer);

  const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;