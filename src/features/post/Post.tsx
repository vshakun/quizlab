import React from "react";
import {addUserIfNotExists, selectCurrentUserUUID} from "../auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {likePost} from '../feed/feedSlice';
import {Link} from "react-router-dom";

export interface IPost {
    author: string,
    text: string,
    liked: Array<string>,
    timeStamp: number
}

export interface IUserPost {
    userUUID: string,
    postUUID: string
}

export function Post(props: any) {
    const dispatch = useDispatch();
    const currentUserUUID = useSelector(selectCurrentUserUUID);

    return (
        <div>
            <p>{props.post.author}</p>
            <p>{props.post.text}</p>
            <p>Liked: {props.post.liked.join(', ')}</p>
            <button
                onClick={() => {
                    const userPost: IUserPost = {
                        userUUID: currentUserUUID || '',
                        postUUID: props.uuid
                    };
                    dispatch(likePost(userPost));
                }}
            >
                ❤
            </button>
        </div>
    )
}
