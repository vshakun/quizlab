import React from "react";
import {addUserIfNotExists, selectCurrentUserUUID} from "../auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {likePost} from '../feed/feedSlice';
import styles from './Post.module.css';

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
        <div className={styles.post}>
            <p className={styles.author}>{props.post.author}</p>
            <p className={styles.text}>{props.post.text}</p>
            <p className={styles.text}>Понравилось: {props.post.liked.join(', ')}</p>
            <button className={styles.heart}
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
