import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IPost} from "../post/Post";
import {addUserIfNotExistsReducer, subscribeUserReducer, logOutReducer} from './users';
import {addPostReducer, likePostReducer, removePostReducer} from "./post";

export interface IUser {
    name: string,
    subscriptions: Array<string>
}

export interface StoreState {
    users: {
        [key: string]: IUser;
    };
    currentUserUUID: string | null; // string if logged in, null otherwise
    posts: {
        [key: string]: IPost;
    };
}

const initialState: StoreState = {
    users: {},
    currentUserUUID: null,
    posts: {}
};

export const storeSlice = createSlice({
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
