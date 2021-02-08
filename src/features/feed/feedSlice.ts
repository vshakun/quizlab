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
        }
    }
});

export const {addPost, likePost} = feedSlice.actions;

export const selectPosts = (state: RootState) => {
    // const updatePost = (post: IPost): IPost => {
    //     return {
    //         author: state.auth.users[post.author].name,
    //         text: post.text,
    //         liked: post.liked.map((uuid) => state.auth.users[uuid].name),
    //         timeStamp: post.timeStamp
    //     }
    // }
    //
    // return Object.fromEntries(Object.entries(state.feed.posts).map(([uuid, post]) => [uuid, updatePost(post)]));

    return state.feed.posts;
};

export default feedSlice.reducer;
