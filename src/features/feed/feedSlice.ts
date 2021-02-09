import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {v4} from 'node-uuid';
import {IPost, IUserPost} from '../post/Post';

type IPosts = {
    [key: string]: IPost;
};

interface FeedState {
    posts: IPosts;
}

const initialState: FeedState = {
    posts: {},
};

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
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

export const {addPost, likePost, removePost} = feedSlice.actions;

export const selectPosts = (state: RootState) => {
    return state.feed.posts;
};

export default feedSlice.reducer;
