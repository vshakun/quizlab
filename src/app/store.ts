import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storeReducer from '../features/store/storeSlice';
import {loadState, saveState} from '../localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
export const store = configureStore({
  reducer: {
    store: storeReducer
  },
  preloadedState: persistedState
});

store.subscribe(throttle(() => {
  saveState({
    store: {
      users: store.getState().store.users,
      posts: store.getState().store.posts
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
