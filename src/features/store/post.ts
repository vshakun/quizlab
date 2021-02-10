import {PayloadAction} from "@reduxjs/toolkit";
import {v4} from "node-uuid";
import {IPost} from "./IPost";
import {StoreState} from "./StoreState";

export function addPostReducer(state: StoreState, action: PayloadAction<IPost>) {
    const post = action.payload;
    const uuid = v4();
    state.posts[uuid] = post;
}

export function likePostReducer(state: StoreState, action: PayloadAction<string>) {
    const postUUID = action.payload;
    const currentUserUUID = state.currentUserUUID;

    if (currentUserUUID === null) {
        return;
    }

    const post = state.posts[postUUID];

    if (post.liked.includes(currentUserUUID)) {
        post.liked = post.liked
            .filter(uuid => uuid !== currentUserUUID);
    } else {
        post.liked.push(currentUserUUID);
    }
}

export function removePostReducer(state: StoreState, action: PayloadAction<string>) {
    const postUUID = action.payload;
    delete state.posts[postUUID];
}
