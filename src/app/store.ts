import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import rootReducer from '../features/store/storeSlice';
import {loadState, saveState} from '../localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState
});

store.subscribe(throttle(() => {
    saveState({
        users: store.getState().users,
        posts: store.getState().posts
    });
}, 1000));

export type RootState = ReturnType<typeof store.getState>;
