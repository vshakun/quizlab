import React from "react";
import {selectCurrentUserUUID, selectUsers, likePost, removePost} from "../store/storeSlice";
import {useDispatch, useSelector} from "react-redux";
import styles from './Post.module.css';
import {Link} from 'react-router-dom';

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
    const users = useSelector(selectUsers);
    const postUUID = props.uuid;
    const authorUUID = props.post.author;
    const authorName = users[authorUUID].name;
    const likedNames = props.post.liked.map((uuid: string) => users[uuid].name);

    return (
        <div className={styles.post}>
            <Link to={`/profile/${authorUUID}`}>
                <p className={styles.author}>{authorName}</p>
            </Link>
            <p className={styles.text}>{props.post.text}</p>
            <p className={styles.text}>Понравилось: {likedNames.join(', ')}</p>
            <button className={styles.heart}
                onClick={() => {
                    const userPost: IUserPost = {
                        userUUID: currentUserUUID || '',
                        postUUID: postUUID
                    };
                    dispatch(likePost(userPost));
                }}
            >
                ❤
            </button>
            <button className={currentUserUUID === authorUUID ? styles.button : styles.hiddenButton}
                    onClick={
                        () => {
                            dispatch(removePost(postUUID));
                        }
                    }
            >
                ❌
            </button>
        </div>
    )
}
