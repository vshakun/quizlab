import {PayloadAction} from "@reduxjs/toolkit";
import {v4} from "node-uuid";
import {StoreState} from './storeSlice';

export function addUserIfNotExistsReducer(state: StoreState, action: PayloadAction<string>) {
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
}

export function subscribeUserReducer(state: StoreState, action: PayloadAction<string>) {
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
}

export function logOutReducer(state: StoreState) {
    state.currentUserUUID = null;
}
