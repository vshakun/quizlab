import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {addUserIfNotExistsReducer, logOutReducer, subscribeUserReducer} from './users';
import {addPostReducer, likePostReducer, removePostReducer} from "./post";
import {StoreState} from "./StoreState";

const initialState: StoreState = {
    users: {},
    currentUserUUID: null,
    posts: {}
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addUserIfNotExists: addUserIfNotExistsReducer,
        subscribeUser: subscribeUserReducer,
        logOut: logOutReducer,
        addPost: addPostReducer,
        likePost: likePostReducer,
        removePost: removePostReducer
    },
});

export const {addUserIfNotExists, subscribeUser, logOut, addPost, likePost, removePost} = storeSlice.actions;

export const selectUsers = (state: RootState) => state.users;
export const selectCurrentUserUUID = (state: RootState) => state.currentUserUUID;
export const selectPosts = (state: RootState) => state.posts;

export default storeSlice.reducer;
