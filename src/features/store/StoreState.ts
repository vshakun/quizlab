import {IUser} from "./IUser";
import {IPost} from "./IPost";

export interface StoreState {
    users: {
        [key: string]: IUser;
    };
    currentUserUUID: string | null; // string if logged in, null otherwise
    posts: {
        [key: string]: IPost;
    };
}
