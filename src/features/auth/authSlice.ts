import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {v4} from 'node-uuid';

interface IUser {
    name: string,
    subscriptions: Array<string>
}

interface AuthState {
    users: {
        [key: string]: IUser;
    };
    loggedIn: boolean;
    currentUserUUID: string | null;
}

const initialState: AuthState = {
    users: {},
    loggedIn: false,
    currentUserUUID: null
};

export const authSlice = createSlice({
    name: 'auth',
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
            state.loggedIn = true;
        },
        subscribeUser: (state, action: PayloadAction<string>) => {
            const subscriptionUserUUID = action.payload;
            const currentUserUUID = state.currentUserUUID;

            if (currentUserUUID === null) {
                return;
            }

            if (state.users[currentUserUUID].subscriptions.includes(subscriptionUserUUID)) {
                state.users[currentUserUUID].subscriptions = state.users[currentUserUUID].subscriptions.filter(uuid => uuid !== subscriptionUserUUID);
            } else {
                state.users[currentUserUUID].subscriptions.push(subscriptionUserUUID);
            }
        }
    }
});

export const {addUserIfNotExists, subscribeUser} = authSlice.actions;


export const selectUsers = (state: RootState) => state.auth.users;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectCurrentUserUUID = (state: RootState) => state.auth.currentUserUUID;

export default authSlice.reducer;
