import {PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "../post/Post";
import {v4} from "node-uuid";
import {StoreState} from "./storeSlice";

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

    if (state.posts[postUUID].liked.includes(currentUserUUID)) {
        state.posts[postUUID].liked = state.posts[postUUID].liked
            .filter(uuid => uuid !== currentUserUUID);
    } else {
        state.posts[postUUID].liked.push(currentUserUUID);
    }
}

export function removePostReducer(state: StoreState, action: PayloadAction<string>) {
    const postUUID = action.payload;
    delete state.posts[postUUID];
}
