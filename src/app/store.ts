import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import feedReducer from '../features/feed/feedSlice';
import {loadState, saveState} from '../localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer
  },
  preloadedState: persistedState
});

store.subscribe(throttle(() => {
  saveState({
    auth: {
      users: store.getState().auth.users
    },
    feed: {
      posts: store.getState().feed.posts
    }
  });
}, 1000));

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
