import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {v4} from 'node-uuid';
import {IPost} from '../post/Post';

interface FeedState {
    posts: {
        [key: string]: IPost;
    };
}

const initialState: FeedState = {
    posts: {}
};

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<IPost>) => {
            const post = action.payload;
            const uuid = v4();
            state.posts[uuid] = post;
        }
    }
});

export const {addPost} = feedSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.auth.value)`
export const selectPosts = (state: RootState) => state.feed.posts;

export default feedSlice.reducer;
