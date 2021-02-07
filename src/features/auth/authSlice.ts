import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {v4} from 'node-uuid';

interface AuthState {
    users: {
        [key: string]: string;
    };
}

const initialState: AuthState = {
    users: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUserIfNotExists: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            if (!Object.values(state.users).includes(name)) {
                const uuid = v4();
                state.users[uuid] = name;
            }
        }
    }
});

export const {addUserIfNotExists} = authSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.auth.value)`
export const selectUsers = (state: RootState) => state.auth.users;

export default authSlice.reducer;
