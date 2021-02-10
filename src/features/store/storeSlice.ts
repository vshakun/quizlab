import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {v4} from 'node-uuid';
import {IPost, IUserPost} from "../post/Post";

export interface IUser {
    name: string,
    subscriptions: Array<string>
}

interface StoreState {
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
        addUserIfNotExists: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            const key = Object.keys(state.users).find(key => state.users[key].name === name);
            if (!key) {
                const uuid = v4();
                state.users[uuid] = {
                    name: name,
                    subscriptions: []
                };
                state.currentUserUUID = uuid;
            } else {
                state.currentUserUUID = String(key);
            }
        },
        subscribeUser: (state, action: PayloadAction<string>) => {
            const subscriptionUserUUID = action.payload;
            const currentUserUUID = state.currentUserUUID;

            if (currentUserUUID === null) {
                return;
            }

            if (state.users[currentUserUUID].subscriptions.includes(subscriptionUserUUID)) {
                state.users[currentUserUUID].subscriptions = state.users[currentUserUUID].subscriptions
                    .filter(uuid => uuid !== subscriptionUserUUID);
            } else {
                state.users[currentUserUUID].subscriptions.push(subscriptionUserUUID);
            }
        },
        logOut: state => {
            state.currentUserUUID = null;
        },
        addPost: (state, action: PayloadAction<IPost>) => {
            const post = action.payload;
            const uuid = v4();
            state.posts[uuid] = post;
        },
        likePost: (state, action: PayloadAction<IUserPost>) => {
            const {userUUID, postUUID} = action.payload;
            if (state.posts[postUUID].liked.includes(userUUID)) {
                state.posts[postUUID].liked = state.posts[postUUID].liked.filter(uuid => uuid !== userUUID);
            } else {
                state.posts[postUUID].liked.push(userUUID);
            }
        },
        removePost: (state, action: PayloadAction<string>) => {
            const postUUID = action.payload;
            delete state.posts[postUUID];
        }
    }
});

export const {addUserIfNotExists, subscribeUser, logOut, addPost, likePost, removePost} = storeSlice.actions;


export const selectUsers = (state: RootState) => state.store.users;
export const selectCurrentUserUUID = (state: RootState) => state.store.currentUserUUID;
export const selectPosts = (state: RootState) => state.store.posts;

export default storeSlice.reducer;
